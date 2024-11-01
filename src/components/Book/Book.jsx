import { Link } from "react-router-dom";

const Book = ({ book }) => {
  const {
    bookId,
    bookName,
    author,
    image,
    tags,
    category,
    totalPages,
    rating, // fractional rating up to 5
  } = book;

  // Calculate the number of full and half stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 <= 0.5;

  return (
    <Link to={`/books/${bookId}`} className="mx-auto">
      <div className="card bg-base-100 w-96 shadow-xl p-6">
        <figure className="bg-[#F3F3F3] py-8 rounded-2xl">
          <img src={image} alt={bookName} className="h-[166px]" />
        </figure>
        <div className="card-body">
          <div className="flex gap-6">
            {tags.map((tag, index) => (
              <button
                key={index}
                className="btn btn-xs bg-[rgba(35,190,10,0.05)] text-[#23BE0A]"
              >
                {tag}
              </button>
            ))}
          </div>

          <h2 className="card-title playfair-font">{bookName}</h2>
          <p>By: {author}</p>
          <div className="border-t-2 my-2 border-dashed"></div>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">{category}</div>
            <div className="badge badge-outline">{totalPages}</div>

            <div className="badge badge-outline">{rating}</div>
          </div>

          {/* Dynamic Star Rating Display */}
          <div className="rating rating-lg rating-half mx-auto mt-6">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex">
                {/* First half of the star */}
                <input
                  type="radio"
                  name={`rating-${bookId}`}
                  className="mask mask-star-2 mask-half-1 bg-green-500"
                  checked={i < fullStars || (i === fullStars && hasHalfStar)}
                  readOnly
                />
                {/* Second half of the star */}
                <input
                  type="radio"
                  name={`rating-${bookId}`}
                  className="mask mask-star-2 mask-half-2 bg-green-500"
                  checked={i < fullStars}
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Book;
