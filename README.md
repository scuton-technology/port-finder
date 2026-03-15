<div align="center">

# port-finder

**Find an available port. Zero dependencies.**

[![npm](https://img.shields.io/npm/v/@scuton/port-finder?style=flat-square)](https://www.npmjs.com/package/@scuton/port-finder)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square)](https://www.typescriptlang.org/)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen?style=flat-square)](package.json)

</div>

---

## Install

```bash
npm install @scuton/port-finder
```

## Usage

```typescript
import { findPort, isPortFree } from '@scuton/port-finder';

const port = await findPort();                          // first free port from 3000
const port = await findPort(8080);                      // start from 8080
const port = await findPort({ start: 3000, end: 4000 }); // within range

const free = await isPortFree(3000);                    // true / false
```

## API

| Function | Signature | Description |
|----------|-----------|-------------|
| `findPort` | `(options?: number \| FindPortOptions) => Promise<number>` | Find first available port |
| `isPortFree` | `(port: number, host?: string) => Promise<boolean>` | Check if port is available |

## License

MIT — [Scuton Technology](https://scuton.com)
