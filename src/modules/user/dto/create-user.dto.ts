import { IsNotEmpty, MaxLength } from "class-validator";

// tạo tài khoản người dùng
export class CreateUserDTO {
    @MaxLength(20)
    userName: string;
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}