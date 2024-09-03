import { createClient } from "redis";

const connectRedisDb = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

connectRedisDb.on("error", (error) => console.log(error));

if (!connectRedisDb.isOpen) {
  connectRedisDb.connect();
}

export { connectRedisDb };
