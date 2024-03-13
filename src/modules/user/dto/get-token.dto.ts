import { IsString, Length } from "class-validator";

export class userLoginDTO {
    @Length(3, 10)
    userName: string
    @IsString()
    password: string
}