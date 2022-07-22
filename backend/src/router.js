const express = require("express");

const { UserController, CadeauController } = require("./controllers");

const router = express.Router();

router.get("/proches", UserController.browse);
router.get("/proches/:id", UserController.read);
router.put("/proches/:id", UserController.edit);
router.post("/proches", UserController.add);
router.delete("/proches/:id", UserController.delete);

router.get("/cadeaux", CadeauController.browse);
router.get("/cadeaux/:id", CadeauController.read);
router.get("/cadeaux/proches/:id", CadeauController.readById);
router.put("/cadeaux/:id", CadeauController.edit);
router.post("/cadeaux", CadeauController.add);
router.delete("/cadeaux/:id", CadeauController.delete);

module.exports = router;
