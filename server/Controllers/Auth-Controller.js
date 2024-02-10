const { TokenExpiredError } = require("jsonwebtoken");
const User = require("../Models/User-Model");
const bcrypt = require("bcryptjs");
const Post = require("../Models/Post-Model");
const Signup = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    if (!username || !email || !phone || !password) {
      return res.status(422).json({ error: "Please fill all the fields" });
    } else if (await User.findOne({ email: email })) {
      return res.status(422).json({ error: "User already exists" });
    }
    const user = new User({ username, email, phone, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      res
        .status(200)
        .json({
          message: "User logged in successfully",
          token: await user.generateAuthToken(),
          user: user._id.toString(),
        });
    } else {
      return res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const ValidToken = async (req, res) => {
  try {
    const { username, email, _id, followers, following, favourite } = req.user;
    // const favouritePostIdArray = favourite.map((obj) => obj.postId);
    // const favouritePostArray = await Promise.all(
    //   favouritePostIdArray.map(async (postId) => {
    //     const post = await Post.findById(postId).populate(
    //       "user",
    //       "_id username email"
    //     );
    //     return post;
    //   })
    // );
    const user = {
      username,
      email,
      _id,
      followers,
      following,
      favourite,
    };
    // res.status(200).send({ user, favoritePosts: favouritePostArray });
    res.status(200).send({user})
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { Signup, Login, ValidToken };
