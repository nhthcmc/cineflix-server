import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { UploadFilmDTO } from './dto/upload-film.dto';

@Injectable()
export class FilmService {
    constructor(
        private prisma: PrismaService
    ) { }
    async showFilm() {
        try {
            let film = await this.prisma.film.findMany({
            })
            return {
                data: film
            }
        } catch (err) {
            return {
                error: err
            }
        }
    }
    // async uploadFilmResource(data: UploadFilmDTO) {
    //     try {
    //         let film = await this.prisma.film.create({
    //             data: {
    //                 ...data
    //             }
    //         })
    //         return {
    //             data: film
    //         }
    //     } catch (err) {
    //         return {
    //             error: err
    //         }
    //     }
    // }
}
