import React, { useEffect, useState } from "react";
import { getBooksByType } from "./book-search.service";

const getBookAuthors = (authors: any) => {
  if (authors && authors.length <= 2) {
    authors = authors.join(" and ");
  } else if (authors && authors.length > 2) {
    let lastAuthor = " and " + authors.slice(-1);
    authors.pop();
    authors = authors.join(", ");
    authors += lastAuthor;
  }
  return authors;
};

const BookSearch = () => {
  const [bookType, updateBookType] = useState("");
  const [bookTypeToSearch, updateBookTypeToSearch] = useState("");
  const [allAvailableBooks, setAllAvailableBooks] = useState({ items: [] });
  const [wishListBooks, setWishListBooks] = useState<string[]>([]);
  const uniqueWishListBooks = wishListBooks
    .map((book: any) => book.volumeInfo.title)
    .filter((value, index, self) => self.indexOf(value) === index);
  async function requestBooks() {
    if (bookTypeToSearch) {
      const allBooks = await getBooksByType(bookTypeToSearch);
      setAllAvailableBooks(allBooks);
    }
  }

  useEffect(() => {
    async function getAllBooks() {
      await requestBooks();
    }
    setTimeout(getAllBooks,500);
  }, [bookTypeToSearch]);
  return (
    <>
      <div className="book--container">
        <div className="search-params">
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateBookTypeToSearch(bookType);
              }}
            >
              <input
                className="full-width"
                autoFocus
                name="gsearch"
                type="search"
                value={bookTypeToSearch}
                placeholder="Search for books to add to your reading list and press Enter"
                onChange={(e) => updateBookTypeToSearch(e.target.value)}
              />
            </form>
            {!bookType && (
              <div className="empty">
                <p>
                  Try searching for a topic, for example
                  <a
                    onClick={() => {
                      updateBookType("Javascript");
                    }}
                  >
                    {" "}
                    "Javascript"
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="books--wishList">
        {allAvailableBooks.items && allAvailableBooks.items.length > 0 && (
          <div className="books-list flex-item">
            {allAvailableBooks.items.map((book: any, index) => {
              return (
                <div key={index}>
                  <div className="book-details">
                    <img
                      alt={`${book.volumeInfo.title} book`}
                      src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                    />
                    <div>
                      <h3>{book.volumeInfo.title}</h3>
                      <p>
                        Published by: {getBookAuthors(book.volumeInfo.authors)}
                      </p>
                      <p>published date: {book.volumeInfo.publishedDate}</p>
                      {/* <p> Description: {book.volumeInfo.description} </p> */}
                      <button
                        onClick={() => {
                          setWishListBooks((wishListBooks) => [
                            ...wishListBooks,
                            book,
                          ]);
                        }}
                      >
                        Add this book to wishlist
                      </button>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        )}
        {allAvailableBooks.items && allAvailableBooks.items.length > 0 && (
          <div className="books-list flex-item">
            <h2> My Reading Wishlist ({uniqueWishListBooks.length}) </h2>
            {uniqueWishListBooks.map((e: any, key) => {
              return <p key={key}> {e} </p>;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default BookSearch;
