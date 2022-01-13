import Deviant from "..";
import { DeviantionResponse } from "../Responses";

class Deviantions {

    private api: Deviant | undefined;

    constructor(api: Deviant) {
        this.api = api;
    }

    async get(deviationId: string, withSession: boolean = false): Promise<DeviantionResponse> {
        const data = {
            with_session: withSession,
        };

        const response = await this.api?.send(`deviation/${deviationId}`, data) as DeviantionResponse;

        return Promise.resolve(response);
    }
}

export default Deviantions;