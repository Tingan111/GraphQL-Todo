const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { json } = require('body-parser');
const cors = require('cors');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

async function startServer() {
    const app = express();
  
    //  第一個先解析 json
    app.use(cors());
    app.use(express.json()); // <-- 這裡一定要提前掛上express
  
    // 除錯用 log
    app.use((req, res, next) => {
      console.log('💡 Received request:', req.method, req.url);
      console.log('💡 Body is:', req.body);
      next();
    });
  
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
  
    await server.start();
  
    // 注意：這裡不用再加 json()，只要 expressMiddleware
    app.use(
      '/graphql',
      expressMiddleware(server, {
        context: async ({ req }) => ({})
      })
    );
  
    await mongoose.connect('mongodb://localhost:27017/todo-graphql');
  
    app.listen(4000, () => {
      console.log('Server is ready at http://localhost:4000/graphql');
    });
  }
  startServer()