import { uploads } from '../lib/cloudinary';
import User from '../models/User';
import fs from 'fs';

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

  console.log(newUserData);

  const user = await User.findByIdAndUpdate(req.user._id, newUserData);

  res.status(200).json({ user });
}
