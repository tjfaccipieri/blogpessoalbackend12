import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../../usuario/services/usuario.service';
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuariologin.entity';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
  ) {}

  async validateUser(username: string, password: string) {
    const buscaUsuario = await this.usuarioService.fyndByUsuario(username);

    if (!buscaUsuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    const matchPassword = await this.bcrypt.compararSenhas(
      password,
      buscaUsuario.senha,
    );

    if (buscaUsuario && matchPassword) {
      // ? aqui fica dando erro do eslint, pq tem variavel não usada (de propósito)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senha, ...resposta } = buscaUsuario;
      return resposta;
    }

    return null;
  }

  async login(usuarioLogin: UsuarioLogin) {
    const payload = { sub: usuarioLogin.usuario };

    const buscaUsuario = await this.usuarioService.fyndByUsuario(
      usuarioLogin.usuario,
    );

    // ?aqui no return, não tem validação se o usuario existe ou não.. da pra deixar opcional ou fazer um if
    return {
      id: buscaUsuario?.id,
      nome: buscaUsuario?.nome,
      usuario: buscaUsuario?.usuario,
      senha: '',
      foto: buscaUsuario?.foto,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
