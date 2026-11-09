export function startPg(opts?: { extraConf?: string }): Promise<{ port: number; url: string; stop(): Promise<void> }>;
