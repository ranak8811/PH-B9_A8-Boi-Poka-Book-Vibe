// ListedBooks.js
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  getStoredReadList,
  removeFromStoredReadList,
  getStoredWishList,
  removeFromStoredWishList,
} from "../utility/addToDB";
import Book from "../components/Book/Book";
import WishBookList from "../components/WishBookList/WishBookList";

const ListedBooks = () => {
  const [readList, setReadList] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [sort, setSort] = useState("");

  const allBooks = useLoaderData();

  useEffect(() => {
    // Initialize read list
    const storedReadList = getStoredReadList().map((id) => parseInt(id));
    const readBookList = allBooks.filter((book) =>
      storedReadList.includes(book.bookId)
    );
    setReadList(readBookList);

    // Initialize wish list
    const storedWishList = getStoredWishList().map((id) => parseInt(id));
    const wishBookList = allBooks.filter((book) =>
      storedWishList.includes(book.bookId)
    );
    setWishList(wishBookList);
  }, [allBooks]);

  const handleSort = (sortType) => {
    setSort(sortType);

    const sortedList = (list, key) => [...list].sort((a, b) => a[key] - b[key]);

    if (sortType === "No of Pages") {
      setReadList(sortedList(readList, "totalPages"));
      setWishList(sortedList(wishList, "totalPages"));
    } else if (sortType === "Ratings") {
      setReadList(sortedList(readList, "rating"));
      setWishList(sortedList(wishList, "rating"));
    }
  };

  const handleRemoveFromReadList = (removeBookId) => {
    removeFromStoredReadList(removeBookId);
    const remainingBooks = readList.filter(
      (readBook) => readBook.bookId !== removeBookId
    );
    setReadList(remainingBooks);
  };

  return (
    <div>
      <h3 className="text-3xl my-8 font-extrabold text-center bg-gradient-to-r from-green-300 to-red-700 bg-clip-text text-transparent">
        Listed Books
      </h3>
      <div className="dropdown flex justify-center">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 bg-[#23BE0A] text-white"
        >
          {sort ? `Sort By ${sort}` : "Sort By"}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li onClick={() => handleSort("Ratings")}>
            <a>Ratings</a>
          </li>
          <li onClick={() => handleSort("No of Pages")}>
            <a>No of Pages</a>
          </li>
        </ul>
      </div>
      <br />
      <Tabs>
        <TabList>
          <Tab>Read List</Tab>
          <Tab>Wish List</Tab>
        </TabList>

        <TabPanel>
          <h2 className="text-2xl my-4 font-extrabold text-center bg-gradient-to-r from-green-300 to-purple-700 bg-clip-text text-transparent">
            Books I read: {readList.length}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readList.map((book) => (
              <div key={book.bookId} className="flex flex-col gap-4">
                <Book book={book}></Book>
                <button
                  className="btn btn-error text-white self-start"
                  onClick={() => handleRemoveFromReadList(book.bookId)}
                >
                  Remove: <span>{book.bookId}</span>
                </button>
              </div>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          <h2 className="text-2xl my-4 font-extrabold text-center bg-gradient-to-r from-yellow-300 to-red-700 bg-clip-text text-transparent">
            My Wish List: {wishList.length}
          </h2>
          <WishBookList
            wishList={wishList}
            setWishList={setWishList}
          ></WishBookList>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ListedBooks;

// import { useEffect, useState } from "react";
// import { useLoaderData } from "react-router-dom";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import {
//   getStoredReadList,
//   removeFromStoredReadList,
//   getStoredWishList,
//   removeFromStoredWishList,
// } from "../utility/addToDB";
// import Book from "../components/Book/Book";

// const ListedBooks = () => {
//   const [readList, setReadList] = useState([]);
//   const [sort, setSort] = useState("");

//   const allBooks = useLoaderData();

//   useEffect(() => {
//     const storedReadList = getStoredReadList();
//     const storedReadListInt = storedReadList.map((id) => parseInt(id));
//     // console.log(storedReadList, storedReadListInt, allBooks);

//     const readBookList = allBooks.filter((book) =>
//       storedReadListInt.includes(book.bookId)
//     );

//     setReadList(readBookList);
//   }, []);

//   const handleSort = (sortType) => {
//     setSort(sortType);

//     if (sortType === "No of Pages") {
//       const sortedReadList = [...readList].sort(
//         (a, b) => a.totalPages - b.totalPages
//       );

//       setReadList(sortedReadList);
//     }
//     if (sortType === "Ratings") {
//       const sortedReadList = [...readList].sort((a, b) => a.rating - b.rating);
//       setReadList(sortedReadList);
//     }
//   };

//   const handleRemove = (removeBookId) => {
//     removeFromStoredReadList(removeBookId);
//     // console.log(removeBookId);
//     // console.log(readList);
//     const remainingBooks = readList.filter(
//       (readBook) => readBook.bookId !== removeBookId
//     );
//     setReadList(remainingBooks);
//   };

//   return (
//     <div>
//       <h3 className="text-3xl my-8 font-extrabold text-center bg-gradient-to-r from-green-300 to-red-700 bg-clip-text text-transparent">
//         Listed Books
//       </h3>
//       <div className="dropdown flex justify-center">
//         <div
//           tabIndex={0}
//           role="button"
//           className="btn m-1 bg-[#23BE0A] text-white"
//         >
//           {sort ? `Sort By ${sort}` : "Sort By"}
//         </div>
//         <ul
//           tabIndex={0}
//           className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
//         >
//           <li onClick={() => handleSort("Ratings")}>
//             <a>Ratings</a>
//           </li>
//           <li onClick={() => handleSort("No of Pages")}>
//             <a>No of Pages</a>
//           </li>
//         </ul>
//       </div>
//       <br />
//       <Tabs>
//         <TabList>
//           <Tab>Read List</Tab>
//           <Tab>Wish List</Tab>
//         </TabList>

//         <TabPanel>
//           <h2 className="text-2xl">Books I read: {readList.length}</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {readList.map((book) => (
//               <div key={book.bookId} className="flex flex-col gap-4">
//                 <Book book={book}></Book>
//                 <button
//                   className="btn btn-error text-white self-start"
//                   onClick={() => handleRemove(book.bookId)}
//                 >
//                   Remove: <span>{book.bookId}</span>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </TabPanel>
//         <TabPanel>
//           <h2 className="text-2xl">My wish list: {}</h2>
//           {/* write code for wish list here */}
//         </TabPanel>
//       </Tabs>
//     </div>
//   );
// };

// export default ListedBooks;
