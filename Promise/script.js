// const d = new Date();
// const year = d.getFullYear();
// let month = d.getMonth() + 1;
// let day = d.getDate();
// if (month < 10) month = "0" + month;
// if (day < 10) day = "0" + day;
// const date = year + "-" + month + "-" + day;
const date = "2023-11-19";
const beritaContainer = document.querySelector(".berita-container");
beritaContainer.innerHTML = loading();
fetch("https://newsapi.org/v2/everything?q=tesla&from=" + date + "&sortBy=publishedAt&apiKey=7dbbdfa611ca4c9095e8653638c278a2")
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    const berita = response.articles;
    let cards = "";
    berita.forEach((row) => {
      if (row.title != "[Removed]") {
        cards += showCards(row);
      }
    });
    // berita.forEach((a) => (cards += showCards(a)));
    beritaContainer.innerHTML = cards;

    //Tombol Search
    const inputKeyword = document.querySelector(".input-keyword");
    inputKeyword.addEventListener("input", function () {
      fetch("https://newsapi.org/v2/everything?from=" + date + "&apiKey=7dbbdfa611ca4c9095e8653638c278a2&q=" + inputKeyword.value)
        .then((response) => response.json())
        .then((response) => {
          // console.log(response);
          const berita = response.articles;
          let cards = "";
          berita.forEach((a) => (cards += showCards(a)));
          beritaContainer.innerHTML = cards;
        });
    });

    //Ketika Tombol detail di klik
    const modalDetailButton = document.querySelectorAll(".modal-detail-button");
    modalDetailButton.forEach((btn) => {
      btn.addEventListener("click", function () {
        const source = this.dataset.source;
        fetch("https://newsapi.org/v2/everything?from=" + date + "&apiKey=7dbbdfa611ca4c9095e8653638c278a2&q=" + source)
          .then((response) => response.json())
          .then((a) => {
            // console.log(response);
            const beritaDetail = showBeritaDetail(a);
            const modalBody = document.querySelector(".modal-body");
            modalBody.innerHTML = beritaDetail;
          });
      });
    });
  });

function showCards(a) {
  return `<div class="col-md-4 my-2">
            <div class="card">
              <img src="${a.urlToImage}" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">${a.title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${a.author} - ${a.publishedAt}</h6>
                <p class="card-text">${a.description}</p>
                <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#beritaDetailModal" data-newsid="${a.source}" >Read more...</a>
              </div>
            </div>
          </div>`;
}

function showBeritaDetail(a) {
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <img src="${a.urlToImage}" class="img-fluid" />
              </div>
              <div class="col-md">
                <ul class="list-group">
                  <li class="list-group-item"><h4>${a.title}</h4></li>
                  <li class="list-group-item"><strong>Author : </strong>${a.author}</li>
                  <li class="list-group-item"><strong class="card-subtitle">Published : </strong>${a.publishedAt}</li>
                  <li class="list-group-item"><strong>Content : </strong>${a.content}</li>
                </ul>
              </div>
            </div>
          </div>`;
}

function loading() {
  return `<div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          </div>`;
}
