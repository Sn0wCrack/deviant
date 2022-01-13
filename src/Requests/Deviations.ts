import Deviant from "..";
import { DeviantionMetadataResponse, DeviantionResponse, DeviationContentResponse } from "../Responses";

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

    async content(deviationId: string, withSession: boolean = false): Promise<DeviationContentResponse> {
        const data = {
            deviantionid: deviationId,
            with_session: withSession,
        };

        const response = await this.api?.send(`deviation/content`, data) as DeviationContentResponse;

        return Promise.resolve(response);
    }

    async metadata(deviationIds: Array<string>, options?: MetadataOptions): Promise<DeviantionMetadataResponse> {
        const data = {
            deviantionids: deviationIds,
            ext_submission: options?.submission ?? false,
            ext_camera: options?.submission ?? false,
            ext_stats: options?.stats ?? false,
            ext_collection: options?.collection ?? false,
            ext_gallery: options?.gallery ?? false,
            with_session: options?.withSession ??  false,
        }
        
        const response = await this.api?.send(`deviation/metedata`, data) as DeviantionMetadataResponse;

        return Promise.resolve(response);
    }
}

export default Deviantions;

export interface MetadataOptions {
    submission?: boolean;
    camera?: boolean;
    stats?: boolean;
    collection?: boolean;
    gallery?: boolean;
    withSession?: boolean;
}