import UserAuth from '../models/userAuth.js';

export const getUser = async (query) => {
  try {
    return await UserAuth.findOne(query);
  } catch (e) {
    throw Error("Error while querying one user: " + e);
  }
};

export const createUser = async (user) => {
  try {
    return await user.save();
  } catch (e) {
    throw Error("Error while creating user: " + e);
  }
};
