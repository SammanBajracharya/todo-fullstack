import Todo from '../model/Todo.js';
import { DateTimeResolver } from 'graphql-scalars';

const typeDefs = `#graphql
  scalar DateTime

  type Todo {
    _id: ID!,
    title: String!,
    level: String!,
    status: String,
    category: String,
  }

  type Query { 
    todos: [Todo]!
    todo(_id: ID!): Todo
  }

  type Mutation {
    createTodo(
      title: String!,
      level: String!,
    ): Todo!
    changeStatus(
      _id: ID!,
      status: String!,
      category: String!
    ): Todo!
    deleteTodo(_id: ID!): Todo!
  }
`;

const resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    todos: async () => {
      const todos = Todo.find({});
      return todos;
    },
    todo: async (_parent, args) => {
      const todo = Todo.findById(args._id);
      return todo;
    },
  },
  Mutation: {
    createTodo: async (_parent, args) => {
      const newTodo = new Todo({
        title: args.title,
        level: args.level,
      });
      await newTodo.save();
      return newTodo;
    },
    changeStatus: async (_parent, args) => {
      const updatedTodo = await Todo.findByIdAndUpdate(args._id, { status: args.status, category: args.category }, { new: true });
      return updatedTodo;
    },
    deleteTodo: async (_parent, args) => {
      const deletedTodo = await Todo.findByIdAndDelete(args._id);
      return deletedTodo;
    }
  },
};

export { typeDefs, resolvers };
