import { Post, Res, Body, Controller, Get } from '@nestjs/common';
import { FilmService } from './film.service';
import { UploadFilmDTO } from './dto/upload-film.dto';
import { Response } from 'express';

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
        message: "Thành công lấy được dữ liệu phim"
      })
    } catch (err) {
      return res.status(500).json({
        message: "Lỗi, không lấy được dữ liệu phim"
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
