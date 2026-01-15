import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Postagem } from '../../postagem/entities/postagem.entity';

@Entity({ name: 'tb_temas' })
export class Tema {
  @PrimaryGeneratedColumn() // Chave primária gerada automaticamente
  id: number;

  @IsNotEmpty() // Valida que o campo não pode ser vazio
  @Column({ length: 100, nullable: false }) // Coluna do tipo string, máximo 100 caracteres, obrigatória
  descricao: string;

  @OneToMany(() => Postagem, (postagem) => postagem.tema)
  postagem: Postagem[];
}
