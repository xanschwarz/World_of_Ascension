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

export const ADD_ARCANA = gql`
  mutation addArcana($id: ID!) {
    addArcana(_id: $id) {
      arcana
    }
  }
`;

export const ADD_2_ARCANA = gql`
  mutation add2Arcana($id: ID!) {
    add2Arcana(_id: $id) {
      arcana
    }
  }
`;

export const ADD_10_ARCANA = gql`
  mutation add10Arcana($id: ID!) {
    add10Arcana(_id: $id) {
      arcana
    }
  }
`;

export const ADD_75_ARCANA = gql`
  mutation add75Arcana($id: ID!) {
    add75Arcana(_id: $id) {
      arcana
    }
  }
`;

export const ADD_150_ARCANA = gql`
  mutation add150Arcana($id: ID!) {
    add150Arcana(_id: $id) {
      arcana
    }
  }
`;


export const SUBTRACT_ARCANA = gql`
  mutation subtractArcana($id: ID!, $amount: Int!) {
    subtractArcana(_id: $id, amount: $amount) {
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

export const ADD_5_ESSENCE = gql`
  mutation add5Essence($id: ID!) {
    add5Essence(_id: $id) {
      essence
    }
  }
`;

export const ADD_25_ESSENCE = gql`
  mutation add25Essence($id: ID!) {
    add25Essence(_id: $id) {
      essence
    }
  }
`;

export const ADD_125_ESSENCE = gql`
  mutation add125Essence($id: ID!) {
    add125Essence(_id: $id) {
      essence
    }
  }
`;

export const ADD_1K_ESSENCE = gql`
  mutation add1KEssence($id: ID!) {
    add1KEssence(_id: $id) {
      essence
    }
  }
`;

export const SUBTRACT_ESSENCE = gql`
  mutation subtractEssence($id: ID!, $amount: Int!) {
    subtractEssence(_id: $id, amount: $amount) {
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

export const ADD_5_SCALE = gql`
  mutation add5Scale($id: ID!) {
    add5Scale(_id: $id) {
      scale
    }
  }
`;

export const ADD_25_SCALE = gql`
  mutation add25Scale($id: ID!) {
    add25Scale(_id: $id) {
      scale
    }
  }
`;

export const ADD_125_SCALE = gql`
  mutation add125Scale($id: ID!) {
    add125Scale(_id: $id) {
      scale
    }
  }
`;

export const ADD_1K_SCALE = gql`
  mutation add1KScale($id: ID!) {
    add1KScale(_id: $id) {
      scale
    }
  }
`;

export const SUBTRACT_SCALE = gql`
  mutation subtractScale($id: ID!, $amount: Int!) {
    subtractScale(_id: $id, amount: $amount) {
      scale
    }
  }
`;
