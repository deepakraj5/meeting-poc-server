export class UserPasswordMisMatch extends Error {
    public readonly name: string = 'UserPasswordMisMatch'
    constructor() {
        super(`Given Password is wrong`)
    }
}
