import fastify from "fastify";
import autoload from "@fastify/autoload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = fastify({
  logger: true,
});

app.register(autoload, {
  dir: join(__dirname, "routes"),
});

export default app;
