import { renderBooksList } from "./renderProductList.js";
import { setCartIcon } from "./cart.js";

const loadButton = document.getElementById("load-btn");
const categories = document.querySelectorAll(".sidebar__el");

const URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = "AIzaSyB5MgllwWJti5nFckh0CPE2ESbbzfZuvRI";

const httpRequestParam = {
  category: "Architecture",
  startIndex: 0,
  maxResults: 6,
  langRestrict: "en",
};

const changeCategoryInSidebar = (category) => {
  let currentCategoryItem = document.querySelector(".sidebar__el_active");
  let newCategory = category;

  currentCategoryItem.classList.remove("sidebar__el_active");
  newCategory.classList.add("sidebar__el_active");
};

const getHttpRequestParam = (resetStartIndex) => {
  let currentCategoryNode = document.querySelector(".sidebar__el_active");
  let currentCategoryName = currentCategoryNode.dataset.category;

  httpRequestParam.category = currentCategoryName;

  if (resetStartIndex === true) {
    httpRequestParam.startIndex = 0;
  }

  return httpRequestParam;
};

const useRequest = (URL, getParam, callback, clearNode) => {
  let link = `${URL}?q="subject:${httpRequestParam.category}"&${API_KEY}&printType=books&startIndex=${httpRequestParam.startIndex}&maxResults=${httpRequestParam.maxResults}&langRestrict=${httpRequestParam.langRestrict}`;

  fetch(link)
    .then((response) => response.json())
    .then((data) => {
      callback(data, clearNode);
    })
    .catch((err) => console.log(err.message));
};

categories.forEach((category) =>
  category.addEventListener("click", (event) => {
    event.preventDefault();

    changeCategoryInSidebar(category);

    const getParam = getHttpRequestParam(true);

    useRequest(URL, getParam, renderBooksList, true);
  })
);

loadButton.addEventListener("click", () => {
  const getParam = getHttpRequestParam();

  getParam.startIndex += 6;

  useRequest(URL, getParam, renderBooksList, false);
});

setCartIcon(localStorage.length);

useRequest(URL, httpRequestParam, renderBooksList, false);
