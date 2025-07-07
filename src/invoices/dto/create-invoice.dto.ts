// 파일 경로: src/invoices/dto/create-invoice.dto.ts
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateInvoiceDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amountSats!: number;

  @IsString()
  memo?: string; // 메모는 선택 사항
}
