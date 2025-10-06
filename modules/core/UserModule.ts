import axios from "axios";

/**
 * User module, handles user-related functionality
 */
export class UserModule {
    private readonly baseUrl: string;
    private readonly headers: object;

    /**
     * Initialize the user module
     * @param baseUrl API base URL
     * @param headers HTTP request headers
     */
    constructor(baseUrl: string, headers: object) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    /**
     * Get current user information
     * @returns Current user information
     */
    public async getInfo(): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/user/info`,
                method: 'POST',
                headers: this.headers
            });
            return request.data;
        } catch (e) {
            throw e;
        }
    }
}
