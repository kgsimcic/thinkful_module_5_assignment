function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function isCheckedOut(book) {
  const [first, ...rest] = book.borrows;
  return first.returned === false;
}

function partitionBooksByBorrowedStatus(books) {
  let returned = [];
  let notReturned = [];
  books.map((book) => {
    if (isCheckedOut(book)) {
      returned.push(book);
    } else {
      notReturned.push(book);
    }
  });

  return [returned, notReturned];
}

function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  ids = borrows.map((borrow) => borrow.id);
  let people = ids.map((id) => accounts.find((account) => account.id === id));

  const borrowers = people.map((person) => {
    const theBorrow = borrows.find((borrow) => borrow.id === person.id);
    person.returned = theBorrow.returned;
  });
  return people.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
