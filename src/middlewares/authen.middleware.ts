import { Injectable, NestMiddleware, Next, Req, Res } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { NextFunction, Response } from "express";
import { RequestToken } from "src/common/interface";
import { PrismaService } from "src/modules/prisma/prisma.service";


@Injectable()
export class TokenMiddleWare implements NestMiddleware{
    constructor(private readonly prisma: PrismaService, private readonly)
}