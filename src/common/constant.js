import {
  ICO_CIRCLE_VNDT,
  ICO_CIRCLE_USDF,
  ICO_CIRCLE_BTC,
  ICO_CIRCLE_ETH,
  ICO_CIRCLE_USDT,
  ICO_CIRCLE_XRP,
  ICO_CIRCLE_XLM,
  ICO_CIRCLE_TRX,
  ICO_CIRCLE_XENG,
  ICO_CIRCLE_CENT,
  ICO_STAR,
  ICO_STAR_YELLOW,
  ICO_1,
  ICO_2,
  ICO_3,
  ICO_NONVRIFY,
  ICO_QUES_WHITE,
  ICO_VERRIED,


  ACG_COIN,
  USDTT_ICON,
  TXC_ICON
} from './images';
import { Colors } from '@/themes';


export const TRANSACTION_TYPE = [
  {
    id: 'sell',
    value: 1,
    color: Colors.RED
  },
  {
    id: 'buy',
    value: 2,
    color: ''
  },
  {
    id: 'tab_withdrawal',
    value: 3,
    color: Colors.ORANGE
  },
  {
    id: 'tab_deposit',
    value: 4,
    color: Colors.GREEN
  },
  {
    id: 'commission',
    value: 5,
    color: ''
  },
  {
    id: 'receive',
    value: 7,
    color: ''
  },
  {
    id: 'fee',
    value: 8,
    color: ''
  },
  {
    id: 'all',
  }
];

export const POSITION = [
  {
    id: 'employee',
    value: 'employee'
  },
  {
    id: 'trainee',
    value: 'trainee'
  },
  {
    id: 'secretary',
    value: 'secretary'
  },
  {
    id: 'departmentManager',
    value: 'departmentManager'
  },
  {
    id: 'teamLeader',
    value: 'teamLeader'
  },
  {
    id: 'assistant',
    value: 'assistant'
  },

  {
    id: 'personnelManager',
    value: 'personnelManager'
  },
  {
    id: 'director',
    value: 'director'
  }
]

export const FROM_TO = [
  {
    id: 'to',
    value: 3,
  },
  {
    id: 'from',
    value: 4,
  },
]

export const GENDER = [
  {
    id: 'felmale',
    value: -1
  },
  {
    id: 'male',
    value: 1,
  }
]

export const SWAP_TYPE = {
  BUY: 'BUY',
  SELL: 'SELL',
};

export const CREDIT_TYPE = {
  GRANTED: 'GRANTED',
  MANAGEMANT: 'MANAGEMANT'
};

export const MULTISEND = {
  EXCEL: 'EXCEL',
  SHEET: 'SHEET'
}

export const STATUS_CREDIT = [
  {
    id: 'running',
    value: 'running',
    color: Colors.GREEN
  },
  {
    id: 'stoped',
    value: 'stoped',
    color: Colors.RED
  },
  {
    id: 'all'
  }
]


export const GIFTCODE_STATUS = [
  {
    id: 'error',
    value: -1,
    color: 'red',
  },
  {
    id: 'completed',
    value: 1,
    color: Colors.GREEN,
  },
  {
    id: 'creating',
    value: 2,
    color: 'orange',
  },
  {
    id: 'pending',
    value: 3,
    color: Colors.BLUE
  },
  {
    id: 'all'
  }
];

export const HISTORY_EXCHANGE_STATUS = [
  {
    id: 'error',
    value: -1,
    color: Colors.RED,
  },
  {
    id: 'completed',
    value: 1,
    color: Colors.GREEN,
  },
  {
    id: 'pending',
    value: 2,
    color: Colors.ORANGE,
  },
  {
    id: 'processing',
    value: 3,
    color: Colors.BLUE,
  }
]

export const CREDIT_STATUS = [
  {
    id: 'pending',
    value: 2,
    color: Colors.ORANGE
  },
  {
    id: 'processing',
    value: 3,
    color: Colors.BLUE
  },
  {
    id: 'completed',
    value: 1,
    color: Colors.GREEN
  },
  {
    id: 'error',
    value: -1,
    color: Colors.RED
  },
  {
    id: 'processing',
    value: 23,
    color: Colors.BLUE
  },
  {
    id: 'processing',
    value: 21,
    color: Colors.BLUE
  }
]

