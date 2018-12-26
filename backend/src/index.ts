import * as cors from "cors";
import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import { rootValue } from "./root";
import { schema } from "./schema";

const app = express();

app.use(
    "/backend",
    cors(),
    graphqlHTTP({
        graphiql: true,
        rootValue,
        schema,
    }),
);

app.listen(80);
