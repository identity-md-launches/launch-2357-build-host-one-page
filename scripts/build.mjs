import { cp, mkdir, readFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, 'dist');
await readFile(join(root, 'index.html'), 'utf8');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const path of ['index.html', 'src/style.css', 'src/theme.js', 'assets/favicon.svg', 'assets/share.png']) {
  await mkdir(join(output, path, '..'), { recursive: true });
  await cp(join(root, path), join(output, path), { recursive: true });
}
console.log('Built dist/index.html with local styles, theme script, favicon and share image.');
