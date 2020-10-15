import { IsNotEmpty } from 'class-validator';
export class AccountDetailDTO {
    @IsNotEmpty()
    confirmed_date: string;
    
    @IsNotEmpty()
    order_id: string;
    
    @IsNotEmpty()
    order_code: string;
    
    @IsNotEmpty()
    transaction_type: string;
    
    @IsNotEmpty()
    debit: number;

    @IsNotEmpty()
    credit: number;
    
    @IsNotEmpty()
    balance: number;
}