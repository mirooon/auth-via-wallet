import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDto } from './login/dto/login.dto';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto): string{
    return JSON.stringify(this.appService.loginUser(loginDto));
  }
}
