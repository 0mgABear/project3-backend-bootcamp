const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:userId", this.controller.getOne.bind(this.controller));
    router.post("/", this.controller.create.bind(this.controller));
    router.put("/:id", this.controller.update.bind(this.controller));
    router.delete("/:id", this.controller.delete.bind(this.controller));
    return router;
  }
}

module.exports = UsersRouter;
