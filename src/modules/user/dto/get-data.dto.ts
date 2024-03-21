import { IsString } from "class-validator";

//lấy thông tin tài khoản bằng token
export class GetDataDTO {
    @IsString()
    token: string;
}