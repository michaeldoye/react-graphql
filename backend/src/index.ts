import * as cors from "cors";
import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import { schema } from "./schema";

// @ts-ignore
const app = express();

/*
 * Create a local express server to host
 * the schema instance:
 * More: https://github.com/graphql/express-graphql#options
 */
app.use(
    "/backend",
    // @ts-ignore
    cors(),
    // @ts-ignore
    graphqlHTTP({
        graphiql: true,
        schema,
    })
);

app.listen(80);
