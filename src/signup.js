import bcrypt from "bcrypt";
import Joi from "joi";
// import MensRAnking from "../src/models/mens.js";
import mainSchema from "./Schema";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const schema = Joi.object({
  firstName: Joi.string().required().max(12),
  lastName: Joi.string().required().max(10),
  email: Joi.string().required().email(),
  password: Joi.string().required().max(8),
  image_url: Joi.string().empty(""),
});

const addUsers = async (req, res) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    const users = await mainSchema.find({ email: req.body.email });
    if (users.length) {
      return res.status(401).send({
        status: 401,
        message: "user already exists",
      });
    }

    const hash = bcrypt.hashSync(req.body.password, 10);
    let userObj = {
      ...req.body,
      password: hash,
    };
    const addRecords = new MensRAnking(userObj);
    console.log("req.body", req.body);
    const response = await addRecords.save();
    console.log("res", response);
    let token = jwt.sign(
      { email: res.email, _id: res._id },
      process.env.JWT_KEY
    );
    res
      .status(200)
      .send({ status: 200, message: "user added successfuly", token });
  } catch (err) {
    res.status(401).send({ status: 401, err });
  }
};
export default addUsers;