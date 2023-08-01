import express from "express";
import next from "next"

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

export interface Module { }
export default interface DefaultModule { }

app.prepare().then(() => {
    const server = express();

    server.get("/rest", (req, res) => {
        res.json({a:1})
    })

    server.get("*", (req, res) => {
        handle(req, res);
    })

    server.listen(3000, () => {
        console.log('> Ready on http://localhost:3000')
    })
}).catch((err) => {
    console.error(err);
})