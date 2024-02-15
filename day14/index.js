const express = require('express')
const app = express();
const port = 8000;
const cache = {};
function cachingMiddleware(req, res, next) {
    const url = req.url;
    const cachedResponse = cache[url];
    if (cachedResponse) {
        const [data, exp] = cachedResponse;
        if (exp > Date.now()) {
            return res.send(data);
        } else {
            delete cache[url];
        }
    }
    next();
}
app.use(cachingMiddleware)
app.get("/", (req, res) => {
    res.send("Hello world!")
})
app.listen(port, () => {
    console.log("server started at port: ", port);
})