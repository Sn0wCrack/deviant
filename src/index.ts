import got from "got/dist/source";
import Grant from "./Grant";
import { AuthorizationSuccess, PlaceboResponse } from "./Responses";
import Deviantions from "./Requests/Deviations";

const BASE_URL = 'https://www.deviantart.com/api/v1/oauth2';
const AUTHORIZE_URL = 'https://www.deviantart.com/oauth2/authorize';
const TOKEN_URL = 'https://www.deviantart.com/oauth2/token';
const REVOKE_URL = 'https://www.deviantart.com/oauth2/revoke';

class Deviant {
    private clientId: number | undefined;
    private clientSecret: string | undefined;

    private userAgent: string | undefined;

    private grant: Grant | undefined;

    constructor(auth: AuthenticationOptions, options?: HttpOptions) {
        this.clientId = auth.clientId;
        this.clientSecret = auth.clientSecret;

        this.userAgent = options?.userAgent;
    }

    async authorize(): Promise<void> {
        try {
            const authorizeResponse: AuthorizationSuccess = await got.post(TOKEN_URL, {
                headers: {
                    'User-Agent': this.userAgent
                },
                form: {
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    grant_type: 'client_credentials'
                },
                responseType: 'json'
            })
            .json();


            if (authorizeResponse?.status !== 'success') {
                Promise.reject();
            }

            const grant = new Grant(
                authorizeResponse.access_token,
                authorizeResponse.token_type,
                authorizeResponse.expires_in
            );

            this.grant = grant;
        } catch (ex) {
            return Promise.reject();
        }

        return Promise.resolve();
    }

    async placebo(): Promise<boolean> {
        const response: PlaceboResponse = await this.send('placebo') as PlaceboResponse;

        return Promise.resolve(response.status === 'success');
    }

    deviations(): Deviantions {
        return new Deviantions(this);
    }

    async send(endpoint: string, data?: Record<string, any>): Promise<Record<string, any>> {
        if (!this.grant) {
            return Promise.reject();
        }

        try {
            const response = await got.post(`${BASE_URL}/${endpoint}`, {
                headers: {
                    'User-Agent': this.userAgent,
                    'Authorization': this.grant.getAuthorizationHeader(),
                },
                form: data,
                responseType: 'json'
            })
            .json<Record<string, any>>();

            return Promise.resolve(response);
        } catch (ex) {
            return Promise.reject();
        }
    }
}

export default Deviant;

export interface AuthenticationOptions {
    clientId: number;
    clientSecret: string;
}

export interface HttpOptions {
    userAgent?: string;
}
