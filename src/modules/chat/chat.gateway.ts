import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';
import { Inject, OnModuleInit, forwardRef } from '@nestjs/common';
import { ChatType, User } from '@prisma/client'
import { verify } from 'jsonwebtoken';
import { DiscordSocketService } from '../discord/discord.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnModuleInit {

  @WebSocketServer()
  SocketServer: Socket

  socketClientList: {
    token: string;
    data: User;
    sockets: Socket[]
  }[] = []

  constructor(
    private readonly chatService: ChatService,
    @Inject(forwardRef(() => DiscordSocketService))
    private readonly discordService: DiscordSocketService
  ) { }

  onModuleInit() {
    this.SocketServer.on("connection", (socketClient: Socket) => {
      let token = String(socketClient.handshake.query.token);

      /* Decode token */
      let decodeData = verify(token, process.env.PRIVATE_KEY) as User;

      /* Debug error */
      if (!decodeData) {
        socketClient.emit("login-status", {
          status: false,
          message: [
            "Token invalid"
          ]
        })
        socketClient.disconnect();
      } else {
        /* Add to online users list */
        this.addClient(token, socketClient, decodeData)
      }
    })
  }

  addClient(token: string, socketClient: Socket, decodeData: User) {
    let flag = false;
    for (let i in this.socketClientList) {
      if (this.socketClientList[i].token == token) {
        this.socketClientList[i].sockets.push(socketClient)
        flag = true;
        break
      }
    }
    if (!flag) this.socketClientList.push({
      token,
      data: decodeData,
      sockets: [
        socketClient
      ]
    })
    socketClient.emit("login-status", {
      status: true,
      message: [
        "Connected!"
      ]
    })
    this.sendHistory(decodeData.id)
  }

  async sendHistory(userId: number) {
    let client = this.socketClientList.find(client => client.data.id == userId)
    if (!client) return
    try {
      let { data, err } = await this.chatService.findHistory(userId);
      for (let i in client.sockets) {
        client.sockets[i].emit('history', data)
      }
    } catch (err) {

    }
  }

  @SubscribeMessage('user-chat')
  async userChat(@MessageBody() body: {
    userId: number;
    content: string;
  }) {
    let client = this.socketClientList.find(item => item.data.id == body.userId);
    let historyObj = await this.chatService.findHistory(client.data.id);
    if (historyObj.err) {

    }
    if (historyObj.data.length == 0) {
      let textChannel = await this.discordService.createTextChannel(client.data.userName)
      let { data, err } = await this.chatService.createChat({
        content: body.content,
        createAt: String(Date.now()),
        type: ChatType.TEXT,
        userId: body.userId,
        discordChannel: textChannel.id
      })
      textChannel.send(`${client.data.userName}: ${data.content}`)
    } else {
      let channelCode = historyObj.data[0].discordChannel;
      let textChannel = await this.discordService.getTextChannel(channelCode);
      let { data, err } = await this.chatService.createChat({
        content: body.content,
        createAt: String(Date.now()),
        type: ChatType.TEXT,
        userId: body.userId,
        discordChannel: textChannel.id
      })
      textChannel.send(`${client.data.userName}: ${data.content}`)
    }
    this.sendHistory(body.userId)
  }

  async sendMessage(channelId: string, content: string) {
    let { err, data } = await this.chatService.findHistoryByDiscordChannel(channelId);
    let userId = data.userId;
    let client = this.socketClientList.find(client => client.data.id == data.userId);



    if (client) {
      let { data, err } = await this.chatService.createChat({
        content: content,
        createAt: String(Date.now()),
        type: ChatType.TEXT,
        userId: client.data.id,
        discordChannel: channelId,
        adminId: 1
      })
      this.sendHistory(client.data.id)
    } else {
      let { data, err } = await this.chatService.createChat({
        content: content,
        createAt: String(Date.now()),
        type: ChatType.TEXT,
        userId: userId,
        discordChannel: channelId,
        adminId: 1
      })
    }
  }
}
