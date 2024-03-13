import { Global, Module } from '@nestjs/common';
import { DiscordSocketService } from './discord.service';

@Global()
@Module({
    providers: [DiscordSocketService],
    exports: [DiscordSocketService]
})
export class DiscordSocketModule { }
