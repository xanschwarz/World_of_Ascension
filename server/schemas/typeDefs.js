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
    upgradeRingTier(_id: ID!): User
    upgradeCloakTier(_id: ID!): User
    addScale(_id: ID!): User
    add5Scale(_id: ID!): User
    add25Scale(_id: ID!): User
    add125Scale(_id: ID!): User
    add1KScale(_id: ID!): User
    subtractScale(_id: ID!, amount: Int!): User
    addArcana(_id: ID!): User
    subtractArcana(_id: ID!, amount: Int!): User
    addEssence(_id: ID!): User
    add5Essence(_id: ID!): User
    add25Essence(_id: ID!): User
    add125Essence(_id: ID!): User
    add1KEssence(_id: ID!): User
    subtractEssence(_id: ID!, amount: Int!): User
  }
`;

module.exports = typeDefs;
