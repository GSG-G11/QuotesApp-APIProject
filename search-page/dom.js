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
