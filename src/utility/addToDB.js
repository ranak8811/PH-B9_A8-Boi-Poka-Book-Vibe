import { toast } from "react-toastify";

const successNotify = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const errorNotify = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const warnNotify = (message) => {
  toast.warn(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const getStoredReadList = () => {
  // read-list
  const storedListStr = localStorage.getItem("read-list");
  if (storedListStr) {
    const storedList = JSON.parse(storedListStr);
    return storedList;
  } else {
    return [];
  }
};

const addToStoredReadList = (id) => {
  const storedList = getStoredReadList();
  if (storedList.includes(id)) {
    // already exists. do not add it
    // console.log(id, "already exists in the read list");
    errorNotify("already exists in the read list");
  } else {
    storedList.push(id);
    const storedListStr = JSON.stringify(storedList);
    localStorage.setItem("read-list", storedListStr);
    // ideally trigger toast from the component
    successNotify("This book is added to your read list.");
  }
};

const getStoredWishList = () => {
  // wish-list
  const storedWishListStr = localStorage.getItem("wish-list");
  if (storedWishListStr) {
    const storedWishList = JSON.parse(storedWishListStr);
    return storedWishList;
  } else {
    return [];
  }
};

const addToStoredWishList = (id) => {
  const storedWishList = getStoredWishList();
  if (storedWishList.includes(id)) {
    // already exists. do not add it
    // console.log(id, "already exists in the wish list");
    errorNotify("already exists in the wish list");
  } else {
    storedWishList.push(id);
    const storedWishListStr = JSON.stringify(storedWishList);
    localStorage.setItem("wish-list", storedWishListStr);
    successNotify("This book is added to your wish list");
  }
};

// export { addToStoredReadList, addToStoredWishList, getStoredReadList };

// Function to remove a book from the read list
const removeFromStoredReadList = (id) => {
  // console.log(id);
  const storedList = getStoredReadList();
  // console.log(typeof storedList[2]);
  // console.log(typeof storedList);
  // console.log(Array.isArray(storedList) ? "sotti" : "mittha");
  // console.log(storedList);
  const index = storedList.indexOf(JSON.stringify(id));
  // console.log(index);

  if (index !== -1) {
    // If the item exists, remove it
    storedList.splice(index, 1);
    const updatedListStr = JSON.stringify(storedList);
    localStorage.setItem("read-list", updatedListStr);
    warnNotify("This book has been removed from your read list.");
  } else {
    errorNotify("This book is not in your read list.");
  }
};

// Function to remove a book from the wish list
const removeFromStoredWishList = (id) => {
  const storedWishList = getStoredWishList();
  const index = storedWishList.indexOf(JSON.stringify(id));

  if (index !== -1) {
    // If the item exists, remove it
    storedWishList.splice(index, 1);
    const updatedWishListStr = JSON.stringify(storedWishList);
    localStorage.setItem("wish-list", updatedWishListStr);
    successNotify("This book has been removed from your wish list.");
  } else {
    errorNotify("This book is not in your wish list.");
  }
};

export {
  addToStoredReadList,
  addToStoredWishList,
  getStoredReadList,
  getStoredWishList,
  removeFromStoredReadList,
  removeFromStoredWishList,
};
