import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { GetTokenDTO } from './dto/get-token.dto';
import { Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { GetDataDTO } from './dto/get-data.dto';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  // gửi token lên database để tìm user (client -> server)
  @Post("get-token")
  async getToken(@Body() body: GetTokenDTO, @Res() res: Response) {
    try {
      let { error, data } = await this.userService.findByUserName(body.userName)
      if (error) {
        throw {
          message: "Invalid username"
        }
      }
      if (body.password != data.password) {
        throw {
          message: "Wrong password"
        }
      }
      return res.status(200).json({
        // dùng jwt tạo token
        data: sign(data, process.env.JWT_KEY, {
          expiresIn: "1d"
        })
      })
    } catch (err) {
      return res.status(500).json({
        message: [err.message]
      })
    }
  }
  // lấy thông tin của user từ database xuống bằng token (server -> client)
  @Post("get-data")
  getData(@Body() body: GetDataDTO, @Res() res: Response) {
    try {
      let data = verify(body.token, process.env.JWT_KEY)
      console.log("data", data)
      if (!data) {
        throw {
          message: "Error"
        }
      }
      return res.status(200).json(
        {
          data
        }
      )
    } catch (err) {
      return res.status(500).json(
        {
          message: "Invalid token"
        }
      )
    }
  }
  // đăng kí tài khoản mới 
  @Post()
  async createUser(@Body() body: CreateUserDTO, @Res() res: Response) {
    try {
      let { data, error } = await this.userService.createUserAccount(body)
      console.log('data', data)
      console.log('err', error)
      if (error) {
        if (error.meta?.target == "user_userName_key") {
          throw {
            message: "This username has been taken"
          }
        }
        if (error.meta?.target == "user_email_key") {
          throw {
            message: "This email has been registered"
          }
        }
      }
      return res.status(200).json(
        {
          message: "Registered successful",
          data
        }
      )
    } catch (err) {
      console.log('err', err)
      return res.status(500).json(
        {
          message: "Register error"
        }
      )
    }
  }
}

