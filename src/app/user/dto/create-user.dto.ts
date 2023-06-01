export class CreateUserDto {
    tel: string;
    name: string;
    password: string;
    role: Role;
}

type Role = 'Client' | 'Desk' | 'Box';
