import mongoose from 'mongoose';

export const generateMongoId = () => {
  return mongoose.Types.ObjectId().toHexString();
};
