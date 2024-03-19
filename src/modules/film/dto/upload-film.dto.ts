import { IsNotEmpty, IsNumber } from "class-validator"

export class UploadFilmDTO {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    poster: string;
    @IsNumber()
    releaseYear: number;
    @IsNotEmpty()
    source: string;
}