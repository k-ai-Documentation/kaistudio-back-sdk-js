# sdk-js-kaistudio

SDK js/ts enables developers to efficiently manage instances, organizations, users, and global administration in KAI Studio. This toolkit is designed to streamline the integration of KAI Studio functionalities into JS/TS-based projects.

## Installation

```bash
npm install git+https://github.com/k-ai-Documentation/sdk-js-kaistudio.git --save
```

## Quick Start

### Initialization

To start using the SDK, you need to initialize the `KaiStudio` class. You can provide a custom host and an authentication token.

```typescript
import { KaiStudio } from 'sdk-js-kaistudio';

const kaiStudio = new KaiStudio({
    host: 'https://back.kai-studio.ai', // Optional: defaults to https://back.kai-studio.ai
    token: "YOUR_ACCESS_TOKEN",         // Required for authenticated endpoints
});
```

## Modules Structure

The SDK is organized into three main modules accessible through the main `KaiStudio` instance:

### 1. Core Module (`kaiStudio.core()`)
Handles user management operations.

**User** (`.user()`):
- `getInfo()`: Get current user details.
- `addUser(name, email, orgId)`
- `updateUser(id, name, email, orgId)`
- `deleteUser(id, orgId)`
- `updatePassword(id, password)`
- `setUserAdmin(id, isGlobalAdmin?, organizationId?)`: Set global admin or org admin status.

### 2. Studio Module (`kaiStudio.studio()`)
The primary module for managing KAI Studio resources including Organizations, Instances, and Knowledge Bases.

**Organization** (`.organization()`):
- `list()`: List organizations.
- `create(name)`
- `changeName(orgId, name)`
- `listUsers(orgId)`
- `addUser(orgId, userId, isAdmin)`
- `updateUser(orgId, userId, isAdmin)`
- `removeUser(orgId, userId)`
- `listInstances(orgId)`
- `isAdmin(orgId, userId)`
- `grantUserCanAccessKaistudio(orgId, userId)`
- `revokeUserCanAccessKaistudio(orgId, userId)`
- `userCanAccessKaistudio(orgId, userId)`

**Instance** (`.instance()`):
- `create(orgId, name)`
- `get(instanceId)`
- `getDetail(instanceId)`
- `updateDetail(instanceId, name, extraProperties, logoFile?)`
- `delete(instanceId)`
- `updateName(instanceId, name)`
- `setScenarios(instanceId, scenarios)`: Scenarios can be `AUDIT` or `SEARCH`.
- `deploy(instanceId)`
- `generateApiKey(instanceId)`
- **Knowledge Base Operations**:
  - `addKb(instanceId, type, options, searchGoal)`
  - `updateKb(id, instanceId, type, options, searchGoal)`
  - `listKb(instanceId)`
  - `deleteKb(id, instanceId)`
- **Demo Access**:
  - `grantUserAccessDemo(instanceId, userId)`
  - `revokeUserAccessDemo(instanceId, userId)`
  - `getAllUsersAccessDemo(instanceId)`

**Knowledge Base** (`.knowledgeBase()`):
- `listAvailableKbType()`
- `getCredentialsForByType(type)`
- `getKbTypeFromInternalType(type)`

### 3. Global Admin Module (`kaiStudio.globalAdmin()`)
Handles global platform administration. Requires global admin role.

- `listUsers(offset?, limit?)`
- `listApps()`
- `listAppsForUser(userId)`
- `addAppForUser(userId, appId)`
- `removeAppForUser(userId, appId)`
- `toggleUserActive(userId)`

## Usage Example

```typescript
import { KaiStudio } from 'sdk-js-kaistudio';

async function main() {
    // 1. Initialize
    const kaiStudio = new KaiStudio({
        host: 'https://back.kai-studio.ai',
        token: "YOUR_TOKEN_HERE"
    });

    // 2. User Info
    const user = await kaiStudio.core().user().getInfo();
    console.log('User:', user);

    // 3. Organization Operations
    const orgs = await kaiStudio.studio().organization().list();
    const orgId = orgs[0].id;

    // 4. Instance Operations
    const instance = await kaiStudio.studio().instance().create(orgId, "My New Instance");
    const instanceId = instance.id;

    await kaiStudio.studio().instance().setScenarios(instanceId, ["SEARCH"]);

    // 5. Knowledge Base
    await kaiStudio.studio().instance().addKb(instanceId, "SHAREPOINT", {
        "client": "client_id",
        "spHost": "sharepoint.com",
        "siteName": "Tech",
    }, {
        "subject": "Description of the subject"
    });

    const kbs = await kaiStudio.studio().instance().listKb(instanceId);
    console.log('Knowledge Bases:', kbs);

    // 6. Cleanup
    await kaiStudio.studio().instance().delete(instanceId);
}

main();
```

## Contributing

- bxu@k-ai.ai
- rmei@k-ai.ai
- sngo@k-ai.ai
