const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('home');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('home');
    },
    mage: async (parent, { username }) => {
      const params = username ? { username } : {};
      return User.find();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('home');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addArcana: async (parent, { _id }) => {
      const updatedArcana = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`arcana`]: 1 } },
        { new: true }
      );
      return updatedArcana;
    },
    subtractArcana: async (parent, { _id, amount }) => {
      const updatedArcana = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`arcana`]: -amount } },
        { new: true }
      );
      return updatedArcana;
    },
    addEssence: async (parent, { _id }) => {
      const updatedEssence = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`essence`]: 1 } },
        { new: true }
      );
      return updatedEssence;
    },
    subtractEssence: async (parent, { _id, amount }) => {
      const updatedEssence = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`essence`]: -amount } },
              { new: true }
      );
      return updatedEssence;
    },
    add5Essence: async (parent, { _id }) => {
      const updatedEssence = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`essence`]: 5 } },
        { new: true }
      );
      return updatedEssence;
    },
    add25Essence: async (parent, { _id }) => {
      const updatedEssence = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`essence`]: 25 } },
        { new: true }
      );
      return updatedEssence;
    },
    add125Essence: async (parent, { _id }) => {
      const updatedEssence = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`essence`]: 125 } },
        { new: true }
      );
      return updatedEssence;
    },
    add1KEssence: async (parent, { _id }) => {
      const updatedEssence = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`essence`]: 1000 } },
        { new: true }
      );
      return updatedEssence;
    },
    addScale: async (parent, { _id }) => {
      const updatedScale = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`scale`]: 1 } },
        { new: true }
      );
      return updatedScale;
    },
    subtractScale: async (parent, { _id, amount }) => {
      const updatedScale = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`scale`]: -amount } },
              { new: true }
      );
      return updatedScale;
    },
    add5Scale: async (parent, { _id }) => {
      const updatedScale = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`scale`]: 5 } },
        { new: true }
      );
      return updatedScale;
    },
    upgradeRingTier: async (parent, { _id }) => {
      const updatedRingTier = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`ring`]: 1 } },
        { new: true }
      );
      return updatedRingTier;
    },
    resetRingTier: async (parent, { _id }) => {
      const updatedRingTier = await User.findOneAndUpdate(
        { _id },
        { ring: 0 },
        { new: true }
      );
      return updatedRingTier;
    },
    upgradeCloakTier: async (parent, { _id }) => {
      const updatedCloakTier = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`cloak`]: 1 } },
        { new: true }
      );
      return updatedCloakTier;
    },
    resetCloakTier: async (parent, { _id }) => {
      const updatedCloakTier = await User.findOneAndUpdate(
        { _id },
        { cloak: 0 },
        { new: true }
      );
      return updatedCloakTier;
          },
    add25Scale: async (parent, { _id }) => {
      const updatedScale = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`scale`]: 25 } },
        { new: true }
      );
      return updatedScale;
    },
    add125Scale: async (parent, { _id }) => {
      const updatedScale = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`scale`]: 125 } },
        { new: true }
      );
      return updatedScale;
    },
    add1KScale: async (parent, { _id }) => {
      const updatedScale = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`scale`]: 1000 } },
        { new: true }
      );
      return updatedScale;
    },
  },
};

module.exports = resolvers;
