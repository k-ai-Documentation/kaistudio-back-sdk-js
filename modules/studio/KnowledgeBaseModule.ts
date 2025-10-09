import axios from "axios";

/**
 * Knowledge base module, handles knowledge base related functionality
 */
export class KnowledgeBaseModule {
    private readonly baseUrl: string;
    private readonly headers: object;

    /**
     * Initialize the knowledge base module
     * @param baseUrl API base URL
     * @param headers HTTP request headers
     */
    constructor(baseUrl: string, headers: object) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    /**
     * Get the list of available knowledge base types
     * @returns List of available knowledge base types
     */
    public async listAvailableKbType(): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/knowledge-base/list-available-kb-type`,
                method: 'POST',
                headers: this.headers
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get credentials information for a specific knowledge base type
     * @param kbType Knowledge base type
     * @returns Credentials information
     */
    public async getCredentialsForByType(kbType: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/knowledge-base/get-credentials-for-by-type`,
                method: 'POST',
                headers: this.headers,
                data: { kb_type: kbType }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get knowledge base type from internal type
     * @param kbType Internal knowledge base type
     * @returns Knowledge base type
     */
    public async getKbTypeFromInternalType(kbType: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/studio/knowledge-base/get-kb-type-from-internal-type`,
                method: 'POST',
                headers: this.headers,
                data: { kb_type: kbType }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }
}
