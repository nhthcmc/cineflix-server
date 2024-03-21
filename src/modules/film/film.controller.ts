import { Post, Res, Body, Controller, Get } from '@nestjs/common';
import { FilmService } from './film.service';
// import { UploadFilmDTO } from './dto/upload-film.dto';
import { Response } from 'express';

// lấy dữ liệu phim về (server -> client)
@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) { }
  @Get()
  async getFilm(@Res() res: Response) {
    try {
      let { data, error } = await this.filmService.showFilm()
      console.log("data", data)
      console.log("err", error)
      return res.status(200).json({
        data,
        message: "Film database loaded"
      })
    } catch (err) {
      return res.status(500).json({
        message: "Error: Film database loaded issues"
      })
    }
  }

  // @Post("upload")
  // async uploadFilm(@Body() body: UploadFilmDTO, @Res() res: Response) {
  //   try {
  //     let { data, error } = await this.filmService.uploadFilmResource(body)
  //     console.log('data', data)
  //     console.log('err', error)
  //     return res.status(200).json({

  //     })
  //   } catch (err) {
  //     console.log('err', err)
  //     return res.status(500).json(
  //       {
  //         message: "Lỗi"
  //       }
  //     )
  //   }
  // }
}
