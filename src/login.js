import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import MensRAnking from "../src/models/mens.js";
import mainSchema  from "./Schema.js";
import * as dotenv from "dotenv";
dotenv.config();

const login = async (req, res) => {
  const user = await mainSchema.find({ email: req.body.email });

  if (user.length) {
    const match = bcrypt.compareSync(req.body.password, user[0].password);
    if (match) {
      var token = jwt.sign(
        {
          email: user[0].email,
          _id: user[0]._id,
          username: `${user[0].firstName} ${user[0].lastName}`,
        },
        process.env.JWT_KEY
      );
      res
        .status(200)
        .send({ status: 200, message: "user login successfuly", token });
    } else {
      res
        .status(401)
        .send({ status: 401, message: "email/password incorrect" });
    }
  } else {
    res.status(404).send({ status: 404, message: "user not found" });
  }
};

export default login;