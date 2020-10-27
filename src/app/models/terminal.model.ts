export class Terminal{
  id: number;
  alias: string;
  status: number;
}

export enum Status {
  Online = 1,
  Serving,
  Break,
  Idle,
  Offline
}
