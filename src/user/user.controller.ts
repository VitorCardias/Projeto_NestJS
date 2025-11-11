import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user-dto";
import { UpdatePutUserDTO } from "./dto/update-put-user";
import { UpdatePatchUserDTO } from "./dto/update-patch-user";

@Controller('users')
export class UserController {

    @Post()
    async create(@Body() {name, email, password}: CreateUserDTO) {
        return {name, email, password};
    }

    @Get()
    async list() {
        return {users:[]}
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return {
            user:{}, 
            id
        }
    }

    @Put(':id')
    async update(@Body() {email, name, password}: UpdatePutUserDTO , @Param('id', ParseIntPipe) id: number) {

        return {
            method: 'PUT',
            id,
            email, name, password
        }

    }

    @Patch(':id')
    async updatePartial(@Body() {email, name, password}: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {

        return {
            method: 'PATCH',
            id,
            email, name, password
        }
    }

    @Delete(':id')
        async delete(@Param('id', ParseIntPipe) id: number) {
            return {
                id
            }
    }

}