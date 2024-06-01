export class UserNotFoundException extends Error {
    public readonly name: string = 'UserNotFoundException'
    constructor(email: string) {
        super(`No user found for email: ${email}`)
    }
}
