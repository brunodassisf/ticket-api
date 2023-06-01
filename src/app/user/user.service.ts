import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/lib/prismaClient';
import { cryptHash } from 'src/util/bcrypt';

@Injectable()
export class UserService {
    private prisma = new PrismaService();
    async create(createUserDto: CreateUserDto) {
        try {
            const { password, tel, ...data } = createUserDto;

            const user = await this.prisma.user.findFirst({ where: { tel } });
            if (user) throw new ConflictException('Telefone já está em uso');

            const hash = await cryptHash(password);

            await this.prisma.user.create({ data: { hash, tel, ...data } });
            return {
                message: 'Usuário cadastrado com sucesso',
            };
        } catch (error) {
            throw new InternalServerErrorException('Erro ao cadastrar usuário');
        }
    }

    findAll() {
        return `This action returns all user`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
