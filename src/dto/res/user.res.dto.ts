export interface UserResponseDto {
    avatar: string;
    email: string;
    full_name: string;
    phone: string;
    role: string;
}
export interface CurrentResponseDto{
    avatar?: string;
    email: string;
    full_name: string;
    phone: string;
}

export interface AuthResponseDto{
    message: string;
    access_token?: string;
    error?: boolean;
    user?: UserResponseDto;
}