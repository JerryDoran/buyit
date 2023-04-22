import ErrorHandler from '../lib/errorHandler';
import Address from '../models/Address';

export async function createAddress(req, res) {
  req.body.user = req.user._id;

  const address = await Address.create(req.body);

  res.status(200).json({ address });
}

export async function allAddresses(req, res) {
  const addresses = await Address.find({ user: req.user._id });

  res.status(200).json({ addresses });
}

export async function singleAddress(req, res) {
  const address = await Address.findById(req.query.id);

  if (!address) {
    return next(new ErrorHandler('Address not found', 404));
  }

  res.status(200).json({ address });
}

export async function updateAddress(req, res) {
  let address = await Address.findById(req.query.id);

  if (!address) {
    return next(new ErrorHandler('Address not found', 404));
  }

  address = await Address.findByIdAndUpdate(req.query.id, req.body);

  res.status(200).json({ address });
}

export async function deleteAddress(req, res) {
  let address = await Address.findById(req.query.id);

  if (!address) {
    return next(new ErrorHandler('Address not found', 404));
  }

  await address.remove();

  res.status(200).json({ success: true });
}
