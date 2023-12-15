import express from "express";
import cors from "cors";
import { api } from "../routes/api.route.js";
import { errorMiddleware } from "../middleware/error.middleware.js";

export const web = express();
web.use(express.json());

const corsOptions = {
  origin: 'http://example.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

web.use(cors(corsOptions))

web.use(api);

web.use(errorMiddleware);