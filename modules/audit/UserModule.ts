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
     * Get user for audit instance
     * @returns list of users
     */
    public async getUsersForInstance(instanceId: string, limit: number, offset: number): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/audit/user/get-users-for-instance`,
                method: 'POST',
                headers: this.headers,
                data: {
                    instance_id: instanceId,
                    limit: limit,
                    offset: offset
                }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Add a new user to instance
     * @param instanceId
     * @param username
     * @param email user email
     * @returns added result
     */
    public async addUser(instanceId: string, username: string, email: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/audit/user/add-user-to-instance`,
                method: 'POST',
                headers: this.headers,
                data: {
                    instance_id: instanceId,
                    username: username,
                    email: email
                }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * remove user from an audit instance
     * @returns updated result
     * @param instanceId
     * @param userId
     */
    public async removeUserFromInstance(instanceId: string, userId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/audit/user/remove-user-from-instance`,
                method: 'POST',
                headers: this.headers,
                data: {
                    instance_id: instanceId,
                    user_id: userId
                }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Set to admin of an audit instance
     * @returns updated result
     * @param instanceId
     * @param userId
     */
    public async setUserAdminForInstance(instanceId: string, userId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/audit/user/set-user-admin-for-instance`,
                method: 'POST',
                headers: this.headers,
                data: {
                    instance_id: instanceId,
                    user_id: userId
                }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * set to normal user for an audit instance
     * @param instanceId instance id
     * @param userId user id
     * @returns updated result
     */
    public async setUserNormalForInstance(instanceId: string, userId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/audit/user/set-user-normal-for-instance`,
                method: 'POST',
                headers: this.headers,
                data: {
                    instance_id: instanceId,
                    user_id: userId
                }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * check user is instance admin
     * @param instanceId instance id
     * @param userId user id
     * @returns boolean
     */
    public async isInstanceAdmin(instanceId: string, userId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/audit/user/user-is-admin-for-instance`,
                method: 'POST',
                headers: this.headers,
                data: {
                    instance_id: instanceId,
                    user_id: userId
                }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * check list user audit instance in an organization
     * @param organizationId organization id
     * @param userId user id
     * @returns boolean
     */
    public async listUserInstances(organizationId: string, userId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/audit/user/list-user-instances`,
                method: 'POST',
                headers: this.headers,
                data: {
                    organization_id: organizationId,
                    user_id: userId
                }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }
}
