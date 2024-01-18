import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from "bcrypt";
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';


import User from './Schema/User.js';

const app = express();
let PORT = 3000;
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

app.use(express.json());
mongoose.connect(process.env.DB_LOCATION, {
  autoIndex: true
});

const generateUsername = async (email) => {
  let username = email.split("@")[0];

  let userNameNotUnique = await User.exists({ "personal_info.username": username }).then((result) => result);
  
  userNameNotUnique ? username += nanoid().substring(0,5) : "";

  return username;
}
const formatData = (user) => {

  const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY );

  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname
  }
}
app.post("/signup",(req, res) => {
  let { fullname, email, password } = req.body;

  //validating the data
  if(fullname.length < 3){
    return res.status(403).json({"error": "Fullname must be at least 3 letters long"});
  }

  if(!email.length){
    return res.status(403).json({"error": "Email is required"});
  }

  if(!emailRegex.test(email)){
    return res.status(403).json({"error": "Email is invalid"});
  }

  if(!passwordRegex.test(password)){
    return res.status(403).json({"error": "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase  letters"});
  }

  bcrypt.hash(password, 10, async (err, hashed_password) => {

    let username = await generateUsername(email);

    let user = new User({
      personal_info: { fullname, email, password: hashed_password, username }
    });

    user.save().then((u) => {
      return res.status(200).json(formatData(u));
    })
    .catch(err => {
      if(err.code == 11000){
        return res.status(500).json({"error": "Email already exists"});
      }
      return res.status(500).json({"error": err.message});
    });
  });
});

app.post("/signin", (req, res) => {
  let { email, password } = req.body;
  
})

app.listen(PORT,() => {
  console.log('Listening on port -> ' + PORT);
});

