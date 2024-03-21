import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) { }
    // tìm user bằng username
    async findByUserName(userName: string) {
        try {
            let user = await this.prisma.user.findUnique({
                where: {
                    userName
                }
            })
            // nếu không tìm được user 
            if (!user) {
                throw {
                    message: "User not found"
                }
            }
            // nếu tìm được user
            return {
                data: user
            }
        } catch (err) {
            // bắt lỗi
            return {
                error: err
            }
        }
    }
    // tạo tài khoản user
    async createUserAccount(data: CreateUserDTO) {
        try {
            let user = await this.prisma.user.create({
                data: {
                    ...data,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                }
            })
            return {
                data: user
            }
        } catch (err) {
            return {
                error: err
            }
        }
    }
}

