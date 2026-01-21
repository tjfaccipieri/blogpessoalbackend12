import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private _usernameField: string;
  private _passwordField: string;

  // ? esse cara vai ficar dando erro até criar o arquivo AuthService e importar ele aqui
  constructor(private readonly authService: AuthService) {
    super();
    this._usernameField = 'usuario';
    this._passwordField = 'senha';
  }

  async validate(usuario: string, senha: string): Promise<any> {
    //? aqui tbm vai ficar dando erro até criar o arquivo AuthService
    const validaUsuario = await this.authService.validateUser(usuario, senha);
    if (!validaUsuario) {
      throw new UnauthorizedException('Usuário e/ou senha incorretos!');
    }

    return validaUsuario;
  }
}
