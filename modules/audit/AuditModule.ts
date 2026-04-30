import { AuditUserModule } from "./AuditUserModule";

/**
 * Audit module, contains audit-related functionality
 * This module requires authentication
 */
export class AuditModule {
    private readonly baseUrl: string;
    private readonly headers: object;
    private readonly _user: AuditUserModule;

    /**
     * Initialize the audit module
     * @param baseUrl API base URL
     * @param headers HTTP request headers
     */
    constructor(baseUrl: string, headers: object) {
        this.baseUrl = baseUrl;
        this.headers = headers;
        this._user = new AuditUserModule(baseUrl, headers);
    }

    /**
     * Get the audit user module
     */
    public user(): AuditUserModule {
        return this._user;
    }
}
