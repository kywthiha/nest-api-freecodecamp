import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, MinLength } from "class-validator";

export class CreateCategoryDto {
  @MinLength(1)
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  description: string;
}
