import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new User
interface UserAttributes {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttributes): UserDoc;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes);
};

export const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
