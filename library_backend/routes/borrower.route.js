const express = require("express");
const BorrowReturnController = require("../controllers/borrower.controller");

const router = express.Router();

router.get("/return/:bookId", BorrowReturnController.returnBook);
router.post("/borrow/:bookId", BorrowReturnController.purchaseBook);

module.exports = router;