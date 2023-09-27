// server.js
import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("./src/mock/db.json");
const middlewares = jsonServer.defaults({
  noCors: true,
});

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});
