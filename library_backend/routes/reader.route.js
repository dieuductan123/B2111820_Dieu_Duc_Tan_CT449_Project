const express = require("express");
const readerControllers = require("../controllers/reader.controller");

const router = express.Router();

router.route("/")
    .get(readerControllers.getReaders)
    .post(readerControllers.addReader)
    .delete(readerControllers.deleteAllReaders)

router.route("/:readerId")
    .get(readerControllers.getReader)
    .put(readerControllers.updateReader)
    .delete(readerControllers.deleteReader);

module.exports = router;
