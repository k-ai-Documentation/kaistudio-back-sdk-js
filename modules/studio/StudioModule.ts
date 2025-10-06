import axios from "axios";
import { InstanceModule } from "./InstanceModule";
import { KnowledgeBaseModule } from "./KnowledgeBaseModule";
import { OrganizationModule } from "./OrganizationModule";

/**
 * Studio module, contains instance, knowledge base and organization-related functionality
 * This module requires authentication
 */
export class StudioModule {
    private readonly baseUrl: string;
    private readonly headers: object;
    private readonly _instance: InstanceModule;
    private readonly _knowledgeBase: KnowledgeBaseModule;
    private readonly _organization: OrganizationModule;

    /**
     * Initialize the studio module
     * @param baseUrl API base URL
     * @param headers HTTP request headers
     */
    constructor(baseUrl: string, headers: object) {
        this.baseUrl = baseUrl;
        this.headers = headers;

        // Initialize sub-modules
        this._instance = new InstanceModule(baseUrl, headers);
        this._knowledgeBase = new KnowledgeBaseModule(baseUrl, headers);
        this._organization = new OrganizationModule(baseUrl, headers);
    }

    /**
     * Get the instance module
     */
    public instance(): InstanceModule {
        return this._instance;
    }

    /**
     * Get the knowledge base module
     */
    public knowledgeBase(): KnowledgeBaseModule {
        return this._knowledgeBase;
    }

    /**
     * Get the organization module
     */
    public organization(): OrganizationModule {
        return this._organization;
    }
}
