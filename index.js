import express from 'express';
import { retrieveSecrets } from './retrieveSecrets.js';
const app = express();
const PORT = 3000;

console.log("node.js started");

const listener = app.listen(PORT, () => {
    console.log("port: %d", listener.address().port);
});

app.use(express.static('src'));
// /test -> src/test
// /test2 -> src/test2
// /index.html -> views/index.hbs

app.set('view engine', 'hbs');
app.get('', (req, res) => {
    res.render('index', {
        title: "Jade Seeker",
        description: "Jane is seeking for Jade."
    });
})

const SECRETS_ID = "apihandlebarsexample_prod";

app.get("/test/script.js", (req, res) => {
    retrieveSecrets(SECRETS_ID).then((data) => {
        const url = data.apihandlebarsexample;
        res.render('script', {
            submodule: "test",
            link_to_api: url,
        });
    });
});

app.get("/test2/script.js", (req, res) => {
    res.render('script', {
        submodule: "test2",
        link_to_api: "https://jsonplaceholder.typicode.com/albums?userId=1",
    });
});
