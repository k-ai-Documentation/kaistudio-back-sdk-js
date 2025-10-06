import axios from "axios";

/**
 * File module, handles file-related functionality
 */
export class FileModule {
    private readonly baseUrl: string;
    private readonly headers: object;

    /**
     * Initialize the file module
     * @param baseUrl API base URL
     * @param headers HTTP request headers
     */
    constructor(baseUrl: string, headers: object) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    /**
     * Upload a file
     * @param file File object
     * @param instanceId Instance ID
     * @returns Upload result
     */
    public async upload(file: File, instanceId: string): Promise<any> {
        try {
            const formData = new FormData();
            formData.append('instance_id', instanceId);
            formData.append('file', file);

            const request = await axios({
                url: `${this.baseUrl}/file/manage-file/upload`,
                method: 'POST',
                headers: {
                    ...this.headers,
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            });
            return request.data;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Download a file
     * @param instanceId Instance ID
     * @param fileName File name
     * @returns Download result (Blob)
     */
    public async download(instanceId: string, fileName: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/file/manage-file/download`,
                method: 'POST',
                headers: this.headers,
                data: { instance_id: instanceId, file_name: fileName },
                responseType: 'blob'
            });
            return request.data;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Delete a file
     * @param instanceId Instance ID
     * @param fileName File name
     * @returns Delete result
     */
    public async delete(instanceId: string, fileName: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/file/manage-file/delete`,
                method: 'POST',
                headers: this.headers,
                data: { instance_id: instanceId, file_name: fileName }
            });
            return request.data;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get the list of files
     * @param instanceId Instance ID
     * @returns List of files
     */
    public async list(instanceId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/file/manage-file/list`,
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
