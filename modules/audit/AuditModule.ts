import axios from "axios";
import { UserModule } from "./UserModule";

/**
 * Core module, contains authentication and user-related functionality
 * This module does not require authentication
 */
export class AuditModule {
    private readonly baseUrl: string;
    private readonly headers: object;
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
        this._user = new UserModule(baseUrl, headers);
    }

    /**
     * Get the user module
     */
    public user(): UserModule {
        return this._user;
    }
}
