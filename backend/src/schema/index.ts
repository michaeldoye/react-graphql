import { makeExecutableSchema } from "graphql-tools";
import * as path from "path";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

/**
 * GraphQL type definitions
 **/
const typesArray = fileLoader(path.join(__dirname, "./schema/typedefs"));
const typeDefs = mergeTypes(typesArray, { all: true });

/**
 * GraphQL Query resolvers
 **/
const resolversArray = fileLoader(path.join(__dirname, "./schema/resolvers"));
const resolvers = mergeResolvers(resolversArray);

/**
 *  Export a GraphQL schema instance
 **/
export const schema = makeExecutableSchema({ typeDefs, resolvers });
