// src/content/dto/get-content.dto.ts
import { IsOptional, IsString, IsInt, IsArray, IsDateString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class GetContentDto {
  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsUUID()
  author?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsDateString()
  date_from?: string;

  @IsOptional()
  @IsDateString()
  date_to?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit: number = 10;
}
