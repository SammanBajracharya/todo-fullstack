import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connect } from './database/conn.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schema/schema.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
await server.start();
app.use('/graphql', expressMiddleware(server));

connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server running at ${PORT}`);
      });
    } catch (error) {
      console.log('Cannot connect to db!');
    }
  })
  .catch((err) => {
    console.log('Invalid database!');
  });
