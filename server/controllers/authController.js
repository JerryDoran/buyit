import { uploads } from '../lib/cloudinary';
import User from '../models/User';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import ErrorHandler from '../lib/errorHandler';

export async function registerUser(req, res) {
  const user = await User.create(req.body);

  res.status(201).json({ user });
}

export async function updateUser(req, res) {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.files.length > 0) {
    const uploader = async (path) => await uploads(path, 'buyit/avatars');

    const file = req.files[0];
    const { path } = file;

    const avatarResponse = await uploader(path);

    fs.unlinkSync(path);
    newUserData.avatar = avatarResponse;
  }

  const user = await User.findByIdAndUpdate(req.user._id, newUserData);

  res.status(200).json({ user });
}

export async function updatePassword(req, res, next) {
  const user = await User.findById(req.user._id).select('+password');

  console.log(req.body.currentPassword);
  console.log(user.password);

  const isPasswordMatched = await bcrypt.compare(
    req.body.currentPassword,
    user.password
  );

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Your old password is incorrect!', 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  res.status(200).json({ success: true });
}
