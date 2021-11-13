const { AuthenticationError } = require("apollo-server-express");
const { User, Thought } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("thoughts");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("thoughts");
    },
    mage: async (parent, { username }) => {
      const params = username ? { username } : {};
      return User.find();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("thoughts");
      }
      throw new AuthenticationError("You need to be logged in!");
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
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addArcana: async (parent, { _id }) => {
      console.log("addArcana");
      const updatedArcana = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`arcana`]: 1 } },
        { new: true }
      );
      return updatedArcana;
    },
    addEssence: async (parent, { _id }) => {
      const updatedEssence = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`soulEssence`]: 1 } },
        { new: true }
      );
      return updatedEssence;
    },
    addGobbledyGook: async (parent, { _id }) => {
      const updatedGobbledyGook = await User.findOneAndUpdate(
        { _id },
        { $inc: { [`gobbledyGook`]: 1 } },
        { new: true }
      );
      return updatedGobbledyGook;
    },
  },
};

module.exports = resolvers;