export const FILTER_STATUS = [
  {
    id: 'pending',
    value: 2,
    color: Colors.ORANGE
  },
  {
    id: 'processing',
    value: 3,
    color: Colors.BLUE
  },
  {
    id: 'completed',
    value: 1,
    color: Colors.GREEN
  },
  {
    id: 'error',
    value: -1,
    color: Colors.RED
  },
  {
    id: 'all'
  }
]

export const STATUS_VERRIFI = [
  {
    id: 'nonVerify',
    color: Colors.RED,
    icon: ICO_NONVRIFY
  },
  {
    id: 'verifying',
    color: Colors.ORANGE,
    icon: ICO_QUES_WHITE
  },
  {
    id: 'kyc1',
    color: Colors.GREEN,
    icon: ICO_VERRIED
  },
  {
    id: 'kyc2',
    color: Colors.GREEN,
    icon: ICO_VERRIED
  },
  {
    id: 'kyc3',
    color: Colors.GREEN,
    icon: ICO_VERRIED
  },
]
export const GIFTCODE_CONDITIONS = [
  {
    id: 'public',
    value: '{"uid":"","pin":"","type":"public"}'
  },
  {
    id: 'password_required',
    value: '{"uid":"","pin":"","type":"private"}',
  },
  {
    id: 'authenticate_sender',
    value: '{"uid":"","pin":"","type":"fixedSender"}',
  },
  {
    id: 'recipients_indentified',
    value: '{"uid":"","pin":"","type":"fixedReceiver"}',
  },
];
export const GIFTCODE_FILTER_HISTORY = [
  {
    id: 'public',
    value: '{"uid":"","pin":"","type":"public"}'
  },
  {
    id: 'password_required',
    value: '{"uid":"","pin":"","type":"private"}',
  },
  {
    id: 'authenticate_sender',
    value: '{"uid":"","pin":"","type":"fixedSender"}',
  },
  {
    id: 'recipients_indentified',
    value: '{"uid":"","pin":"","type":"fixedReceiver"}',
  },
  {
    id: 'all'
  }
];

export const LEVEL_FRIEND = [
  {
    id: 'user',
    value: 'Level 1'
  },
  {
    verified: 'verified',
    value: 'Level 2'
  },
  {
    id: 'security',
    value: 'Level 3'
  },
  {
    id: 'vip',
    value: 'Level 4'
  },
  {
    id: 'supervip',
    value: 'Level 5'
  },
  {
    id: 'special',
    value: 'Level 6'
  },
  {
    id: 'agent',
    value: 'Level 7'
  }
]

export const SUPPORTED_GIFTCODE_COINS_HISTORY = [
  {
    id: 'vndt',
    name: 'VNCOIN',
    shortname: 'VNDT',
    value: 0,
    icon: ICO_CIRCLE_VNDT,
    order: 0,
    currencyCode: 12,
    networkFee: 'trx',
  },
  {
    id: 'cent',
    name: 'CENT',
    shortname: 'CENT',
    value: 0,
    icon: ICO_CIRCLE_CENT,
    order: 1,
    currencyCode: 16,
    networkFee: 'trx',
  },
  {
    id: 'usdf',
    name: 'USDForex',
    shortname: 'UForex',
    value: 0,
    icon: ICO_CIRCLE_USDF,
    order: 2,
    currencyCode: 14,
    networkFee: 'trx',
  },
  {
    id: 'xeng',
    name: 'XENG',
    shortname: 'XENG',
    value: 0,
    icon: ICO_CIRCLE_XENG,
    order: 3,
    currencyCode: 15,
    networkFee: 'trx',
  },
  {
    id: 'all',
    name: 'Tất cả loại coin'
  }

];

export const RANK = [
  {
    id: 'user',
    value: 'VIP 0',
    star: ICO_STAR
  },
  {
    id: 'verified',
    value: 'VIP 1',
    star: ICO_STAR_YELLOW
  },
  {
    id: 'security',
    value: 'VIP 2',
    star: ICO_STAR_YELLOW
  },
  {
    id: 'vip',
    value: 'VIP 3',
    star: ICO_STAR_YELLOW
  },
  {
    id: 'supervip',
    value: 'VIP 4',
    star: ICO_STAR_YELLOW
  },
  {
    id: 'special',
    value: 'VIP 5',
    star: ICO_STAR_YELLOW
  },

]

