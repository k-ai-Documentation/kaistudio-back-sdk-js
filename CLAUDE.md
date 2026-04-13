# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm install

# Compile TypeScript
npx tsc

# Run a TypeScript file directly
npx ts-node index.ts
npx ts-node test.ts
```

There is no configured test runner or linter.

## Architecture

This is a TypeScript SDK for the KAI Studio API, published via npm from GitHub.

### Entry Point

`index.ts` exports the `KaiStudio` class, which is a **facade** over 5 independent modules. It accepts `{ host?, token? }` at construction and passes `baseUrl` + `Authorization` headers to each module.

```typescript
const kai = new KaiStudio({ host: 'https://back.kai-studio.ai', token: 'TOKEN' });
kai.coreModule()    // CoreModule
kai.studioModule()  // StudioModule
kai.fileModule()    // FileModule
kai.demoModule()    // DemoModule
kai.auditModule()   // AuditModule
```

### Module Hierarchy

```
KaiStudio (facade)
├── CoreModule         → modules/core/
│   ├── AuthModule       (login, refreshToken)
│   └── UserModule       (getInfo, addUser, updateUser, deleteUser, updatePassword)
├── StudioModule       → modules/studio/
│   ├── OrganizationModule  (list, create, user management, instance listing)
│   ├── InstanceModule      (CRUD, deploy, generateApiKey, KB ops, demo access)
│   └── KnowledgeBaseModule (listAvailableKbType, getCredentialsForByType)
├── FileModule         → modules/file/
│   (upload, download, delete, list — uses multipart/form-data)
├── DemoModule         → modules/demo/
│   (listInstances, getInstanceDetail)
└── AuditModule        → modules/audit/
    └── UserModule  (get/add/remove/admin users for audit instances; *ByKaiId variants)
```

### HTTP Pattern

Every method makes a POST request via axios. Responses are extracted as `request.data.response`. File operations use `FormData` for multipart uploads. All modules share the same `baseUrl` and `{ Authorization: token }` header pattern.

### Resource Hierarchy

The API manages a three-level hierarchy: **Organizations → Instances → Knowledge Bases**. Instances have a `scenarios` field (e.g., `AUDIT`, `SEARCH`) that determines which capabilities are available. The `AuditModule` only applies to instances configured with the AUDIT scenario.