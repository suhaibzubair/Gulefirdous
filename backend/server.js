const fs = require("node:fs");
const path = require("node:path");
const { createServer } = require("./src/server");

function loadLocalEnv(filePath = path.join(__dirname, ".env")) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();

    if (!key || process.env[key] !== undefined) {
      continue;
    }

    process.env[key] = rawValue.replace(/^(['"])(.*)\1$/, "$2");
  }
}

loadLocalEnv();

const port = Number(process.env.PORT || 4000);
const server = createServer();

server.listen(port, () => {
  console.log(`Gulefirdous backend listening on port ${port}`);
});
