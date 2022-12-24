import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
  @ApiProperty({
    example:'kyawthiha@gmail.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example:'password'
  })
  @IsNotEmpty()
  password: string;
}
