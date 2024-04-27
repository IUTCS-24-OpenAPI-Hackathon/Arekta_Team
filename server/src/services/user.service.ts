import User from '../models/user.model';
const createNewUserIntoDB = async (
  name: string,
  email: string,
  password: string,
) => {
  const user = await User.create({
    name,
    email,
    password,
  });
  return user;
};

const signInUserIntoDB = async (email: string, password: string) => {
  const user = await User.findOne({
    email,
    password,
  });
  return user;
};

const userServices = {
  createNewUserIntoDB,
  signInUserIntoDB,
};
export default userServices;
