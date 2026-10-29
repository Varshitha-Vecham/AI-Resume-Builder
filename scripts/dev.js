import { spawn } from "node:child_process";

const isWindows = process.platform === "win32";
const command = (value) => (isWindows
  ? spawn("cmd.exe", ["/d", "/s", "/c", value], { stdio: "inherit", windowsHide: true })
  : spawn("sh", ["-c", value], { stdio: "inherit" }));

const server = command("node server.js");
const client = command("npm run client");

function stop(processToStop) {
  if (!processToStop.killed) processToStop.kill();
}

process.on("SIGINT", () => {
  stop(server);
  stop(client);
  process.exit();
});

server.on("exit", (code) => {
  if (code && !client.killed) {
    console.error("Backend stopped. Check the MongoDB connection message above.");
  }
});
