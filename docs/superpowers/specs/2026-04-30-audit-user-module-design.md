# Audit User Module — Design Spec

**Date:** 2026-04-30

## Overview

Add an `AuditModule` to the `kaistudio-back-sdk-js` SDK that exposes the backend's `/audit/user/*` routes, mirroring the same facade pattern used by `StudioModule`.

## Background

The backend (`kaistudio-back/src/app.py`) mounts an `/audit` sub-application. Within it, `AuditUserModule` registers 6 POST routes under `/user`. These routes were not yet represented in the SDK.

## Architecture

```
KaiStudioBackApi (facade)
├── CoreModule              → modules/core/
├── StudioModule            → modules/studio/
├── GlobalAdminModule       → modules/globalAdmin/
└── AuditModule  (NEW)      → modules/audit/
    └── AuditUserModule (NEW)  (add/remove/list/admin ops for instance users)
```

## Files

### New: `modules/audit/AuditUserModule.ts`

Six public async methods. Each makes a POST request via axios and returns `request.data.response`. Base URL prefix: `/audit/user/`.

| Method | Route | Request body fields |
|---|---|---|
| `addUserToInstance` | `/audit/user/add-user-to-instance` | `instance_id`, `username`, `email`, `id?`, `extraproperties?` |
| `removeUserFromInstance` | `/audit/user/remove-user-from-instance` | `instance_id`, `user_id` |
| `listUserInstances` | `/audit/user/list-user-instances` | `user_id`, `organization_id` |
| `userIsAdminForInstance` | `/audit/user/user-is-admin-for-instance` | `instance_id`, `user_id` |
| `setUserAdminForInstance` | `/audit/user/set-user-admin-for-instance` | `instance_id`, `user_id` |
| `setUserRegularForInstance` | `/audit/user/set-user-regular-for-instance` | `instance_id`, `user_id` |

### New: `modules/audit/AuditModule.ts`

Facade class. Accepts `baseUrl` and `headers` in its constructor, instantiates `AuditUserModule`, and exposes a `user()` accessor.

### Updated: `index.ts`

- Import `AuditModule`
- Add `private readonly _audit: AuditModule` field
- Instantiate in constructor: `this._audit = new AuditModule(baseUrl, authHeaders)`
- Add `public audit(): AuditModule` accessor

## Usage

```typescript
const kai = new KaiStudioBackApi({ host: 'https://back.kai-studio.ai', token: 'TOKEN' });

// Add a user to an audit instance
await kai.audit().user().addUserToInstance(instanceId, 'alice', 'alice@example.com');

// List instances a user belongs to
await kai.audit().user().listUserInstances(userId, organizationId);

// Promote / demote
await kai.audit().user().setUserAdminForInstance(instanceId, userId);
await kai.audit().user().setUserRegularForInstance(instanceId, userId);
```

## Constraints

- No existing files other than `index.ts` are modified.
- All return types remain `Promise<any>` to match the existing SDK convention.
- HTTP pattern (POST + `request.data.response`) is identical to every other module.
