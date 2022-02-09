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

const createErorrMessage = (element, erorr) => {
  const container = document.querySelector(element);
  container.textContent = `${error}`;
};

const trimArr = (arr) => {
  const filterArr = [...trimArr];
  return filterArr.splice(0, 12);
};



