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
     * @param userId User ID
     * @param isAdmin Whether the user is an admin, defaults to false
     * @returns Add result
     */
    public async addUser(organizationId: string, userId: string, isAdmin: boolean = false): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/organization/add_user`,
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
     * Get the list of users in an organization
     * @param organizationId Organization ID
     * @returns List of users
     */
    public async listUsers(organizationId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/organization/list_user`,
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
                url: `${this.baseUrl}/studio/organization/change_name`,
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
                url: `${this.baseUrl}/studio/organization/list_instances`,
                method: 'POST',
                headers: this.headers,
                data: { organization_id: organizationId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }
}
