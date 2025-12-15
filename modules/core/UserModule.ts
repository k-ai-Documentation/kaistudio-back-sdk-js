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
                url: `${this.baseUrl}/core/user/info`,
                method: 'POST',
                headers: this.headers
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Add a new user
     * @param name User name
     * @param email User email
     * @param organization_id organization id
     * @returns Newly created user information
     */
    public async addUser(name: string, email: string, organization_id: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/core/user/add-user`,
                method: 'POST',
                headers: this.headers,
                data: {
                    name,
                    email,
                    organization_id
                }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Add a new user
     * @param id User id
     * @param name User name
     * @param email User email
     * @param organization_id organization id
     * @returns Newly created user information
     */
    public async updateUser(id: string, name: string, email: string, organization_id: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/core/user/update-user`,
                method: 'POST',
                headers: this.headers,
                data: {
                    id,
                    name,
                    email,
                    organization_id
                }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Delete a user
     * @param id User ID
     * @param organization_id organization id
     * @returns Deletion result
     */
    public async deleteUser(id: string, organization_id: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/core/user/delete-user`,
                method: 'POST',
                headers: this.headers,
                data: {
                    id,
                    organization_id
                }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Update user password
     * @param id User ID
     * @param password New password
     * @returns Update result
     */
    public async updatePassword(id: string, password: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/core/user/update-password`,
                method: 'POST',
                headers: this.headers,
                data: {
                    id,
                    password
                }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }
}
