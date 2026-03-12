/* eslint-disable no-console */

const http = require("http");
const next = require("next");
const { parse } = require("url");

async function main() {
  const port = Number(process.env.PORT || 3000);
  const hostname = process.env.HOSTNAME || "127.0.0.1";

  const app = next({
    dev: true,
    dir: process.cwd(),
    hostname,
    port,
  });

  const handle = app.getRequestHandler();

  await app.prepare();

  const server = http.createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  server.on("error", (err) => {
    console.error("Dev server failed:", err);
    process.exit(1);
  });

  server.listen(port, hostname, () => {
    console.log(`Next dev (no-fork) running at http://${hostname}:${port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
