interface UserDto {
    id?: string;
    username: string;
    password: string;
    email: string;
    fullName: string;
    lastName: string;
    createdAt?: string;
    updatedAt?: string;
}

export default UserDto;