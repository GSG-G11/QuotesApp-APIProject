const fetch = (link, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb({
          error: false,
          status: xhr.status,
          response: JSON.parse(xhr.responseText),
        });
      } else {
        cb({
          error: true,
          status: xhr.status,
          response: JSON.parse(xhr.responseText).message,
        });
      }
    }
  };
  xhr.open("GET", link);
  xhr.send();
};

const createQuoteContent = (element, quote, auth, urlImg) => {
  const container = document.querySelector(element);
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  container.appendChild(card);

  const imgAndContentContainer = document.createElement("div");
  imgAndContentContainer.setAttribute("class", "img-and-content");
  card.appendChild(imgAndContentContainer);

  const imgContainer = document.createElement("div");
  imgContainer.setAttribute("class", "img-container");
  imgAndContentContainer.appendChild(imgContainer);

  const img = document.createElement("img");
  imgContainer.appendChild(img);
  img.src = `${urlImg}`;
  img.alt = "author";

  const quoteContent = document.createElement("p");
  imgAndContentContainer.appendChild(quoteContent);
  quoteContent.setAttribute("class", "quote-content");
  quoteContent.textContent = `“${quote}”`;

  const authorContainer = document.createElement("div");
  card.appendChild(authorContainer);
  authorContainer.setAttribute("class", "author-container");

  const authorName = document.createElement("span");
  authorName.setAttribute("class", "author-name");
  authorContainer.appendChild(authorName);
  authorName.textContent = `-${auth}`;
};

const createErorrMessage = (element, erorr) => {
  const container = document.querySelector(element);
  container.textContent = `${erorr}`;
};

const spliceArr = (arr) => {
  const cloneArr = [...arr];

  return cloneArr.splice(0, 12);
};

const toggleDisplay = (element) => {
  element.classList.toggle("hidden");
};
const searchQoutes = (serachValue) => {
  toggleDisplay(loader);

  fetch(`https://quotable.io/search/quotes?query=${serachValue}`, (data) => {
    const { error, status, response } = data;
    if (error) {
      toggleDisplay(loader);
      createErorrMessage(".cards-container", `Sorry something went wrong`);
      return;
    }

    const { results } = response;

    if (results.length >= 1) {
      toggleDisplay(loader);

      //function to take the first 10 values

      const splicedResults = spliceArr(results);
      splicedResults.forEach((ele) => {
        const { content, author } = ele;
        fetch(
          `https://api.codetabs.com/v1/proxy/?quest=https://imsea.herokuapp.com/api/10?q=${author}`,
          (data) => {
            const { error, status, response } = data;
            if (response) {
              const { results } = response;
              const imgLink = results[0];
              createQuoteContent(".cards-container", content, author, imgLink);
            }
          }
        );
      });
    } else {
      toggleDisplay(loader);
      createErorrMessage(
        ".cards-container",
        `Sorry we couldn't find any results for ${serachValue}`
      );
    }
  });
};
