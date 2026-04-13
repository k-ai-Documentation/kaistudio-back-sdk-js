import axios from "axios";

export class GlobalAdminModule {
    private readonly baseUrl: string;
    private readonly headers: object;

    constructor(baseUrl: string, headers: object) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    public async listUsers(offset?: number, limit?: number): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/global-admin/list-users`,
                method: 'POST',
                headers: this.headers,
                data: { offset, limit }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    public async listApps(): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/global-admin/list-apps`,
                method: 'POST',
                headers: this.headers
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    public async listAppsForUser(userId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/global-admin/list-apps-for-user`,
                method: 'POST',
                headers: this.headers,
                data: { user_id: userId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    public async addAppForUser(userId: string, appId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/global-admin/add-app-for-user`,
                method: 'POST',
                headers: this.headers,
                data: { user_id: userId, app_id: appId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    public async removeAppForUser(userId: string, appId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/global-admin/remove-app-for-user`,
                method: 'POST',
                headers: this.headers,
                data: { user_id: userId, app_id: appId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }

    public async toggleUserActive(userId: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/global-admin/toggle-user-active`,
                method: 'POST',
                headers: this.headers,
                data: { user_id: userId }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }
}
