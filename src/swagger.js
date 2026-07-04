import swaggerJSDoc from "swagger-jsdoc";
import authDocs from "./docs/schemas/auth.js";
import productDocs from "./docs/schemas/product.js";
import cartDocs from "./docs/schemas/cart.js";
import reviewDocs from "./docs/schemas/review.js";
import wishlistDocs from "./docs/schemas/wishlist.js";
import userDocs from "./docs/schemas/user.js";

const schemaDocs = [authDocs, productDocs, cartDocs, reviewDocs, wishlistDocs, userDocs];
const sharedSchemas = schemaDocs.reduce((acc, doc) => ({
  ...acc,
  ...(doc.components?.schemas || {})
}), {});
const sharedTags = schemaDocs.reduce((acc, doc) => ([...acc, ...(doc.tags || [])]), []);

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Ecommerce API",
      version: "1.0.0",
      description: "Specifications for OpenAPI for Ecommerce project"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "access_token"
        }
      },
      schemas: sharedSchemas
    },
    tags: sharedTags
  },
  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;