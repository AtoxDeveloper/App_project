import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeycloakService {
  private readonly hostName: string;
  private readonly realm: string;
  private readonly clientId: string;
  private readonly clientSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.hostName = this.configService.get<string>('KC_HOST') || '';
    this.realm = this.configService.get<string>('KC_REALM') || '';
    this.clientId = this.configService.get<string>('KC_CLIENT_ID') || '';
    this.clientSecret = this.configService.get<string>('KC_CLIENT_SECRET') || '';
  }

  async getTokenByUsernamePassword(username: string, password: string): Promise<any> {
    const urlToken = `${this.hostName}/realms/${this.realm}/protocol/openid-connect/token`;
    const urlIntro = `${this.hostName}/realms/${this.realm}/protocol/openid-connect/token/introspect`;
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', this.clientId);
    params.append('client_secret', this.clientSecret);
    params.append('username', username);
    params.append('password', password);

    try {
      const response = await axios.post(urlToken, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.data && response.data.access_token) {
        const token = response.data.access_token
        const params = new URLSearchParams();
        params.append('token', token);
        params.append('client_id', this.clientId);
        params.append('client_secret', this.clientSecret);

        const res = await axios.post(urlIntro, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        return { "authorization": response.data, "infoUser" : res.data }
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async getActiveUser(token: string) {
    const urlIntro = `${this.hostName}/realms/${this.realm}/protocol/openid-connect/token/introspect`;
    const params = new URLSearchParams();
    params.append('token', token);
    params.append('client_id', this.clientId);
    params.append('client_secret', this.clientSecret);

    const res = await axios.post(urlIntro, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return { "active": res.data.active }
  }

}
