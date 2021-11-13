import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_MAGE_ATTRIBUTES = gql`
  query mage {
    mage {
      _id
      username
      soulEssence
      arcana
      gobbledyGook
      cloak
      ring
      health
      attackPower
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;
