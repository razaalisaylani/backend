import express from "express";
import jwt from "jsonwebtoken";
import login from "./src/login";
import addUsers from "./src/signup";
// import post from "../../requests/post.js";
// import get from "../../requests/get.js";
// import find from "../../requests/find.js";
// import patch from "../../requests/patch.js";
// import deletee from "../../requests/delete.js";
// import login from "../../requests/login.js";
// import uploadFiles from "../../requests/upload-image.js";
import * as dotenv from "dotenv";
dotenv.config();

const router = new express.Router();

const verifyToken = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      var decoded = jwt.verify(token, process.env.JWT_KEY);
      console.log("working", decoded);
      next();
    } else {
      res.status(401).send({ message: "token not provided" });
    }
  } catch (err) {
    res.status(401).send({ message: "unauthrized" });
  }
};

// router.post("/upload", uploadFiles);
// router.get("/mens", verifyToken, get);
router.post("/login", login);
router.post("/signup", addUsers);
// router.delete("/mens/:id", deletee);
// router.patch("/mens/:id", patch);
// router.get("/mens/:id", find);

export default router;