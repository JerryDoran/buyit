import { uploads } from '../lib/cloudinary';
import User from '../models/User';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import ErrorHandler from '../lib/errorHandler';
import APIFilters from '../lib/APIFilters';

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

export async function getAdminUsers(req, res) {
  const resPerPage = 10;
  const usersCount = await User.countDocuments();

  const apiFilters = new APIFilters(User.find(), req.query).pagination(
    resPerPage
  );

  const users = await apiFilters.query;
  res.status(200).json({ usersCount, resPerPage, users });
}

export async function updateAdminUser(req, res, next) {
  let user = await User.findById(req.query.userId);

  if (!user) {
    return next(new ErrorHandler('No user found with this ID', 404));
  }

  user = await User.findByIdAndUpdate(req.query.userId, req.body);

  res.status(200).json({ success: true, user });
}

export async function getAdminUser(req, res, next) {
  let user = await User.findById(req.query.userId);

  if (!user) {
    return next(new ErrorHandler('No user found with this ID', 404));
  }

  res.status(200).json({ success: true, user });
}

export async function deleteAdminUser(req, res, next) {
  const user = await User.findById(req.query.userId);

  if (!user) {
    return next(new ErrorHandler('No user found with this ID', 404));
  }

  await user.deleteOne();

  res.status(200).json({ success: true });
}
