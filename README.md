# @scuton/port-finder

Find an available port. Starts from a base port and increments until one is free. Zero dependencies.

## Install

```bash
npm install @scuton/port-finder
```

## Usage

```typescript
import { findPort, isPortFree } from '@scuton/port-finder';

// Find first available port (starts at 3000)
const port = await findPort();

// Start from a specific port
const port = await findPort(8080);

// Specify a range
const port = await findPort({ start: 3000, end: 4000 });

// Check if a port is free
const free = await isPortFree(3000); // true/false
```

## API

### `findPort(options?): Promise<number>`

Find the first available port. Accepts a start number or options object.

### `isPortFree(port, host?): Promise<boolean>`

Check if a specific port is available.

## License

MIT © Scuton Technology
