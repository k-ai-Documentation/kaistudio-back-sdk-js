import {CoreModule} from "./modules/core/CoreModule";
import {StudioModule} from "./modules/studio/StudioModule";
import {FileModule} from "./modules/file/FileModule";
import {DemoModule} from "./modules/demo/DemoModule";

export interface KaiStudioCredentials {
    host?: string;
    token?: string; // core module do not need token
}

export class KaiStudio {

    private readonly credentials: KaiStudioCredentials;
    private readonly _core: CoreModule;
    private readonly _studio: StudioModule;
    private readonly _file: FileModule;
    private readonly _demo: DemoModule;

    constructor(credentials: KaiStudioCredentials) {
        this.credentials = credentials;
        let baseUrl = 'https://api.kai-studio.ai/';

        if (this.credentials.host) {
            baseUrl = this.credentials.host;
        }

        const authHeaders = {};
        if (this.credentials.token) {
            authHeaders['Authorization'] = `Bearer ${this.credentials.token}`;
        }

        this._core = new CoreModule(baseUrl, authHeaders);
        this._studio = new StudioModule(baseUrl, authHeaders);
        this._file = new FileModule(baseUrl, authHeaders);
        this._demo = new DemoModule(baseUrl, authHeaders);
    }

    public getCredentials(): KaiStudioCredentials {
        return this.credentials;
    }

    /**
     * Core Module
     */
    public core(): CoreModule {
        return this._core;
    }

    /**
     * Studio Module
     */
    public studio(): StudioModule {
        return this._studio;
    }

    /**
     * File Module
     */
    public file(): FileModule {
        return this._file;
    }

    /**
     * Demo Module
     */
    public demo(): DemoModule {
        return this._demo;
    }
}

