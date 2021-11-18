const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const mageSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  cloak: {
    type: Number,
    default: 0,
  },
  ring: {
    type: Number,
    default: 0,
  },
  health: {
    type: Number,
    required: true,
    default: 20,
  },
  attackPower: {
    type: Number,
  },
  //boss drop
  essence: {
    type: Number,
  },
  //gathering drop
  arcana: {
    type: Number,
  },
  //minion drop
  scale: {
    type: Number,
  },
});

mageSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

mageSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', mageSchema);

module.exports = User;
