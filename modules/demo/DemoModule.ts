import axios from "axios";

/**
 * Demo module, handles demo-related functionality
 */
export class DemoModule {
    private readonly baseUrl: string;
    private readonly headers: object;

    /**
     * Initialize the demo module
     * @param baseUrl API base URL
     * @param headers HTTP request headers
     */
    constructor(baseUrl: string, headers: object) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    /**
     * Get the list of demo instances accessible to the user
     * @returns List of instances
     */
    public async listInstances(): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/demo/instance/list-instances`,
                method: 'POST',
                headers: this.headers
            });
            return request.data;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get the details of a demo instance
     * @param instanceId Instance ID
     * @returns Instance details including API key
     */
    public async getInstanceDetail(instanceId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/demo/instance/get-instance-detail`,
                method: 'POST',
                headers: this.headers,
                data: { instance_id: instanceId }
            });
            return request.data;
        } catch (e) {
            throw e;
        }
    }
}
