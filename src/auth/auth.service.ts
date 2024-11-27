import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

type BodySignIn = {
  email: string;
  password: string;
};

type User = {
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  @Inject()
  private readonly jwtService: JwtService;

  async signIn(params: BodySignIn): Promise<{ access_Token: string,user:User }> {
    const user = await this.userRepository.findByEmail(params.email);
    if (!user) throw new NotFoundException('User not found');

    const passwordMath = await bcrypt.compare(params.password, user.password);
    if (!passwordMath) throw new UnauthorizedException('Invalid credentials');

    const payload = { id: user.id };

    return {
      access_Token: await this.jwtService.signAsync(payload),
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}
