import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { IpService } from './services/ip/ip.service';
import { OpenweatherService } from './services/openweather/openweather.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
  ],
  controllers: [AppController],
  providers: [OpenweatherService, IpService],
})
export class AppModule {}
