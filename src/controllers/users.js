const BaseController = require("./base.controller");

class UserController extends BaseController {
  constructor(model) {
    super(model);
  }

  async getAll(req, res) {
    try {
      const users = await this.model.findAll();
      return res.json(users);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getOne(req, res) {
    const { userId } = req.params;
    try {
      const user = await this.model.findByPk(userId);
      if (user) {
        return res.json(user);
      } else {
        return res.status(404).json({ error: true, msg: "User not found" });
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async create(req, res) {
    const { firstName, lastName, email, company } = req.body;
    try {
      const newUser = await this.model.create({
        firstName,
        lastName,
        email,
        company,
      });
      return res.status(201).json(newUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async update(req, res) {
    const { userId } = req.params;
    const { firstName, lastName, email, company } = req.body;
    try {
      const user = await this.model.findByPk(userId);
      if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.company = company;
        await user.save();
        return res.json(user);
      } else {
        return res.status(404).json({ error: true, msg: "User not found" });
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async delete(req, res) {
    const { userId } = req.params;
    try {
      const user = await this.model.findByPk(userId);
      if (user) {
        await user.destroy();
        return res.status(204).end();
      } else {
        return res.status(404).json({ error: true, msg: "User not found" });
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = UserController;
