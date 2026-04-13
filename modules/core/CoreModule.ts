import { UserModule } from "./UserModule";

export class CoreModule {
    private readonly baseUrl: string;
    private readonly headers: object;
    private readonly _user: UserModule;

    constructor(baseUrl: string, headers: object) {
        this.baseUrl = baseUrl;
        this.headers = headers;
        this._user = new UserModule(baseUrl, headers);
    }

    public user(): UserModule {
        return this._user;
    }
}
