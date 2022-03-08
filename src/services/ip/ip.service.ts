import { Injectable } from '@nestjs/common';
import Axios from 'axios';

@Injectable()
export class IpService {
  readonly IP_API_URL = 'https://ipapi.co';

  async fetchCoordinatesByIp(
    ip: string,
  ): Promise<[number | 'Undefined', number | 'Undefined']> {
    const response = await Axios.get(`${this.IP_API_URL}/${ip}/latlong/`);
    return response.data.split(',');
  }
}
