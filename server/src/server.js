import app from "./app.js";

const DEFAULT_PORT = 3000;
const start = async () => {
  try {
    await app.listen({ port: DEFAULT_PORT });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

await start();
