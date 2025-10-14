import axios from "axios";

/**
 * Organization module, handles organization-related functionality
 */
export class OrganizationModule {
    private readonly baseUrl: string;
    private readonly headers: object;

    /**
     * Initialize the organization module
     * @param baseUrl API base URL
     * @param headers HTTP request headers
     */
    constructor(baseUrl: string, headers: object) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    /**
     * Get the list of organizations that the user belongs to
     * @returns List of organizations
     */
    public async list(): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/organization/list`,
                method: 'POST',
                headers: this.headers
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Add user to organization
     * @param organizationId Organization ID
     * @param userEmail User ID
     * @param isAdmin Whether the user is an admin, defaults to false
     * @returns Add result
     */
    public async addUser(organizationId: string, userId: string, isAdmin: boolean = false): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/organization/add-user`,
                method: 'POST',
                headers: this.headers,
                data: { organization_id: organizationId, user_id: userId, is_admin: isAdmin }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Update user in organization
     * @param organizationId Organization ID
     * @param userId User ID
     * @param isAdmin Whether the user is an admin, defaults to false
     * @returns Update result
     */
    public async updateUser(organizationId: string, userId: string, isAdmin: boolean = false): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/organization/update-user`,
                method: 'POST',
                headers: this.headers,
                data: { organization_id: organizationId, user_id: userId, is_admin: isAdmin }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Remove user from organization
     * @param organizationId Organization ID
     * @param userId User ID
     * @returns Remove result
     */
    public async removeUser(organizationId: string, userId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/organization/remove-user`,
                method: 'POST',
                headers: this.headers,
                data: { organization_id: organizationId, user_id: userId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get the list of users in an organization
     * @param organizationId Organization ID
     * @returns List of users
     */
    public async listUsers(organizationId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/organization/list-user`,
                method: 'POST',
                headers: this.headers,
                data: { organization_id: organizationId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Change organization name
     * @param organizationId Organization ID
     * @param name New name
     * @returns Change result
     */
    public async changeName(organizationId: string, name: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/organization/change-name`,
                method: 'POST',
                headers: this.headers,
                data: { organization_id: organizationId, name }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get the list of instances in an organization
     * @param organizationId Organization ID
     * @returns List of instances
     */
    public async listInstances(organizationId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/organization/list-instances`,
                method: 'POST',
                headers: this.headers,
                data: { organization_id: organizationId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Check if user is admin of an organization
     * @param organizationId Organization ID
     * @param userId User ID
     * @returns Admin status
     */
    public async isAdmin(organizationId: string, userId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/organization/is-admin`,
                method: 'POST',
                headers: this.headers,
                data: { organization_id: organizationId, user_id: userId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Create organization
     * @param name Organization name
     * @returns Create result
     */
    public async create(name: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/organization/create`,
                method: 'POST',
                headers: this.headers,
                data: { name }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }
     
}
