import { JWT } from "next-auth/jwt";

export interface JwtToken extends JWT {
    accessToken?: string;
    provider?: string;
    expiresAt?: number;
    refreshToken?: string;
    refreshExpiresIn?: number | unknown;
    tokenType?: string;
    scope?: string;
}
