import { EnvType } from '../types';

const Constant = {
  TRANSACTION_TYPES: {
    BUY: 'BUY',
    SELL: 'SELL'
  },
  TRANSACTION_CODES: {
    BUY: 1,
    SELL: -1,
  },
};

const Shared: EnvType.Shared = {
  Constant,
};

export { Shared };
