const { createServer } = require("./src/server");

const port = Number(process.env.PORT || 4000);
const server = createServer();

server.listen(port, () => {
  console.log(`Gulefirdous backend listening on port ${port}`);
});
