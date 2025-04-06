const { gql } = require('graphql-tag');

const typeDefs=gql`
  type Todo{
  id:ID
  title:String!
  completed:Boolean!
  }
  type Query{
  todos:[Todo]
  }
  type Mutation{
  addTodo(title:String!):Todo
  toggleTodo(id:ID!):Todo
  deleteTodo(id:ID!):Boolean
  }
  `;

  module.exports=typeDefs;
