import axios from "axios";

/**
 * Instance module, handles instance-related functionality
 */
export class InstanceModule {
    private readonly baseUrl: string;
    private readonly headers: object;

    /**
     * Initialize the instance module
     * @param baseUrl API base URL
     * @param headers HTTP request headers
     */
    constructor(baseUrl: string, headers: object) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    /**
     * Create a new instance
     * @param organizationId Organization ID
     * @param name Instance name
     * @returns Creation result
     */
    public async create(organizationId: string, name: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/instance/create`,
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
     * Get instance configuration
     * @param instanceId Instance ID
     * @returns Instance configuration
     */
    public async get(instanceId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/instance/get-instance`,
                method: 'POST',
                headers: this.headers,
                data: { instance_id: instanceId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get instance detail
     * @param instanceId Instance ID
     * @returns Instance detail
     */
    public async getDetail(instanceId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/instance/get-instance-detail`,
                method: 'POST',
                headers: this.headers,
                data: { instance_id: instanceId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }

    /**
     * Update instance name
     * @param instanceId Instance ID
     * @param name New name
     * @returns Update result
     */
    public async updateName(instanceId: string, name: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/instance/update-name`,
                method: 'POST',
                headers: this.headers,
                data: { instance_id: instanceId, name }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Set instance scenarios
     * @param instanceId Instance ID
     * @param scenarios List of scenarios, can only be 'AUDIT' or 'SEARCH'
     * @returns Set result
     */
    public async setScenarios(instanceId: string, scenarios: string[]): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/instance/set-scenarios`,
                method: 'POST',
                headers: this.headers,
                data: { instance_id: instanceId, scenarios }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Delete instance
     * @param instanceId Instance ID
     * @returns Delete result
     */
    public async delete(instanceId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/instance/delete`,
                method: 'POST',
                headers: this.headers,
                data: { instance_id: instanceId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Deploy instance
     * @param instanceId Instance ID
     * @returns Deployment result
     */
    public async deploy(instanceId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/instance/deploy`,
                method: 'POST',
                headers: this.headers,
                data: { instance_id: instanceId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Generate API key
     * @param instanceId Instance ID
     * @returns API key
     */
    public async generateApiKey(instanceId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/instance/generate-apikey`,
                method: 'POST',
                headers: this.headers,
                data: { instance_id: instanceId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Add knowledge base
     * @param instanceId Instance ID
     * @param type Knowledge base type
     * @param options Options
     * @param searchGoal Search goal
     * @returns Add result
     */
    public async addKb(instanceId: string, type: string, options: any, searchGoal?: any): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/instance/add-kb`,
                method: 'POST',
                headers: this.headers,
                data: { 
                    instance_id: instanceId, 
                    type, 
                    options, 
                    search_goal: searchGoal 
                }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Update knowledge base
     * @param id Knowledge base ID
     * @param instanceId Instance ID
     * @param type Knowledge base type
     * @param options Options
     * @param searchGoal Search goal
     * @returns Update result
     */
    public async updateKb(id: string, instanceId: string, type: string, options: any, searchGoal?: any): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/instance/update-kb`,
                method: 'POST',
                headers: this.headers,
                data: { 
                    id, 
                    instance_id: instanceId, 
                    type, 
                    options, 
                    search_goal: searchGoal 
                }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get knowledge base list
     * @param instanceId Instance ID
     * @returns List of knowledge bases
     */
    public async listKb(instanceId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/instance/list-kb`,
                method: 'POST',
                headers: this.headers,
                data: { instance_id: instanceId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Delete knowledge base
     * @param id Knowledge base ID
     * @param instanceId Instance ID
     * @returns Delete result
     */
    public async deleteKb(id: string, instanceId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/instance/delete-kb`,
                method: 'POST',
                headers: this.headers,
                data: { id, instance_id: instanceId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Grant user access to demo
     * @param instanceId Instance ID
     * @param userId User ID
     * @returns Grant result
     */
    public async grantUserAccessDemo(instanceId: string, userId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/instance/grant-user-access-demo`,
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
     * Revoke user access to demo
     * @param instanceId Instance ID
     * @param userId User ID
     * @returns Revoke result
     */
    public async revokeUserAccessDemo(instanceId: string, userId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/instance/revoke-user-access-demo`,
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
     * Get list of users who can access demo
     * @param instanceId Instance ID
     * @returns List of users
     */
    public async getAllUsersAccessDemo(instanceId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/instance/get-all-user-access-demo`,
                method: 'POST',
                headers: this.headers,
                data: { instance_id: instanceId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Update instance details
     * @param instanceId Instance ID
     * @param name Name
     * @param extraProperties Extra properties
     * @param logoFile Logo file (must be SVG format)
     * @returns Update result
     */
    public async updateDetail(instanceId: string, name: string, extraProperties: any, logoFile?: File): Promise<any> {
        try {
            const formData = new FormData();
            formData.append('instance_id', instanceId);
            formData.append('name', name);
            formData.append('extraproperties', JSON.stringify(extraProperties));

            if (logoFile) {
                formData.append('logo', logoFile);
            }

            const request = await axios({
                url: `${this.baseUrl}/studio/instance/update-instance-detail`,
                method: 'POST',
                headers: {
                    ...this.headers,
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }
}
