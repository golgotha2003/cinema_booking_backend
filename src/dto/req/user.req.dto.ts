export interface SignUpRequestDto {
    avatar: string;
    email: string;
    password: string;
    full_name: string;
    phone: string;
    role: string;
}

export interface SignInRequestDto {
    email: string;
    password: string;
}