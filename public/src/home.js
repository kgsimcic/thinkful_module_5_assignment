function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function isReturned(book) {
  const { borrows } = book;
  [first, ...rest] = borrows;
  return first.returned === false;
}

function getBooksBorrowedCount(books) {
  const borrowedBooks = books.map(isReturned);
  return borrowedBooks.filter((book) => book === true).length;
}

function getMostCommonGenres(books) {
  const genres = books.map((book) => book.genre);
  const uniques = [...new Set(genres)];
  let result = [];
  uniques.map((unique) => {
    const count = genres.filter((genre) => genre == unique).length;
    result.push({ name: unique, count: count });
  });
  result.sort((res1, res2) => res2.count - res1.count);
  return result.slice(0, 5);
}

function getMostPopularBooks(books) {
  const timesBorrowed = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));

  timesBorrowed.sort((borrow1, borrow2) => borrow2.count - borrow1.count);
  return timesBorrowed.slice(0, 5);
}

function sumBorrows(authorBorrowed) {
  if (authorBorrowed.length == 0) {
    return 0;
  } else if (authorBorrowed.length == 1) {
    return authorBorrowed[0].count;
  } else {
    return authorBorrowed.reduce(
      (borrowed1, borrowed2) => borrowed1.count + borrowed2.count,
      0
    );
  }
}

function getMostPopularAuthors(books, authors) {
  const timesBorrowed = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
    authId: book.authorId,
  }));

  const authorCounts = authors.map((author) => {
    const authorBorrowed = timesBorrowed.filter(
      (timeBorrowed) => author.id === timeBorrowed.authId
    );
    return {
      name: author.name.first + " " + author.name.last,
      count: sumBorrows(authorBorrowed),
    };
  });
  return authorCounts
    .sort((author1, author2) => author2.count - author1.count)
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
