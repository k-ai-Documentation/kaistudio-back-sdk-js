# sdk-js-kaistudio

SDK js/ts enables developers to efficiently manage files, instances, organizations, and users in KAI Studio. This toolkit is designed to streamline the integration of KAI Studio functionalities into JS/TS-based projects.

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
    token: "YOUR_ACCESS_TOKEN",         // Optional: required for authenticated endpoints
});
```

### Authentication

If you don't have a token yet, you can login using the Core module:

```typescript
const loginResponse = await kaiStudio.core().auth().login("username", "password");
// Use the token from loginResponse for subsequent requests
```

## Modules Structure

The SDK is organized into four main modules accessible through the main `KaiStudio` instance:

### 1. Core Module (`kaiStudio.core()`)
Handles fundamental operations like authentication and user management.

**Auth** (`.auth()`):
- `login(username, password)`
- `refreshToken()`

**User** (`.user()`):
- `getInfo()`: Get current user details.
- `addUser(name, email, orgId)`
- `updateUser(id, name, email, orgId)`
- `deleteUser(id, orgId)`
- `updatePassword(id, password)`

### 2. Studio Module (`kaiStudio.studio()`)
The primary module for managing KAI Studio resources including Organizations, Instances, and Knowledge Bases.

**Organization** (`.organization()`):
- `list()`: List organizations user belongs to.
- `create(name)`: Create a new organization.
- `changeName(orgId, name)`
- `listUsers(orgId)`
- `addUser(orgId, userId, isAdmin)`
- `removeUser(orgId, userId)`
- `listInstances(orgId)`

**Instance** (`.instance()`):
- `create(orgId, name)`
- `get(instanceId)`
- `getDetail(instanceId)`
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

**Knowledge Base** (`.knowledgeBase()`):
- `listAvailableKbType()`
- `getCredentialsForByType(type)`

### 3. File Module (`kaiStudio.file()`)
Manages file operations for instances.

- `list(instanceId)`
- `upload(file, instanceId)`: Uploads a `File` object.
- `download(instanceId, fileName)`
- `delete(instanceId, fileName)`

### 4. Demo Module (`kaiStudio.demo()`)
Handles operations related to demo instances.

- `listInstances()`
- `listInstancesForUserAndOrg(userId, orgId)`
- `getInstanceDetail(instanceId)`

## Usage Examples

Here is a comprehensive example showing various capabilities:

```typescript
import { KaiStudio } from 'sdk-js-kaistudio';

async function main() {
    // 1. Initialize
    const kaiStudio = new KaiStudio({
        host: 'http://localhost:4000',
        token: "YOUR_TOKEN_HERE"
    });

    // 2. User Info
    const user = await kaiStudio.core().user().getInfo();
    console.log('User:', user);

    // 3. Organization Operations
    const orgs = await kaiStudio.studio().organization().list();
    const orgId = orgs[0].id;
    console.log('Organizations:', orgs);

    // 4. Instance Operations
    // Create Instance
    const instance = await kaiStudio.studio().instance().create(orgId, "My New Instance");
    const instanceId = instance.id;
    
    // Set Scenarios
    await kaiStudio.studio().instance().setScenarios(instanceId, ["SEARCH"]);

    // 5. Knowledge Base
    await kaiStudio.studio().instance().addKb(instanceId, "SHAREPOINT", {
        "client": "client_id",
        "spHost": "sharepoint.com",
        "siteName": "Tech",
        // ... other options
    }, {
        "subject": "Description of the subject"
    });

    const kbs = await kaiStudio.studio().instance().listKb(instanceId);
    console.log('Knowledge Bases:', kbs);

    // 6. File Operations
    const files = await kaiStudio.file().list(instanceId);
    console.log('Files:', files);

    // 7. Cleanup
    await kaiStudio.studio().instance().delete(instanceId);
}

main();
```

## Contributing

- bxu@k-ai.ai
- rmei@k-ai.ai
- sngo@k-ai.ai
