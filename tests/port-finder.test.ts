import { describe, it, expect } from 'vitest';
import net from 'net';
import { findPort, isPortFree } from '../src/index';

describe('isPortFree', () => {
  it('should return true for a free port', async () => {
    const result = await isPortFree(59876);
    expect(result).toBe(true);
  });

  it('should return false for an occupied port', async () => {
    const server = net.createServer();
    await new Promise<void>((resolve) => server.listen(59877, '127.0.0.1', resolve));
    const result = await isPortFree(59877);
    expect(result).toBe(false);
    server.close();
  });
});

describe('findPort', () => {
  it('should find a free port starting from default', async () => {
    const port = await findPort();
    expect(port).toBeGreaterThanOrEqual(3000);
    expect(port).toBeLessThanOrEqual(65535);
  });

  it('should find a free port starting from a specific port', async () => {
    const port = await findPort(8000);
    expect(port).toBeGreaterThanOrEqual(8000);
  });

  it('should find a port using options object', async () => {
    const port = await findPort({ start: 9000, end: 10000 });
    expect(port).toBeGreaterThanOrEqual(9000);
    expect(port).toBeLessThanOrEqual(10000);
  });

  it('should skip occupied ports', async () => {
    const server = net.createServer();
    await new Promise<void>((resolve) => server.listen(59870, '127.0.0.1', resolve));
    const port = await findPort(59870);
    expect(port).toBeGreaterThan(59870);
    server.close();
  });

  it('should throw when no port available in range', async () => {
    // Use an extremely narrow invalid range
    await expect(findPort({ start: 65535, end: 65534 })).rejects.toThrow('No available port');
  });

  it('should return the exact port if it is free', async () => {
    const free = await isPortFree(59890);
    if (free) {
      const port = await findPort(59890);
      expect(port).toBe(59890);
    }
  });
});
