import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UploadFilmDTO {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    poster: string;
    @IsNumber()
    releaseYear: number;
    @IsString()
    source: string;
}