import { AccountItem, DetailItem } from './index';
export interface ResponseMessage {
    exchange_rate?: number;
    accounts?: Array<AccountItem>
    account_detail?: AccountItem
    account_detail_list?: Array<DetailItem>
}
