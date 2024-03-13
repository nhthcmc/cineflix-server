import { Global, Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
@Global()
@Module({
  providers: [ChatGateway, ChatService],
  exports: [ChatGateway]
})
export class ChatModule { }
