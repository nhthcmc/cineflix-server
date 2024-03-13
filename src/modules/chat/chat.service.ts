import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Chat, ChatType } from '@prisma/client';

interface Support {
  id?: number;
  userId: number;
  adminId?: number;
  content: string;
  type: ChatType;
  createAt: string;
  discordChannel: string;
}

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) { }

  async findHistory(userId: number) {
    try {
      let history = await this.prisma.chat.findMany({
        where: {
          userId
        }
      })
      return {
        data: history
      }
    } catch (err) {
      return {
        err
      }
    }
  }

  async findHistoryByDiscordChannel(discordChannel: string) {
    try {
      let chat = await this.prisma.chat.findFirst({
        where: {
          discordChannel
        }
      })
      return {
        data: chat
      }
    } catch (err) {
      return {
        err
      }
    }
  }

  async createChat(data: Support) {
    try {
      let newChat = await this.prisma.chat.create({
        data
      })
      return {
        data: newChat
      }
    } catch (err) {
      return {
        err
      }
    }
  }
}