export const COMMISSION = [
  {
    id: 'Acwallet Airdrop Program',
    value: 'Airdrop'
  },
  {
    id: 'Acwallet Commission Program',
    value: 'Commission'
  }
]
export const SUPPORTED_GIFTCODE_COINS = [
  {
    id: 'vndt',
    name: 'VNCOIN',
    shortname: 'VNDT',
    value: 0,
    icon: ICO_CIRCLE_VNDT,
    order: 0,
    currencyCode: 12,
    networkFee: 'trx',
  },
  {
    id: 'cent',
    name: 'CENT',
    shortname: 'CENT',
    value: 0,
    icon: ICO_CIRCLE_CENT,
    order: 1,
    currencyCode: 16,
    networkFee: 'trx',
  },
  {
    id: 'usdf',
    name: 'USDForex',
    shortname: 'UForex',
    value: 0,
    icon: ICO_CIRCLE_USDF,
    order: 2,
    currencyCode: 14,
    networkFee: 'trx',
  },
  {
    id: 'xeng',
    name: 'XENG',
    shortname: 'XENG',
    value: 0,
    icon: ICO_CIRCLE_XENG,
    order: 3,
    currencyCode: 15,
    networkFee: 'trx',
  },
];

export const SUPPORTED_COINS = [

  {
    id: 'acg',
    name: 'ACCoin',
    shortname: 'ACG',
    value: 0,
    icon: ACG_COIN,
    order: 0,
    currencyCode: 16,
    networkFee: 'acg'
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    shortname: 'BTC',
    value: 0,
    icon: ICO_CIRCLE_BTC,
    order: 1,
    currencyCode: 1,
    networkFee: 'btc',
  },
  {
    id: 'eth',
    name: 'Ethereum',
    shortname: 'ETH',
    value: 0,
    icon: ICO_CIRCLE_ETH,
    order: 2,
    currencyCode: 3,
    networkFee: 'eth',
  },
  {
    id: 'xrp',
    name: 'Ripple',
    shortname: 'XRP',
    value: 0,
    icon: ICO_CIRCLE_XRP,
    order: 3,
    currencyCode: 8,
    networkFee: 'xrp',
  },
  {
    id: 'xlm',
    name: 'Stellar',
    shortname: 'XLM',
    value: 0,
    icon: ICO_CIRCLE_XLM,
    order: 4,
    currencyCode: 10,
    networkFee: 'xlm',
  },
  {
    id: 'usdt',
    name: 'Tether',
    shortname: 'USDT',
    value: 0,
    icon: ICO_CIRCLE_USDT,
    order: 5,
    currencyCode: 6,
    networkFee: 'eth',
  },
  {
    id: 'usdtt',
    name: 'Tether USDT TRC20',
    shortname: 'USDTT',
    value: 0,
    icon: USDTT_ICON,
    order: 6,
    currencyCode: 15,
    networkFee: 'trx',
  },
  {
    id: 'txc',
    name: 'Tiktakbtc Exchange Coin',
    shortname: 'TXC',
    value: 0,
    icon: TXC_ICON,
    order: 7,
    currencyCode: 13,
    networkFee: 'trx',
  },
  {
    id: 'trx',
    name: 'Tron',
    shortname: 'TRX',
    value: 0,
    icon: ICO_CIRCLE_TRX,
    order: 8,
    currencyCode: 11,
    networkFee: 'trx',
  },
  {
    id: 'ufx',
    name: 'UForex',
    shortname: 'UFX',
    value: 0,
    icon: ICO_CIRCLE_USDF,
    order: 9,
    currencyCode: 14,
    networkFee: 'trx',
  },
  {
    id: 'vndt',
    name: 'VNCOIN',
    shortname: 'VNDT',
    value: 0,
    icon: ICO_CIRCLE_VNDT,
    order: 11,
    currencyCode: 12,
    networkFee: 'trx',
  },
];


export const TYPE_NOTIFICATIONS = [
  {
    value: 'Thay đổi thông tin',
    icon: ICO_3
  },
  {
    value: 'Giao dịch',
    icon: ICO_2
  },
  {
    value: 'Tin tức',
    icon: null
  },
  {
    value: 'Nhận hoa hồng',
    icon: null
  },
  {
    value: 'giftcode',
    icon: ICO_1
  },
  {
    value: 'Đăng kí thành công',
    icon: null
  }
]

