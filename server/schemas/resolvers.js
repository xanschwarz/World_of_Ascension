const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("home");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("home");
    },
    mage: async (parent, { username }) => {
      const params = username ? { username } : {};
      return User.find();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("home");
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
        { $inc: { [`essence`]: 1 } },
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
  },
};

module.exports = resolvers;
