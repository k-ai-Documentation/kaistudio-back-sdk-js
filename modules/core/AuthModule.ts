import axios from "axios";

/**
 * Auth module, for login, logout and refresh token
 */
export class AuthModule {
    private readonly baseUrl: string;
    private readonly headers: object;

    constructor(baseUrl: string, headers: object) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    /**
     * user login
     * @param username user name
     * @param password password
     * @returns login result, include token
     */
    public async login(username: string, password: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/auth/login`,
                method: 'POST',
                headers: this.headers,
                data: { username, password }
            });
            return request.data;
        } catch (e) {
            throw e;
        }
    }

    /**
     * refresh token
     * @returns refresh token result
     */
    public async refreshToken(): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/auth/refresh`,
                method: 'POST',
                headers: this.headers
            });
            return request.data;
        } catch (e) {
            throw e;
        }
    }
}