// export const CHECK = [
//   {
//     id: 'false',
//     value: 'error'
//   },
//   {
//     id: 'true',
//     value: 'error'
//   }
// ]

export const APP_STATE = {
  ANONYMOUS: 'ANONYMOUS',
  LOGGED_IN: 'LOGGED_IN',
};

export const RESPONSE_CODES = {
  SUCCESS: 200,
  UPDATE_SUCCESS: 201,
  UNAUTHORIZED: 401,
};

export const STATUS = {
  SUCCESS: 'SUCCESS',
  NOT_STARTED: 'NOT_STARTED',
  FETCHING: 'FETCHING',
  FAILED: 'FAILED',
};

export const LOCALES = {
  ENGLISH: { id: 0, name: 'en', label: 'English' },
  VIETNAMESE: { id: 1, name: 'vn', label: 'Việt Nam' },
};

export const HIDEN_NUMBER = '******';

export const API_BASE_URL = 'https://login.tiktakbtc.io/';
export const LINK_REGISTER = 'https://login.acwallet.io/register?sponsor=';

export const LINK_FACEBOOK = 'http://facebook.com/sharer/sharer.php?u=';
export const LINK_TELEGRAM = 'https://telegram.me/share/url?url=';
export const LINK_ZALO = 'https://sp.zalo.me/share_inline?d=eyJ1cmwiOiJodHRwczovL2xvZ2luLmFjd2FsbGV0LmlvL21lbWJlci9hZmZpbGlhdGUifQ%3D%3D';
export const LINK_TWITTER = 'https://twitter.com/share?url=';
export const LINK_WEB = 'https://acwallet.io/member/verify-account';
export const CHECK_EXPORT = 'https://tronscan.org/#/transaction/';
export const LINK_SPREADSHEET = 'https://docs.google.com/spreadsheets/d/1MqsLBS2iw8D7PoWz1P4izVtzOkIwNMVL48pAeTK9FRg/edit?usp=sharing';
export const EXCEL_PATH = 'https://login.acwallet.io/img/excel-form.xlsx';


export const SHOW_ONBOARDING = 'SHOW_ONBOARDING';
export const STORE_PIN_CODE = 'STORE_PIN_CODE';
export const SESSION_TIMEOUT = 'SESSION_TIMEOUT';
export const STORE_COOKIE = 'STORE_COOKIE';
export const ENABLE_TOUCH_ID = 'ENABLE_TOUCH_ID';
export const BTC_dust = 0.00000546;
export const ETH_dust = 0.00000001;

export const GOOGLE_RECAPTRA = {
  SITE_KEY: '6Lc8xJwUAAAAAAExbYPS1hpN7wwfunrg4rh13L6M',
  DOMAIN: 'https://login.tiktakbtc.io/',
};

// 6Lc8xJwUAAAAAAExbYPS1hpN7wwfunrg4rh13L6M

export const searchKeys = [
  "id",
  "createdDate",
  "expiryTime",
  "quantity",
  "rate",
  "feeRate",
  "amount",
  "addressReceivePayment",
  "addressSendPayment",
  "transactionType",
  "currencyCode", ,
  "status",
  "fee",
  "hash",
  "vndtHash",
  "enoughBalance",
  "sendOrReceive",
  "timesendOrReceive",
  "countSendFail",
  "discount_percent",
  "ip_address",
  "userId",
  "userName",
];

export const searchKeysCredit = [
  "id",
  "borrowerEmail",
  "onwerEmail",
  "interestRate",
  "quantityUsed",
  "created",
  "quota",
  "note",
  "status"
]

export const searchKeysCreditDetail = [
  "id",
  "quantity",
  "interest",
  "interestRate",
  "refundQuantity",
  "status",
  "accepted",
  "created",
  "currencyCode",
  "refunded"
]
export const searchKeysgiftcode = [
  'id',
  'ownerId',
  'userId',
  'hashCreate',
  'hashReceive',
  'quantity',
  'currency',
  'receiveAddress',
  'conditions',
  'status',
  'created',
  'reveiced'
];

export const COLUMNS_EXCHANGE = [
  "Giao dịch",
  "Số lượng",
  "Trạng thái"
];

export const COLUMNS_BLANCES = [
  'Tiền điện tử',
  'Tổng số dư',
  ''
]
