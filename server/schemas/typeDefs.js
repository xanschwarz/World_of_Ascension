const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    cloak: Int
    ring: Int
    health: Int
    attackPower: Int
    essence: Int
    arcana: Int
    scale: Int
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    mage: [User]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addScale(_id: ID!): User
    addArcana(_id: ID!): User
    addEssence(_id: ID!): User
    upgradeRingTier(_id: ID!): User
    upgradeCloakTier(_id: ID!): User
  }
`;

module.exports = typeDefs;
