import axios from "axios";
import { AuthModule } from "./AuthModule";
import { UserModule } from "./UserModule";

/**
 * Core module, contains authentication and user-related functionality
 * This module does not require authentication
 */
export class CoreModule {
    private readonly baseUrl: string;
    private readonly headers: object;
    private readonly _auth: AuthModule;
    private readonly _user: UserModule;

    /**
     * Initialize the core module
     * @param baseUrl API base URL
     * @param headers HTTP request headers
     */
    constructor(baseUrl: string, headers: object) {
        this.baseUrl = baseUrl;
        this.headers = headers;

        // Initialize sub-modules
        this._auth = new AuthModule(baseUrl, headers);
        this._user = new UserModule(baseUrl, headers);
    }

    /**
     * Get the authentication module
     */
    public auth(): AuthModule {
        return this._auth;
    }

    /**
     * Get the user module
     */
    public user(): UserModule {
        return this._user;
    }
}
