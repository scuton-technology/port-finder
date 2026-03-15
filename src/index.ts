import net from 'net';

export interface FindPortOptions {
  start?: number;
  end?: number;
  host?: string;
}

export function isPortFree(port: number, host: string = '127.0.0.1'): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, host);
  });
}

export async function findPort(
  optionsOrStart?: number | FindPortOptions
): Promise<number> {
  let start: number;
  let end: number;
  let host: string;

  if (typeof optionsOrStart === 'number') {
    start = optionsOrStart;
    end = 65535;
    host = '127.0.0.1';
  } else {
    start = optionsOrStart?.start ?? 3000;
    end = optionsOrStart?.end ?? 65535;
    host = optionsOrStart?.host ?? '127.0.0.1';
  }

  for (let port = start; port <= end; port++) {
    if (await isPortFree(port, host)) {
      return port;
    }
  }

  throw new Error(`No available port found between ${start} and ${end}`);
}
