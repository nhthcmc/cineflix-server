import { Inject, Injectable, OnModuleInit, forwardRef } from '@nestjs/common';
import { OnGatewayInit } from '@nestjs/websockets';
import { ChannelType, Client, GatewayIntentBits, Guild, Message, TextChannel } from 'discord.js';
import { ChatGateway } from '../chat/chat.gateway';


@Injectable()
export class DiscordSocketService implements OnModuleInit {
    /* Bot */
    client: Client;
    /* Token dùng để connect tới bot */
    botToken: string = "MTIxMzA1MTA5MjgwNDU3MTE4Nw.G_rhzx.Ev9Yp0oEAI6A3t6FRS2u5vZDX5XS4ArhZK3BpI";
    /* ID của kênh discord muốn làm việc */
    guildId: string = "1212951020255191090";
    /* Khai báo ra thuộc tính guild được ép kiểu theo Class Guild của discord*/
    guild: Guild;

    constructor(@Inject(forwardRef(() => ChatGateway)) private readonly chatSocket: ChatGateway) {

    }

    onModuleInit() {
        /* Khởi tạo instance client discord */
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
        })
        /* Yêu cầu client đăng nhập vào bot */
        this.client.login(this.botToken)
        /* Lắng nghe sự kiện ready từ server discord, nếu bot đã sẵn sàng sử dụng thì chạy callback function*/
        this.client.on("ready", () => {
            console.log("Discord Bot Socket opened")

            /* Các lệnh sau chỉ chạy được sau khi bot sẵn sàng */
            this.connectGuild();

            this.client.on("messageCreate", (message: Message) => {
                //console.log("message", message.content)
                if (!message.author.bot) {
                    //message.reply("Found")
                    console.log("message", this.chatSocket.sendMessage(message.channelId, message.content))
                }
            })
        })
    }

    connectGuild(): void {
        /* Lấy instance của kênh discord mình muốn làm việc theo ID Kênh và gán nó cho thuộc tính guild  */
        this.guild = this.client.guilds.cache.get(this.guildId);
    }

    async createTextChannel(channelName: string): Promise<TextChannel> {
        return this.guild.channels.create({
            name: channelName,
            type: ChannelType.GuildText
        })
    }

    async getTextChannel(channelId: string): Promise<TextChannel> {
        return (this.guild.channels.cache.get(channelId) as TextChannel)
    }
}
