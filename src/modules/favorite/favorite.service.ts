import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoriteService {
    constructor(
        private prisma: PrismaService
    ) { }
    

}
