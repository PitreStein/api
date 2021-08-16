import { ApiProperty,  } from "@nestjs/swagger";
import {   IsInt, IsNumber, IsOptional,  IsString, Length, IsBoolean, IsNotEmpty, IsDate, IsISO8601 } from "class-validator";
import { PaymentError, PaymentStatus } from "../payment.entity";

export class CreateBuyPaymentDto {

    @IsOptional()
    @IsInt()
    id: number;

    @IsOptional()
    @IsInt()
    userId: number;

    @IsOptional()
    @Length(34,34)
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    iban: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    location: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    country: string;

    @ApiProperty()
    @IsNotEmpty()
    fiat: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    fiatValue: number;

    @IsOptional()
    @IsNumber()
    fiatInCHF: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsISO8601()
    received: Date;

    @IsOptional()
    asset: number;

    @ApiProperty()
    @IsOptional()
    bankUsage: string

    @IsOptional()
    @IsString()
    info: string

    @IsOptional()
    errorCode: PaymentError;

    @IsString()
    @IsOptional()
    created: Date;

    @IsOptional()
    status: PaymentStatus;

}