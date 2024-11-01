// WishBookList.js
import React from "react";
import { removeFromStoredWishList } from "../../utility/addToDB";

const WishBookList = ({ wishList, setWishList }) => {
  const handleRemove = (removeBookId) => {
    removeFromStoredWishList(removeBookId);
    const remainingBooks = wishList.filter(
      (wishBook) => wishBook.bookId !== removeBookId
    );
    setWishList(remainingBooks);
  };

  return (
    <div className="flex flex-col gap-6">
      {wishList.map((book) => (
        <div
          key={book.bookId}
          className="flex flex-col lg:flex-row items-center gap-4 p-4 border rounded-lg shadow-md bg-white"
        >
          <div>
            <img className="w-[100px]" src={book.image} alt="" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-600">By: {book.author}</p>
            <p className="text-sm text-gray-600">Pages: {book.totalPages}</p>
            <p className="text-sm text-gray-600">Rating: {book.rating}</p>
          </div>

          <button
            className="btn btn-error text-white self-start"
            onClick={() => handleRemove(book.bookId)}
          >
            Remove: <span>{book.bookId}</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default WishBookList;
