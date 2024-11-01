import React from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import {
  addToStoredReadList,
  addToStoredWishList,
} from "../../utility/addToDB";

const BookDetail = () => {
  const { bookId } = useParams();
  const data = useLoaderData();
  const id = parseInt(bookId);
  // console.log(typeof bookId, typeof id,  typeof data[0].bookId)

  const book = data.find((book) => book.bookId === id);

  const {
    bookId: currentBookId,
    image,
    bookName,
    author,
    tags,
    category,
    totalPages,
    rating,
    review,
    publisher,
    yearOfPublishing,
  } = book;

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleMarkAsRead = (id) => {
    /**
     * 1. understand what to store or save: => bookId
     * 2. Where to store: database
     * 3. array, list, collection:
     * 4. check: if the book is already in the readList.
     * 5. if not, then add the book to the list
     * 6. if yes, do not add the book
     */

    addToStoredReadList(id);
  };

  const handleAddToWishList = (id) => {
    addToStoredWishList(id);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <div className="bg-[rgba(19,19,19,0.05)] p-12 rounded-2xl flex-1 flex justify-center items-center">
        <img className="w-[400px]" src={image} alt="" />
      </div>
      <div className="flex-1 space-y-3 p-4 lg:p-0">
        <h2 className="card-title playfair-font text-4xl">{bookName}</h2>
        <p>By: {author}</p>
        <hr className="my-3" />
        <p>{category}</p>
        <hr className="my-3" />
        <p>
          <span className="font-bold">Review: </span>
          {review}
        </p>
        <div className="flex gap-6 items-center">
          <span className="font-bold">Tags: </span>
          {tags.map((tag, index) => (
            <button
              key={index}
              className="btn btn-sm bg-[rgba(35,190,10,0.05)] text-[#23BE0A]"
            >
              {tag}
            </button>
          ))}
        </div>
        <hr className="my-3" />
        <p>
          Number of Pages: <span className="font-bold">{totalPages}</span>
        </p>
        <p>
          Publisher: <span className="font-bold">{publisher}</span>
        </p>
        <p>
          Year of Publishing:{" "}
          <span className="font-bold">{yearOfPublishing}</span>
        </p>
        <p>
          Rating: <span className="font-bold">{rating}</span>
        </p>

        <div>
          <div>
            <button
              onClick={() => handleMarkAsRead(bookId)}
              className="btn btn-outline mr-4 btn-accent"
            >
              Mark as Read
            </button>
            <button
              onClick={() => handleAddToWishList(bookId)}
              className="btn btn-accent"
            >
              Add to Wish List
            </button>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleGoBack}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
