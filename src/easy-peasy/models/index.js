import UserModel from './user';
import AccountModel from './account';
import TransactionModel from './transaction';
import SecurityModel from './security';
import SystemModel from './system';
import AddressBookModel from './address-book';
import GiftcodeModel from './giftcode';
import CreditModel from './credit';
import CompanyModel from './company';
import MultiSendModel from './multi-transfer';

export default {
  user: UserModel,
  account: AccountModel,
  transaction: TransactionModel,
  security: SecurityModel,
  system: SystemModel,
  addressBook: AddressBookModel,
  giftcode: GiftcodeModel,
  credit: CreditModel,
  company: CompanyModel,
  multisend: MultiSendModel
};
