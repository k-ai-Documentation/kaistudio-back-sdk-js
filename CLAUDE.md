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

This is a TypeScript SDK for the KAI Studio API, published via npm from GitHub. It mirrors the three top-level modules mounted in the backend (`kaistudio-back/src/app.py`).

### Entry Point

`index.ts` exports the `KaiStudio` class, which is a **facade** over 3 modules. It accepts `{ host?, token? }` at construction and passes `baseUrl` + `Authorization: Bearer` headers to each module.

```typescript
const kai = new KaiStudio({ host: 'https://back.kai-studio.ai', token: 'TOKEN' });
kai.core()         // CoreModule
kai.studio()       // StudioModule
kai.globalAdmin()  // GlobalAdminModule
```

### Module Hierarchy

```
KaiStudio (facade)
├── CoreModule              → modules/core/
│   └── UserModule            (getInfo, addUser, updateUser, deleteUser, updatePassword, setUserAdmin)
├── StudioModule            → modules/studio/
│   ├── OrganizationModule    (list, create, user management, instance listing, kaistudio access)
│   ├── InstanceModule        (CRUD, deploy, generateApiKey, KB ops, demo access)
│   └── KnowledgeBaseModule   (listAvailableKbType, getCredentialsForByType, getKbTypeFromInternalType)
└── GlobalAdminModule       → modules/globalAdmin/
    (listUsers, listApps, listAppsForUser, addAppForUser, removeAppForUser, toggleUserActive)
```

### HTTP Pattern

Every method makes a POST request via axios. Responses are extracted as `request.data.response`. All modules share the same `baseUrl` and `{ Authorization: Bearer <token> }` header pattern.

### Backend Alignment

The SDK surface must stay in sync with `kaistudio-back/src/app.py`. Only add or remove SDK methods when the corresponding backend route is added or removed. The backend mounts: `/core`, `/studio`, `/global-admin`.
