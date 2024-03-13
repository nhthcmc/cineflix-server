import { IsString } from "class-validator";

export class GetDataDTO {
    @IsString()
    token: string;
}