export interface User {
    id: string,
    name: string,
    mail: string,
    role: string,
    permissions: Array<string>
}