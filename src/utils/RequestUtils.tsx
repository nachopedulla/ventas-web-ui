export const isNotFiltered = (value: string | undefined) => value === undefined || value == 'Todas' || value === 'Todos';

export const isNotValidPassword = (password: string): boolean =>
    password === '' 
    || password.length < 8
    //|| password === password.toLowerCase();

export const isNotValidEmail = (email: string) => email === '' || !email.includes('@');