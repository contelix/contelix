import { sign } from "jsonwebtoken";
import FluffyAuthErro from "../errors/FluffyErrorAuth.error";
import { JWT_KEY } from "../../env";

export interface JwtTokens {
    token: string,
    refreshToken: string
}

async function checkUser(username: string, password: string): Promise<boolean> {
    // TODO: Implement
    return true;
}

export async function login(username: string, password: string): Promise<JwtTokens> {
    if (!await checkUser(username, password)) {
        throw new FluffyAuthErro("Wrong username and/or password!");
    }
    
    return {
        token: sign({ sub: username }, JWT_KEY, {
            expiresIn: "1d"
        }),
        refreshToken: sign({ sub: username }, JWT_KEY, {
            expiresIn: "31d"
        })
    }
}