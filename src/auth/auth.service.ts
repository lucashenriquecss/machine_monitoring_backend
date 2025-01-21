import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUserByEmail(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneEmail(email);

    const isValidPassword = await this.comparePasswords(password, user.password);
    if (user && isValidPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  async login(
    email: string,
    pass: string,
  ): Promise<{ accessToken: string, refreshToken: string, idUser: string, username: string, role: any }> {
    const user = await this.usersService.findOneEmail(email.trim());
    if (!user) {
      throw new UnauthorizedException();
    }
    const isValidPassword = await this.comparePasswords(pass, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email, roles: user.roles };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
      idUser: user.id,
      username: user.name,
      role: user.roles,
    };
  }


  async refreshAccessToken(oldRefreshToken: string): Promise<{ accessToken: string, refreshToken: string }> {
    try {

      const payload = await this.jwtService.verifyAsync(oldRefreshToken, {
        secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      });

      const newAccessToken = await this.jwtService.signAsync(
        { sub: payload.sub, email: payload.email, roles: payload.roles },
        { expiresIn: '15m' },
      );

      const newRefreshToken = await this.jwtService.signAsync(
        { sub: payload.sub, email: payload.email, roles: payload.roles }, {
        expiresIn: '7d',
      });

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return await compare(plainTextPassword, hashedPassword);
  }

}