import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

export class Transport extends StdioServerTransport {
  __modelfetch_closed__ = false;

  async start(): Promise<void> {
    await super.start();
    // @ts-expect-error - resume communication
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    if (this._stdin.isPaused()) this._stdin.resume();
  }

  async close(): Promise<void> {
    await super.close();
    // @ts-expect-error - allow reconnection
    if (!this.__modelfetch_closed__) this._started = false;
  }
}
