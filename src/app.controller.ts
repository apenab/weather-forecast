import { Controller, Get } from '@nestjs/common';
import { RealIP } from 'nestjs-real-ip';

import { IpService } from './services/ip/ip.service';
import { OpenweatherService } from './services/openweather/openweather.service';

@Controller()
export class AppController {
  constructor(
    private readonly openweather: OpenweatherService,
    private readonly ip: IpService,
  ) {}

  @Get('/weather')
  @Get('my-ip')
  async getWeather(@RealIP() ip: string): Promise<any> {
    const isLocalhost =
      ip === 'localhost' || ip === '127.0.0.1' || ip === '::1';

    try {
      let lat, lon;
      if (isLocalhost) {
        // When we're in localhost we use default values
        lat = 40.4168;
        lon = 3.7038;
      } else {
        const ipRes = await this.ip.fetchCoordinatesByIp(ip);
        lat = ipRes[0];
        lat = ipRes[1];
      }
      const openweatherRes = await this.openweather.fetchWeatherByCoordinates(
        lat,
        lon,
      );
      return openweatherRes.data;
    } catch (error) {
      return {
        status: error.response.status,
        statusText: error.response.statusText,
      };
    }
  }
}
