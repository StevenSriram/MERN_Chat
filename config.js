import path from "path";
import dotenv from "dotenv";

const configEnv = () => {
  dotenv.config({ path: path.resolve(process.cwd(), ".env") });
};

export { configEnv };
