import { Post, Res, Body, Controller } from '@nestjs/common';
import { FilmService } from './film.service';
import { UploadFilmDTO } from './dto/upload-film.dto';

@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) { }
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
