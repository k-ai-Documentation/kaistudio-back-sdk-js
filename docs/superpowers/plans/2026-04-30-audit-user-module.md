# Audit User Module Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `AuditModule` + `AuditUserModule` to the SDK, exposing the 6 `/audit/user/*` backend routes via `kai.audit().user().*`.

**Architecture:** Follow the existing facade pattern exactly — `AuditUserModule` holds the axios calls, `AuditModule` is a thin facade that instantiates and exposes it, and `index.ts` wires `AuditModule` in alongside the existing three modules.

**Tech Stack:** TypeScript, axios, `npx tsc` for compile verification (no test runner configured).

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `modules/audit/AuditUserModule.ts` | 6 axios POST methods for `/audit/user/*` routes |
| Create | `modules/audit/AuditModule.ts` | Facade — instantiates `AuditUserModule`, exposes `user()` |
| Modify | `index.ts` | Import `AuditModule`, add `_audit` field + `audit()` accessor |

---

### Task 1: Create `AuditUserModule.ts`

**Files:**
- Create: `modules/audit/AuditUserModule.ts`

- [ ] **Step 1: Create the file with all 6 methods**

```typescript
import axios from "axios";

export class AuditUserModule {
    private readonly baseUrl: string;
    private readonly headers: object;

    constructor(baseUrl: string, headers: object) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

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
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add modules/audit/AuditUserModule.ts
git commit -m "feat: add AuditUserModule with 6 audit/user routes"
```

---

### Task 2: Create `AuditModule.ts`

**Files:**
- Create: `modules/audit/AuditModule.ts`

- [ ] **Step 1: Create the facade file**

```typescript
import { AuditUserModule } from "./AuditUserModule";

export class AuditModule {
    private readonly baseUrl: string;
    private readonly headers: object;
    private readonly _user: AuditUserModule;

    constructor(baseUrl: string, headers: object) {
        this.baseUrl = baseUrl;
        this.headers = headers;
        this._user = new AuditUserModule(baseUrl, headers);
    }

    public user(): AuditUserModule {
        return this._user;
    }
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add modules/audit/AuditModule.ts
git commit -m "feat: add AuditModule facade"
```

---

### Task 3: Wire `AuditModule` into `index.ts`

**Files:**
- Modify: `index.ts`

- [ ] **Step 1: Update `index.ts`**

Replace the entire file with:

```typescript
import {CoreModule} from "./modules/core/CoreModule";
import {StudioModule} from "./modules/studio/StudioModule";
import {GlobalAdminModule} from "./modules/globalAdmin/GlobalAdminModule";
import {AuditModule} from "./modules/audit/AuditModule";

export interface KaiStudioCredentials {
    host?: string;
    token?: string;
    apiHost?: string
}

export class KaiStudioBackApi {

    private readonly credentials: KaiStudioCredentials;
    private readonly _core: CoreModule;
    private readonly _studio: StudioModule;
    private readonly _globalAdmin: GlobalAdminModule;
    private readonly _audit: AuditModule;

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

        if (credentials.apiHost) {
            authHeaders["api-host"] = credentials.apiHost;
        }

        this._core = new CoreModule(baseUrl, authHeaders);
        this._studio = new StudioModule(baseUrl, authHeaders);
        this._globalAdmin = new GlobalAdminModule(baseUrl, authHeaders);
        this._audit = new AuditModule(baseUrl, authHeaders);
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

    public audit(): AuditModule {
        return this._audit;
    }
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add index.ts
git commit -m "feat: expose AuditModule via KaiStudioBackApi.audit()"
```
