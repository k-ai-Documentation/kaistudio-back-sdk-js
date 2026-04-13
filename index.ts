import {CoreModule} from "./modules/core/CoreModule";
import {StudioModule} from "./modules/studio/StudioModule";
import {GlobalAdminModule} from "./modules/globalAdmin/GlobalAdminModule";

export interface KaiStudioBackApiCredentials {
    host?: string;
    token?: string;
}

export class KaiStudioBackApi {

    private readonly credentials: KaiStudioBackApiCredentials;
    private readonly _core: CoreModule;
    private readonly _studio: StudioModule;
    private readonly _globalAdmin: GlobalAdminModule;

    constructor(credentials: KaiStudioBackApiCredentials) {
        this.credentials = credentials;
        let baseUrl = 'https://back.kai-studio.ai';

        if (this.credentials.host) {
            baseUrl = this.credentials.host;
        }

        const authHeaders: Record<string, any> = {};
        if (this.credentials.token) {
            authHeaders['Authorization'] = `Bearer ${this.credentials.token}`;
        }

        this._core = new CoreModule(baseUrl, authHeaders);
        this._studio = new StudioModule(baseUrl, authHeaders);
        this._globalAdmin = new GlobalAdminModule(baseUrl, authHeaders);
    }

    public getCredentials(): KaiStudioBackApiCredentials {
        return this.credentials;
    }

    public core(): CoreModule {
        return this._core;
    }

    public studio(): StudioModule {
        return this._studio;
    }

    public globalAdmin(): GlobalAdminModule {
        return this._globalAdmin;
    }
}
