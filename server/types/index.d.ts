// <reference path="../index.d.ts" />
declare namespace EnvType {
  interface Shared {
    Constant: {
      TRANSACTION_TYPES: {
        BUY: string;
        SELL: string;
      };
      TRANSACTION_CODES: {
        BUY: number;
        SELL: number;
      };
    };
  }
}

export { EnvType };
