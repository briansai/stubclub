import mongoose from 'mongoose';

export const generateMongoId = () => {
  return new mongoose.Types.ObjectId().toHexString();
};
