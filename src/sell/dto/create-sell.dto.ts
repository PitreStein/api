import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { equals, IsBoolean, IsEmail, IsIBAN, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length } from "class-validator";

// TODO: Again: Custom decorators for address and signature,...
export class CreateSellDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsIBAN()
    iban: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    fiat: number; // should be an object

    @IsNotEmpty()
    @Length(34,34)
    @IsString()
    @IsOptional()
    address: string;

    @IsOptional()
    @IsInt()
    depositId: number;

}