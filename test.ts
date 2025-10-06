import { KaiStudio } from './index';

async function init() {
    const kaiStudio = new KaiStudio({
        host: 'http://localhost:4000',
        token: "", 
    });


    const orgs = await kaiStudio.studio().organization().changeName("fd8cbac6-a76f64ea4812", "NEW NAME");
    //print result
    console.log(orgs);

}

init();