import express, { json } from "express";
import { join } from "path";
import morgan from "morgan";
import { port, api } from "../../config/index.js";
import emailRoutes from "../../routes/emails.js";
import cors from "cors";

export class ExpressServer {
  constructor() {
    this.app = express();
    this.port = port;
    this.basePath = api.prefix;

    this._middlewares();

    this._routes();

    this._notFound();
    this._errorHandler();

    console.log(this.basePath);
  }

  _middlewares() {
    this.app.use(json());
    this.app.enable("trust proxy");
    this.app.use(cors());
    this.app.use(morgan("tiny"));
  }

  _routes() {
    this.app.get(`${this.basePath}/`, (req, res) => {
      res.send("<h2>API for Emails</h2>");
    });

    this.app.head("/status", (req, res) => {
      res.status(200).end();
    });

    this.app.get("/report", (req, res) => {
      res.sendFile(join(__dirname + "../../../../postman/report.html"));
    });
    this.app.use(`${this.basePath}/email`, emailRoutes);
  }

  _notFound() {
    this.app.use((req, res, next) => {
      const err = new Error("Not Found");
      err.status = 404;
      err.code = 404;
      next(err);
    });
  }

  _errorHandler() {
    this.app.use((err, req, res, next) => {
      const code = err.code || 500;
      res.status(code);
      const body = {
        error: {
          code,
          message: err.message,
          detail: err.data,
        },
      };
      res.json(body);
    });
  }

  async start() {
    this.app.listen(this.port, (error) => {
      if (error) {
        _error(error);
        process.exit(1);
        return;
      }
    });
  }
}
