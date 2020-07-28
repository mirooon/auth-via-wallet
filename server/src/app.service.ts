import { Injectable, HttpException } from '@nestjs/common';
import { LoginDto } from './login/dto/login.dto';
import { getMessage } from '../../common/consts';
import { recoverPersonalSignature } from 'eth-sig-util';
import { JwtService } from '@nestjs/jwt';
import { JwtUser } from './login/interfaces/jwt-user.interface';


@Injectable()
export class AppService {
  constructor(private readonly jwtService: JwtService) {}

  loginUser(loginDto: LoginDto): string {
    const { accountAddress, signature } = loginDto;
    var recoveredAddr;
    try {
      recoveredAddr = recoverPersonalSignature({
        data: getMessage(),
        sig: signature,
      });

    } catch (err) {
      throw new HttpException('Problem with signature verification.', 403);
    }
    
    if (recoveredAddr.toLowerCase() !== accountAddress.toLowerCase()) {
      throw new HttpException('Signature is not correct.', 400);
    }
    //save your user here (i.e var user = await this.usersService.createWalletAccountIfNotExist(createUserDto);)
    const payload: JwtUser = {
      account_address: accountAddress,
    };

    const access_token = this.jwtService.sign(payload);
    return access_token;
  }
}
