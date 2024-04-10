import { version } from "../../package.json";

const { PORT } = process.env;

const apiDocumentation = {
  openapi: "3.0.1",
  info: {
    title: "My APP",
    description: "API documentation for the api",
    version,
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: "Local Server",
    },
  ],
  tags: [],
  paths: {},

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {},
    responses: {},
  },
};

export default apiDocumentation;
