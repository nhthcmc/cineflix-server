import { IsString, MaxLength } from "class-validator";

//validate kiểu dữ liệu gửi lên server
export class GetTokenDTO {
    @MaxLength(20)
    userName: string;
    @IsString()
    password: string;
}