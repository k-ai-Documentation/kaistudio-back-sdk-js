import { KaiStudio } from 'sdk-js-kaistudio';

async function init() {
    const kaiStudio = new KaiStudio({
        host: 'http://localhost:4000',
        token: "", 
    });

    const login = await kaiStudio.core().auth().login("","")
    console.log(login);

    const user = await kaiStudio.core().user().getInfo()
    console.log(user);

    const orgs = await kaiStudio.studio().organization().changeName("fd8cbac6-a76f64ea4812", "NEW NAME");
    console.log(orgs);

    const demo_detail = await kaiStudio.demo().getInstanceDetail("instance id")
    console.log(demo_detail);
    const demo_list = await kaiStudio.demo().listInstances()
    console.log(demo_list)

    const file_list = await kaiStudio.file().list("instance id")
    console.log(file_list);

    const file_delete = await kaiStudio.file().delete("instance id", "Affluence Ligue 1 97-98.ods")
    console.log(file_delete)

    const instance_get = await kaiStudio.studio().instance().get("instance id")
    console.log(instance_get);
    const create = await kaiStudio.studio().instance().create("org id", "test create instance")
    console.log(create)

    const setScenarios = await kaiStudio.studio().instance().setScenarios("2755c2b3-6e80-4948-b607-69f26a821413", ["AUDIT", "SEARCH"])

    const deleteInstance = await kaiStudio.studio().instance().delete("2755c2b3-6e80-4948-b607-69f26a821413")
    console.log(deleteInstance)

    const generateApiKey = await kaiStudio.studio().instance().generateApiKey("instance id")

    const addKb = await kaiStudio.studio().instance().addKb("instance id", "SHAREPOINT", {
        "client": "7916e632b411b2",
        "spHost": "sharepoint.com",
        "password": "vtw.KHnQP9lyIciN",
        "siteName": "Tech",
        "tenantId": "3b40-98a20ba7adad",
        "subfolderName": "Général/TECH/TEST"
      },{
        "subject": "a short resume of the subject involved by the document"
      })

    const listKB = await kaiStudio.studio().instance().listKb("instance id")
    console.log(listKB)

    const deleteKB = await kaiStudio.studio().instance().deleteKb("kb_69913b72-45dc-4eaf-8d20-af6e9e216806_1","instance id")

    const grantAccessDemo = await kaiStudio.studio().instance().grantUserAccessDemo("instance id", "user id")

    const revokeUserAccessDemo = await kaiStudio.studio().instance().revokeUserAccessDemo("instance id", "user id")

    const listAvailableKbType = await kaiStudio.studio().knowledgeBase().listAvailableKbType()
    
    const listOrg = await kaiStudio.studio().organization().list()
    console.log(listOrg)
    
    const listUser = await kaiStudio.studio().organization().listUsers("org id")
    console.log(listUser)

}

init();