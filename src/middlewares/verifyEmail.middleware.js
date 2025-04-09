import { Token } from "../models/token.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyEmail = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;

  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new ApiError(401, "invalid link");
  }

  const verificatoinToken = await Token.findOne({ token: token });
  if (!verificatoinToken) {
    throw new ApiError(401, "Invalid link, Try again");
  }
  req.id = id
  next();
});

export {verifyEmail};