# SDK Sync with kaistudio-back Design

**Date:** 2026-04-13  
**Reference backend:** `kaistudio-back/src/app.py`

## Goal

Align `sdk-js-kaistudio` with the actual routes mounted in the backend. Remove SDK modules that have no corresponding backend routes; add coverage for backend routes the SDK is missing.

## Backend surface (source of truth)

The backend mounts three top-level modules:
- `/core` → `/core/user/*` (6 endpoints)
- `/studio` → `/studio/instance/*`, `/studio/knowledge-base/*`, `/studio/organization/*` (31 endpoints)
- `/global-admin` → 6 endpoints

## Deletions

The following SDK modules call routes that do not exist in the backend and must be removed entirely:

| Module file(s) | Routes targeted | Action |
|---|---|---|
| `modules/core/AuthModule.ts` | `/core/auth/login`, `/core/auth/refresh-token` | Delete file; remove `auth()` accessor and field from `CoreModule` |
| `modules/file/FileModule.ts` | `/file/manage-file/*` | Delete file and `modules/file/` directory |
| `modules/demo/DemoModule.ts` | `/demo/instance/*` | Delete file and `modules/demo/` directory |
| `modules/audit/AuditModule.ts`, `modules/audit/UserModule.ts` | `/audit/user/*` | Delete both files and `modules/audit/` directory |

`index.ts` changes:
- Remove imports: `FileModule`, `DemoModule`, `AuditModule`
- Remove private fields: `_file`, `_demo`, `_audit`
- Remove constructor wiring for the three modules above
- Remove public accessors: `file()`, `demo()`, `audit()`

## Additions

### 1. `setUserAdmin` on `CoreModule.user()`

Add to `modules/core/UserModule.ts`:

```
setUserAdmin(id: string, isGlobalAdmin?: boolean, organizationId?: string): Promise<any>
  → POST /core/user/set-user-admin
  body: { id, is_global_admin, organization_id }
```

### 2. New `GlobalAdminModule`

Create `modules/globalAdmin/GlobalAdminModule.ts` with these methods:

| Method | Endpoint | Body |
|---|---|---|
| `listUsers(offset?, limit?)` | POST `/global-admin/list-users` | `{ offset, limit }` |
| `listApps()` | POST `/global-admin/list-apps` | — |
| `listAppsForUser(userId)` | POST `/global-admin/list-apps-for-user` | `{ user_id }` |
| `addAppForUser(userId, appId)` | POST `/global-admin/add-app-for-user` | `{ user_id, app_id }` |
| `removeAppForUser(userId, appId)` | POST `/global-admin/remove-app-for-user` | `{ user_id, app_id }` |
| `toggleUserActive(userId)` | POST `/global-admin/toggle-user-active` | `{ user_id }` |

`index.ts` changes:
- Add import: `GlobalAdminModule`
- Add private field: `_globalAdmin`
- Wire in constructor: `new GlobalAdminModule(baseUrl, authHeaders)`
- Add public accessor: `globalAdmin(): GlobalAdminModule`

## File change summary

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
| `index.ts` | Remove 3 modules, add `GlobalAdminModule` |
