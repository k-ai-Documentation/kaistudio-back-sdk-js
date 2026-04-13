# SDK Sync with kaistudio-back Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove SDK modules that have no corresponding backend routes and add coverage for backend endpoints the SDK is missing.

**Architecture:** Each task targets one file. Deletions come first to keep the codebase clean throughout; additions follow. TypeScript compilation (`npx tsc --noEmit`) serves as the verification pass since no test framework is configured.

**Tech Stack:** TypeScript, axios, Node.js

---

## File Map

| File | Change |
|---|---|
| `modules/core/AuthModule.ts` | Delete |
| `modules/file/FileModule.ts` | Delete |
| `modules/demo/DemoModule.ts` | Delete |
| `modules/audit/AuditModule.ts` | Delete |
| `modules/audit/UserModule.ts` | Delete |
| `modules/core/CoreModule.ts` | Remove `AuthModule` import, `_auth` field, `auth()` accessor |
| `modules/core/UserModule.ts` | Add `setUserAdmin()` method |
| `modules/globalAdmin/GlobalAdminModule.ts` | Create new |
| `index.ts` | Remove `FileModule`, `DemoModule`, `AuditModule`; add `GlobalAdminModule` |

---

### Task 1: Delete dead module files

**Files:**
- Delete: `modules/core/AuthModule.ts`
- Delete: `modules/file/FileModule.ts`
- Delete: `modules/demo/DemoModule.ts`
- Delete: `modules/audit/AuditModule.ts`
- Delete: `modules/audit/UserModule.ts`

- [ ] **Step 1: Delete the files**

```bash
rm modules/core/AuthModule.ts
rm modules/file/FileModule.ts
rm modules/demo/DemoModule.ts
rm modules/audit/AuditModule.ts
rm modules/audit/UserModule.ts
rmdir modules/file modules/demo modules/audit
```

- [ ] **Step 2: Verify files are gone**

```bash
ls modules/
```
Expected output:
```
core
studio
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "remove sdk modules with no backend routes (file, demo, audit, auth)"
```

---

### Task 2: Update CoreModule — remove AuthModule

**Files:**
- Modify: `modules/core/CoreModule.ts`

- [ ] **Step 1: Replace the full file content**

```typescript
import { UserModule } from "./UserModule";

export class CoreModule {
    private readonly baseUrl: string;
    private readonly headers: object;
    private readonly _user: UserModule;

    constructor(baseUrl: string, headers: object) {
        this.baseUrl = baseUrl;
        this.headers = headers;
        this._user = new UserModule(baseUrl, headers);
    }

    public user(): UserModule {
        return this._user;
    }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors (AuthModule import errors will have disappeared)

- [ ] **Step 3: Commit**

```bash
git add modules/core/CoreModule.ts
git commit -m "remove auth sub-module from CoreModule"
```

---

### Task 3: Add setUserAdmin to UserModule

**Files:**
- Modify: `modules/core/UserModule.ts`

Backend contract (`POST /core/user/set-user-admin`):
```
body: { id: string, is_global_admin?: boolean, organization_id?: string }
response: true
```

- [ ] **Step 1: Add the method at the end of the class, before the closing `}`**

Open `modules/core/UserModule.ts`. The file currently ends at line 134 with `}`. Insert the following method before that closing brace:

```typescript
    /**
     * Set user admin status
     * @param id User ID
     * @param isGlobalAdmin Whether to grant global admin role
     * @param organizationId Optional organization scope
     * @returns Update result
     */
    public async setUserAdmin(id: string, isGlobalAdmin?: boolean, organizationId?: string): Promise<any> {
        try {
            const request = await axios({
                url: `${this.baseUrl}/core/user/set-user-admin`,
                method: 'POST',
                headers: this.headers,
                data: {
                    id,
                    is_global_admin: isGlobalAdmin,
                    organization_id: organizationId
                }
            });
            return request.data.response;
        } catch (e) {
            throw e;
        }
    }
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add modules/core/UserModule.ts
git commit -m "add setUserAdmin to UserModule"
```

---

### Task 4: Create GlobalAdminModule

**Files:**
- Create: `modules/globalAdmin/GlobalAdminModule.ts`

Backend contracts:
```
POST /global-admin/list-users       body: { offset?: number, limit?: number }
POST /global-admin/list-apps        body: none
POST /global-admin/list-apps-for-user  body: { user_id: string }
POST /global-admin/add-app-for-user    body: { user_id: string, app_id: string }
POST /global-admin/remove-app-for-user body: { user_id: string, app_id: string }
POST /global-admin/toggle-user-active  body: { user_id: string }
```

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p modules/globalAdmin
```

Write `modules/globalAdmin/GlobalAdminModule.ts`:

```typescript
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add modules/globalAdmin/GlobalAdminModule.ts
git commit -m "add GlobalAdminModule"
```

---

### Task 5: Update index.ts

**Files:**
- Modify: `index.ts`

- [ ] **Step 1: Replace the full file content**

```typescript
import {CoreModule} from "./modules/core/CoreModule";
import {StudioModule} from "./modules/studio/StudioModule";
import {GlobalAdminModule} from "./modules/globalAdmin/GlobalAdminModule";

export interface KaiStudioCredentials {
    host?: string;
    token?: string;
}

export class KaiStudio {

    private readonly credentials: KaiStudioCredentials;
    private readonly _core: CoreModule;
    private readonly _studio: StudioModule;
    private readonly _globalAdmin: GlobalAdminModule;

    constructor(credentials: KaiStudioCredentials) {
        this.credentials = credentials;
        let baseUrl = 'https://back.kai-studio.ai';

        if (this.credentials.host) {
            baseUrl = this.credentials.host;
        }

        const authHeaders: Record<string, any> = {};
        if (this.credentials.token) {
            authHeaders['Authorization'] = `Bearer ${this.credentials.token}`;
        }

        this._core = new CoreModule(baseUrl, authHeaders);
        this._studio = new StudioModule(baseUrl, authHeaders);
        this._globalAdmin = new GlobalAdminModule(baseUrl, authHeaders);
    }

    public getCredentials(): KaiStudioCredentials {
        return this.credentials;
    }

    public core(): CoreModule {
        return this._core;
    }

    public studio(): StudioModule {
        return this._studio;
    }

    public globalAdmin(): GlobalAdminModule {
        return this._globalAdmin;
    }
}
```

- [ ] **Step 2: Verify TypeScript compiles cleanly**

```bash
npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add index.ts
git commit -m "update KaiStudio entry point: remove file/demo/audit, add globalAdmin"
```
