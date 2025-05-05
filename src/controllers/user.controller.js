import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Coludinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //what we want to do here is to register a user.
  // get user details from frontend.
  //Validation of user details - any entity is emty or not and format!
  // check if user already exists in the database: username & email.
  // check for images and avatar.
  // upload images to cloudinary.
  //create user object - create entity in the database.
  // remove password and refresh token fields from response.
  // check if user is created successfully or not.
  // if created successfully, send response to frontend.

  const { fullName, email, username, password } = req.body;
  // console.log("email", email);
  // console.log("username", username);
  // console.log("fullName", fullName);
  // if (fullName === "") {
  //     throw new ApiError(400, "Full Name is required!")
  // } // this method is for begginers, we don't use this in production.

  //production ready code.

  //check if any field is empty or not.
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  //check email/username already exists or not.
  const exsistedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (exsistedUser) {
    throw new ApiError(409, "User with username/email is already existed!");
  }

  // console.log(req.files);

  // console.log("email", email);

  //handle image upload to cloudinary.
  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required!");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  //check if avatar is uploaded successfully or not otherwise throw error.
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required!");
  }

  //create user in the database.
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  //- means exclude these fields from the response.
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the User!");
  }

  // Return all if user successfully registered.
  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered Successfully!"));
});

export { registerUser };
