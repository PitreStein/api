import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { equals, IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length } from "class-validator";

export class GetAssetDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @IsOptional()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name: string;

}