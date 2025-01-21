import { ApiProperty } from "@nestjs/swagger";
import { Roles } from "../entities/user-roles.enum";

export class CreateUserDto {
    @ApiProperty({ description: 'Nome do usuario', example: 'Tommy' })
    readonly name: string;
    @ApiProperty({ description: 'Email do usuario', example: 'Tommy@gmail.com' })
    readonly email: string;
    @ApiProperty({ description: 'Senha do usuario', example: 'p' })
    readonly password: string;
    @ApiProperty({ description: 'Numero do usuario', example: 'p' })
    readonly phone: string;
    @ApiProperty({ description: 'Tipo do usuario', example: 'common,employee,enterprise,admin' })
    readonly roles: Roles[];
}