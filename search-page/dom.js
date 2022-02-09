const form = document.querySelector(".form");
const input = document.querySelector(".input");
const container = document.querySelector(".cards-container");
const loader = document.querySelector(".loader");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value === "") {
    alert("please enter something valid");
    return;
  }
  container.replaceChildren();
  searchQoutes(input.value);
});
