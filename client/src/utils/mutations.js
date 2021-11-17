import { gql } from '@apollo/client';

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
      essence
    }
  }
`;

export const ADD_SCALE = gql`
  mutation addScale($id: ID!) {
    addScale(_id: $id) {
      scale
    }
  }
`;

export const UPGRADE_RING_TIER = gql`
  mutation upgradeRingTier($id: ID!) {
    upgradeRingTier(_id: $id) {
      ring
    }
  }
`;

export const UPGRADE_CLOAK_TIER = gql`
  mutation upgradeCloakTier($id: ID!) {
    upgradeCloakTier(_id: $id) {
      cloak
    }
  }
`;
