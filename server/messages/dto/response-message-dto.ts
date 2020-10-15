import { AccountListDTO, AccountDetailDTO } from './index';
export class ResponseMessageDTO {
    exchange_rate: number;
    accounts: Array<AccountListDTO>
    account_detail: AccountListDTO
    account_detail_list: Array<AccountDetailDTO>
}