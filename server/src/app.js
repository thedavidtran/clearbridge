import fastify from "fastify";
import cors from "@fastify/cors";
import autoload from "@fastify/autoload";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const MONGODB_URL =
  process.env.NODE_ENV === "test"
    ? process.env.VITE_MONGODB_CONNECTION
    : process.env.MONGODB_CONNECTION;
const DB_NAME =
  process.env.NODE_ENV === "test"
    ? process.env.VITE_DB_NAME
    : process.env.DB_NAME;
const connection = `${MONGODB_URL}${DB_NAME}`;
console.log(`DB CONNECTION URL: ${MONGODB_URL}${DB_NAME}`);
await mongoose.connect(connection);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = fastify({
  logger: true,
});

app.register(autoload, {
  dir: join(__dirname, "routes"),
});

// Enable CORS
app.register(cors, {
  origin: false,
});

export default app;
