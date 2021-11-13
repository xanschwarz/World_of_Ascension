import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_ARCANA = gql`
  mutation addArcana($id: ID!) {
    addArcana(_id: $id) {
      arcana
    }
  }
`;

export const ADD_ESSENCE = gql`
  mutation addEssence($id: ID!) {
    addEssence(_id: $id) {
      soulEssence
    }
  }
`;

export const ADD_GOBBLE = gql`
  mutation addGobbledyGook($id: ID!) {
    addGobbledyGook(_id: $id) {
      gobbledyGook
    }
  }
`;
