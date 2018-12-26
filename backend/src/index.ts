import * as cors from "cors";
import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import { rootValue } from "./root";
import { schema } from "./schema";

const app = express();

/*
 * Create a local express server to host
 * the graphql instance.
 */
app.use(
    "/backend",
    cors(),
    // https://github.com/graphql/express-graphql#options
    graphqlHTTP({
        graphiql: true,
        rootValue,
        schema,
    })
);

app.listen(80);
