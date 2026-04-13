import { KaiStudio } from './index';

async function init() {
    const kaiStudio = new KaiStudio({
        host: 'http://localhost:4000',
        token: "",
    });

    const user = await kaiStudio.core().user().getInfo()
    console.log(user);

    const orgs = await kaiStudio.studio().organization().changeName("fd8cbac6-a76f64ea4812", "NEW NAME");
    console.log(orgs);

    const instance_get = await kaiStudio.studio().instance().get("instance id")
    console.log(instance_get);
    const create = await kaiStudio.studio().instance().create("org id", "test create instance")
    console.log(create)

    const listOrg = await kaiStudio.studio().organization().list()
    console.log(listOrg)

    const listUser = await kaiStudio.studio().organization().listUsers("org id")
    console.log(listUser)

}

init();
