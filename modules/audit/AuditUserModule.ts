import axios from "axios";

/**
 * Audit User module, handles audit/user-related functionality
 */
export class AuditUserModule {
    private readonly baseUrl: string;
    private readonly headers: object;

    /**
     * Initialize the audit user module
     * @param baseUrl API base URL
     * @param headers HTTP request headers
     */
    constructor(baseUrl: string, headers: object) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    /**
     * Add user to instance
     * @param instanceId Instance ID
     * @param username Username
     * @param email Email address
     * @param id Optional user ID
     * @param extraproperties Optional extra properties
     * @returns Add result
     */
    public async addUserToInstance(instanceId: string, username: string, email: string, id?: string, extraproperties?: any): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/audit/user/add-user-to-instance`,
                method: 'POST',
                headers: this.headers,
                data: { instance_id: instanceId, username, email, id, extraproperties }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Remove user from instance
     * @param instanceId Instance ID
     * @param userId User ID
     * @returns Remove result
     */
    public async removeUserFromInstance(instanceId: string, userId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/audit/user/remove-user-from-instance`,
                method: 'POST',
                headers: this.headers,
                data: { instance_id: instanceId, user_id: userId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * List user instances
     * @param userId User ID
     * @param organizationId Organization ID
     * @returns List of instances for the user
     */
    public async listUserInstances(userId: string, organizationId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/audit/user/list-user-instances`,
                method: 'POST',
                headers: this.headers,
                data: { user_id: userId, organization_id: organizationId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Check if user is admin for instance
     * @param instanceId Instance ID
     * @param userId User ID
     * @returns Admin status
     */
    public async userIsAdminForInstance(instanceId: string, userId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/audit/user/user-is-admin-for-instance`,
                method: 'POST',
                headers: this.headers,
                data: { instance_id: instanceId, user_id: userId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Set user as admin for instance
     * @param instanceId Instance ID
     * @param userId User ID
     * @returns Set result
     */
    public async setUserAdminForInstance(instanceId: string, userId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/audit/user/set-user-admin-for-instance`,
                method: 'POST',
                headers: this.headers,
                data: { instance_id: instanceId, user_id: userId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Set user as regular (non-admin) for instance
     * @param instanceId Instance ID
     * @param userId User ID
     * @returns Set result
     */
    public async setUserRegularForInstance(instanceId: string, userId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/audit/user/set-user-regular-for-instance`,
                method: 'POST',
                headers: this.headers,
                data: { instance_id: instanceId, user_id: userId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }
}
