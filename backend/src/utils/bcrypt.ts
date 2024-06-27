import * as bcrypt from 'bcrypt';

export async function encodePassword(rawPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);
    return hashedPassword;
}

export function comparePasswords(rawPassword: string, hash:string) {
    return bcrypt.compareSync(rawPassword, hash);
}