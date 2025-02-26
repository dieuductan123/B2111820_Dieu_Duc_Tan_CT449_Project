const fineService = require("../services/fine.service")
const borrowerService = require("../services/borrower.service");
const returnService = require("../services/return.service");

module.exports = {
  
  purchaseBook: async (req, res, next) => {
    const { bookId } = req.params;
    const readerId = req.readerId;
    const alreadyPurchased = await borrowerService.findPurchaseBookById(
      readerId,
      bookId,
      next
    );
    if (alreadyPurchased && alreadyPurchased?.active) {
      // then show error
      return res
        .status(500)
        .json({ message: "User has already purchased this book" });
    }

    const book = await bookService.findBookById(bookId, next);
    if (!book) {
      // then show error
      return res.status(500).json({ message: "Book id does not exist." });
    }
    if (book && book?.quantity <= 0) {
      // then show error
      res.locals.message = `Not sufficient book: ${book.book_name} to purchase`;
      res.redirect("/book");
    }

    book.quantity -= 1;
    await borrowerService.purchaseBook({ readerId, bookId }, next);
    res.locals.message = `Successfully purchased book ${book.book_name}`;
    res.redirect("/book");
  },
  returnBook: async (req, res, next) => {
    const readerId = req.readerId;
    const { bookId } = req.params;
    const purchasedBook = await borrowerService.findPurchaseBookById(
      readerId,
      bookId,
      next
    );
    console.log("purchasedBook", purchasedBook);
    if (purchasedBook && !purchasedBook?.active) {
      // book is already returned
      res.locals.message = "Book is already returned.";
      return res.redirect("/user/profile");
    }

    const book = await bookService.findBookById(bookId, next);
    console.log("book", book);
    if (!book) {
      // then show error
      res.locals.message = `Book id does not exist or maybe deleted.`;
      res.redirect("/user/profile");
    }

    purchasedBook.active = false;
    // make active:false in borrowerModel
    await borrowerService.updateBorrowerBook(
      readerId,
      bookId,
      { active: false },
      next
    );

    const date1 = new Date(purchasedBook.purchaseDate);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // add entry to return service
    await returnService.returnBook({ readerId, bookId }, next);

    // calculate fine
    if (diffDays <= 7) {
      try {
        await fineService.createFine({ readerId }, next);
      } catch (e) {
        console.log(e.toString());
      }
      return res.redirect("/user/profile");
    }

    const getTotalFine = (diffDays / 7) * 10;

    await fineService.createFine({ readerId, amount: getTotalFine }, next);
    res.redirect("/user/profile");
  },
};
