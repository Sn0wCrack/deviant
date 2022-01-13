import { DateTime } from 'luxon';

class Grant {
    private accessToken: string;

    private tokenType: string;

    private expiresAt: DateTime;

    constructor(
        accessToken: string,
        tokenType: string,
        expiresIn: number
    ) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
        this.expiresAt = DateTime.utc().plus({seconds: expiresIn});
    }

    public getAccessToken(): string {
        return this.accessToken;
    }

    public getTokenType(): string {
        return this.tokenType;
    }

    public getExpiresAt(): DateTime {
        return this.expiresAt;
    }

    public isExpired(): boolean {
        return this.expiresAt <= DateTime.utc();
    }

    public getAuthorizationHeader(): string {
        return `${this.getTokenType()} ${this.getAccessToken()}`
    }
}

export default Grant;