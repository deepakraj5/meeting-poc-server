export class UserUnauthenticated extends Error {
    public readonly name: string = 'UserUnauthenticated'
    constructor() {
        super(`User Unauthenticated`)
    }
}
