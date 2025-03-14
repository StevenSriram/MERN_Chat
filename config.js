import path from "path";
import dotenv from "dotenv";

import helmet from "helmet";
import morgan from "morgan";

const configEnv = () => {
  dotenv.config({ path: path.resolve(process.cwd(), ".env") });
};

const configMorgan = () => {
  return morgan("dev");
};

const configHelmet = () => {
  return helmet();
};

export { configEnv, configMorgan, configHelmet };
