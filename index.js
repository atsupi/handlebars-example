console.log("node.js started");

const express = require('express');
const app = express();
const PORT = 3000;

const listener = app.listen(PORT, () => {
    console.log("port: %d", listener.address().port);
});

app.use(express.static('src'));
app.get("/test", (req, res) => {
    res.contentType('html');
    res.status(200).sendFile(__dirname + "/test/index.html");
    console.log("GET: test/index.html");
});

app.set('view engine', 'hbs');
app.get('', (req, res) => {
    res.render('index', {
        title: "Jade Seeker",
        description: "Jane is seeking for Jade."
    });
})

app.get("/test/script.js", (req, res) => {
    res.render('script', {
        link_to_api: `https://jsonplaceholder.typicode.com/albums?userId=1`,
    });
});
