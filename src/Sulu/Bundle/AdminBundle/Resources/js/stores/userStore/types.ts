export type User = {
    id: number,
    locale: string,
    roles: string[],
    settings: {
        [key: string]: string
    },
    username: string
};

export type Contact = {
    avatar?: Avatar,
    firstName: string,
    fullName: string,
    id: number,
    lastName: string
};

export type Avatar = {
    id: number,
    thumbnails: {
        [key: string]: string
    },
    url: string
};

export type ForgotPasswordData = {
    user: string
};

export type ResetPasswordData = {
    password: string,
    token: string
};

export type LoginData = {
    password: string,
    username: string
};

export type TwoFactorData = {
    _auth_code: string,
    _trusted?: boolean
};
