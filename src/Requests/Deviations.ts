import Deviant from "..";
import { DeviantionResponse } from "../../types/Responses";

class Deviantions {

    private api: Deviant | undefined;

    constructor(api: Deviant) {
        this.api = api;
    }

    async get(id: string): Promise<DeviantionResponse> {
        const response = await this.api?.send(`deviation/${id}`) as DeviantionResponse;

        return Promise.resolve(response);
    }
}

export default Deviantions;