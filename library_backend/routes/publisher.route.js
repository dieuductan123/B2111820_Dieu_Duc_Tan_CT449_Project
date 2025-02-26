const express = require("express");
const publisherControllers = require("../controllers/publisher.controller");

const router = express.Router();

router.route("/")
    .get(publisherControllers.getPublishers)
    .post(publisherControllers.addPublisher)
    .delete(publisherControllers.deleteAllPublishers)

router.route("/:publisherId")
    .get(publisherControllers.getPublisher)
    .put(publisherControllers.updatePublisher)
    .delete(publisherControllers.deletePublisher)

module.exports = router;