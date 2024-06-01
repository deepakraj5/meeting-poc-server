import bcrypt from 'bcryptjs'

const DEFAULT_SALT_FOR_HASH = 12

export const hashPassword = async (password: string): Promise<string> => {
    try {
        return bcrypt.hash(password, DEFAULT_SALT_FOR_HASH)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    try {
        return bcrypt.compare(password, hashedPassword)
    } catch (error) {
        console.log(error)
        throw error
    }
}
