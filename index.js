const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");
app.use(cors());
app.use(express.json());
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");
const db = require("./src/db/models/index.js");
const { user, review } = db;
const { Op } = require("sequelize");

app.get("/users", async (req, res) => {
  const users = await user.findAll();
  res.json(users);
});

app.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const thisUser = await user.findByPk(userId);
    res.json(thisUser);
  } catch (err) {
    return res.status(400).json({ error: true, msg: "error" });
  }
});

app.get("/users/:userId/reviews", async (req, res) => {
  try {
    const { userId } = req.params;
    const thisUserReviews = await review.findAll({
      where: {
        reviewee_id: userId,
      },
    });
    res.json(thisUserReviews);
  } catch (err) {
    return res.status(400).json({ error: true, msg: "error" });
  }
});

app.get("/user", async (req, res) => {
  try {
    const userEmail = req.query.email;
    const userData = await user.findAll({
      where: {
        email: {
          [Op.eq]: userEmail,
        },
      },
    });
    res.json(userData);
  } catch (err) {
    return res.status(400).json({ error: true, msg: "error" });
  }
});

app.post("/user/postreview", async (req, res) => {
  const newReview = await review.create({
    revieweeId: req.body.revieweeId,
    reviewerId: req.body.reviewerId,
    description: req.body.description,
    rating: req.body.description,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.json(newReview);
});

app.post("/users", async (req, res) => {
  const [newOrCurrentUser, created] = await user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      company: req.body.company,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  res.json(newOrCurrentUser);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
