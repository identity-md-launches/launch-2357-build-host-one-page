import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const source = await readFile('index.html', 'utf8');
const html = await readFile('dist/index.html', 'utf8');
assert.equal(html, source, 'The export must contain the complete source HTML.');
for (const path of ['src/style.css', 'src/theme.js', 'assets/favicon.svg', 'assets/share.png']) {
  assert.ok((await readFile(path)).equals(await readFile(join('dist', path))), `Stale exported asset: ${path}`);
}
const png = await readFile('dist/assets/share.png');
assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', 'Share image must be a real PNG.');
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
assert.ok((await readFile('dist/assets/favicon.svg', 'utf8')).includes('xmlns="http://www.w3.org/2000/svg"'));
const manifest = JSON.parse(await readFile('package.json', 'utf8'));
const lock = JSON.parse(await readFile('package-lock.json', 'utf8'));
assert.deepEqual(manifest.devDependencies, lock.packages[''].devDependencies, 'Lockfile must agree with the manifest.');
assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
assert.ok(/<html lang="en">/.test(html));
for (const required of ['<title>', 'name="description"', 'property="og:title"', 'property="og:image"', 'rel="icon"']) assert.ok(html.includes(required), required);
for (const forbidden of [/<form\b/i, /<iframe\b/i, /<script\b[^>]*src="https?:/i]) assert.ok(!forbidden.test(html), `Unwanted runtime integration: ${forbidden}`);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'IDs must be unique.');
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]), `Missing anchor ${match[1]}`);
for (const match of html.matchAll(/(?:src|href|content)="(\.\/[^"#]+)"/g)) {
  assert.ok((await stat(resolve('dist', match[1]))).isFile(), `Missing asset ${match[1]}`);
}
const expectedLinks = [
  'https://github.com/flop-labs/yellowpaper/issues/172',
  'https://api.flop.network/v1/models',
  'https://ask.flop.finance/docs/demand-and-broker',
  'https://ask.flop.finance/networks/testnet',
  'https://api.flop.network/openapi.json',
  'https://faucet.flop.network',
  'https://flop.finance/testnet/',
  'https://flop.finance/airdrop/',
  'https://ask.flop.finance/docs/testnet-and-timeline',
  'https://ask.flop.finance/docs/miner-and-validator-economics',
  'https://github.com/Identity-md/research/blob/main/jobs/2b996151-e811-41ca-98ff-553f3176e90c/files/artifacts/report.md'
];
const links = [...html.matchAll(/href="(https:[^"]+)"/g)].map(match => match[1]);
assert.deepEqual(links, expectedLinks, 'Every supplied external URL must be preserved exactly.');
const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
for (const phrase of [
  'A one week FLOP testnet trial for Claus (@contractclaus), on his terms.',
  'Oct 20, 2026', 'Every FLOP rule here is draft.',
  'Tue Nov 3, 2026', 'active days must not be a scoring term.',
  'request, model, result, receipt, settled amount, chain evidence.',
  'Receipts carry metadata only', 'Faucet only funding, no project funds, nothing on chain changes.',
  'Hard stop if a receipt cannot show credit to his own account rather than a gateway.',
  '(R8.4)', '(G.1)', 'Qwen2.5 0.5B Instruct', 'no maintainer has answered.',
  'Opus stays Claus\'s main model', 'off FLOP.', '25 FLOP allowance expires within 24 hours and is never renewed',
  '25 FLOP on request and 500 to 2,000 only with proof of personhood',
  'activity floor is unpublished and faucet caps are per identity.',
  'flagged accounts forfeit, and wallets under common control score as one',
  '1.2B FLOP agent pool', 'early February 2027', 'every 3 FLOP spent unlocks 1', '2.3% fee',
  '1,000 1.2M', '5,000 240k', '20,000 60k', '100,000 12k', 'FLOP has no price yet.',
  'top 1,000 get a 1.2M FLOP seat', 'locked about two years', 'About $300 a month',
  'Testnet stake sponsored', '25,229 FLOP a month per seat plus 15% of fees',
  '0.5 IMD a job', '(issue 130)', '16 GB GPU', 'no premium for bigger hardware',
  'After genesis, agents need real work to unlock their balances.', '(issue 123)',
  'Can a multisig own a validator bond?', 'Researched and built by the IMD swarm',
  '38d931cc-15d3-49e7-9c30-6d5902c3bd1e', 'From @ultrapara'
]) assert.ok(text.includes(phrase), `Missing content: ${phrase}`);
assert.equal((html.match(/class="dish-number"/g) ?? []).length, 6);
assert.equal((html.match(/class="gate-heading"/g) ?? []).length, 2);
// The required job identifier is the only visible text allowed to contain hyphens.
const body = html.slice(html.indexOf('<body>')).replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, ' ').replace('38d931cc-15d3-49e7-9c30-6d5902c3bd1e', '');
assert.ok(!/[-\u2010-\u2015\u2212]/u.test(body), 'No dashes in page prose.');
/** @param {string} directory @returns {Promise<number>} */
async function bytes(directory) {
  let total = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    total += entry.isDirectory() ? await bytes(path) : (await stat(path)).size;
  }
  return total;
}
const size = await bytes('dist');
assert.ok(size < 128 * 1024, 'Keep the export below its 128 KiB allocation.');
for (const path of ['README.md', 'DESIGN.md', 'artifacts/validation.md']) {
  assert.ok((await readFile(path, 'utf8')).trim().length > 100, `Missing documentation: ${path}`);
}
for (const path of ['artifacts/browser-checks.json', 'artifacts/accessibility.json', 'artifacts/handoff.json']) {
  JSON.parse(await readFile(path, 'utf8'));
}
console.log(`PASS: complete static HTML, 11 exact source URLs, 6 menu items, 2 gates, metadata, anchors, assets and content invariants. Export: ${size} bytes.`);
