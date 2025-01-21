import { Controller, Request, Post, UseGuards, Body, HttpException, HttpStatus, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../utils/jwt/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) { }

  @Post('login')
  @ApiOperation({ summary: 'Login um novo usuario' })
  @ApiResponse({ status: 201, description: 'usuario logado com sucesso.' })
  async login(@Body() body) {
    try {
      return this.authService.login(body.email, body.password);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refreash um novo usuario' })
  @ApiResponse({ status: 201, description: 'usuario Refreash com sucesso.' })
  async refreshToken(@Body() body: { refreshToken: string }) {
    try {
      return this.authService.refreshAccessToken(body.refreshToken);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @ApiOperation({ summary: 'Validade token' })
  @ApiResponse({ status: 200, description: 'token  com sucesso.' })
  @Get(':token')
  async findAll(@Param('token') token: string) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      });

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

}