import { IsNotEmpty } from 'class-validator';
export class AccountListDTO {
    @IsNotEmpty()
    id: number;
    
    @IsNotEmpty()
    account_name: string;
    
    @IsNotEmpty()
    category: string;
    
    @IsNotEmpty()
    tag: string;
    
    @IsNotEmpty()
    balance: number;

    @IsNotEmpty()
    available_balance: number;
}