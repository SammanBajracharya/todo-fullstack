import { gql } from '@apollo/client';
export const GET_TODOS = gql`
  query GetTodos {
    todos {
      _id
      title
      level
      status
      category
    }
  }
`;

export const GET_TODO = gql`
  query GetTodo($_id: String!) {
    todo(_id: $_id) {
      _id
      title
      level
      status
      category
    }
  }
`;

export const CHANGE_TODO_STATUS = gql`
  mutation ChangeTodoStatus($_id: ID!, $status: String!, $category: String!) {
    changeStatus(_id: $_id, status: $status, category: $category) {
      _id
      title
      level
      status
      category
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $level: String!) {
    createTodo(title: $title, level: $level) {
      _id
      title
      level
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($_id: ID!) {
    deleteTodo(_id: $_id) {
      _id
      title
    }
  }
`;
