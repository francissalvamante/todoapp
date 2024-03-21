import express from "express";
import cors from "cors";
import { source } from "./dataSource";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();
const PORT = 3030;

/**
 * Initialize DataSource
 */
source
  .initialize()
  .then(() => {
    console.log("Data source has been initialized");
  })
  .catch((err) => {
    console.error(`Error during Data Source init: ${err}`);
  });

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
