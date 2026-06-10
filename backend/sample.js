import express from "express";

console.log("before app");

const app = express();

console.log("before listen");

const server = app.listen(5000, () => {
    console.log("Listening on 5000");
});

console.log("after listen", server.address());

process.on("exit", (code) => {
    console.log("Node exiting with code:", code);
});
