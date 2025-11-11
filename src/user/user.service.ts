import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user-dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user";
import { UpdatePatchUserDTO } from "./dto/update-patch-user";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {

    }

    async create(data: CreateUserDTO) {

        return await this.prisma.user.create({
            data,
        });
    }

    async llst() {
        return this.prisma.user.findMany();
    }

    async findById(id: number) {

        await this.exists(id);

        return this.prisma.user.findUnique({
            where: { id },
        })
    }

    async update(id: number, {name, email, password, bithday}: UpdatePutUserDTO) {

        await this.exists(id);

        return this.prisma.user.update({
            where: { id },
            data: { name, email, password, bithday: bithday ? new Date(bithday) : null },
        });
    }

    async updatePartial(id: number, {name, email, password, bithday}: UpdatePatchUserDTO) {

        await this.exists(id);

        const data: any = {};

        if(bithday) {
            data.bithday = new Date(bithday);
        }
        if(name) {
            data.name = name;
        }
        if(email) {
            data.email = email;
        }
        if(password) {
            data.password = password;
        }

        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async delete(id: number) {

        await this.exists(id);

        return this.prisma.user.delete({
            where: { id },
        });
    }

    async exists(id: number) {
        if (!(await this.prisma.user.count({
            where: { id },
        }))) {
            throw new NotFoundException(`O usuário ${id} não encontrado`);
        }
    }
}