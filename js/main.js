let spinner = document.getElementById("spinner");
let rowDisplay = document.getElementById("rowDisplay");
let sectionDetails = document.getElementById("sectionDetails");
let sectionHome = document.getElementById("sectionHome");
let detailsGame = document.getElementById("detailsGame");

class Ui {
  async getGames(categoreOption) {
    spinner.classList.remove("d-none");
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b7ddeaba2emsh4c7f9a279de19b4p17f62fjsn9ef33d17e7d9",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoreOption}`,
      options
    );
    const response = await api.json();
    games.display(response);
    games.getCardId();
    games.videoPlay();
    spinner.classList.add("d-none");
  }
  display(ArrGames) {
    let box = "";
    for (let i = 0; i < ArrGames.length; i++) {
      box += `
      <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
          <div class="card text-white"  id="${ArrGames[i].id}">
            <div class="card-f">
              <img
                src="${ArrGames[i].thumbnail}"
                class="card-img-top filter img"
                alt="..."
              
              /> 
                <video width="100%" class="video d-none" preload="none" loop>
  <source src="https://www.freetogame.com/g/${
    ArrGames[i].id
  }/videoplayback.webm" type="video/mp4">
</video>
              <div class="mt-3 px-3 pb-1 d-flex justify-content-between align-items-center">
                <h5 class="card-title filter small m-0">${
                  ArrGames[i].title
                }</h5>
                <span class="w-25 text-center rounded-2 p-bg fs-6 filter">free</span>
              </div>
              <div>
              <p class="text-center px-3 m-0 text-white-50 small" id="p">
              ${ArrGames[i].short_description.split(" ", 10)}
              </p>
              </div>
            </div>
            <div class="card-body p-2 d-flex justify-content-between align-items-center">
              <span
                class="px-1 ms-2 m-0 text-center rounded-2 card-body-p-bg "
              >
                ${ArrGames[i].genre}
              </span>
              <span class="px-1 me-2 m-0 text-center rounded-2 card-body-p-bg">
                ${ArrGames[i].platform}
              </span>
            </div>
          </div>
        </div>
      `;
    }
    document.getElementById("rowDisplay").innerHTML = box;
  }
  getCardId() {
    document.querySelectorAll(".card").forEach(function (e) {
      e.addEventListener("click", function () {
        games.getDetailsId(e.id);
      });
    });
  }
  videoPlay() {
    document.querySelectorAll(".card").forEach(function (e) {
      let img = e.querySelector(".img");
      let video = e.querySelector(".video");

      e.addEventListener("mouseenter", function () {
        video.style.height = `${img.getBoundingClientRect().height}px`;
        img.classList.add("d-none");
        video.classList.remove("d-none");
        video.play();
      });

      e.addEventListener("mouseleave", function () {
        img.classList.remove("d-none");
        video.classList.add("d-none");
        video.removeAttribute("preload");
        video.pause();
      });
    });
  }

  async getDetailsId(idCard) {
    spinner.classList.remove("d-none");
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b7ddeaba2emsh4c7f9a279de19b4p17f62fjsn9ef33d17e7d9",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idCard}`,
      options
    );
    const responseData = await api.json();
    games.displayDetails(responseData);
    spinner.classList.add("d-none");
  }
  displayDetails(data) {
    games.getCardId();
    let box = ``;
    box += `
    
      
        <div class="row row-gap-4">
          <div class="col-md-4">
            <div class="img-logo-id">
              <img src="${data.thumbnail}" class="w-100" alt="img-details" />
            </div>
          </div>
          <div class="col-md-8 text-white">
            <h3>Title: ${data.title}</h3>
            <p>
              Category:
              <span class="bg-info rounded-3 px-2 small fw-bolder text-black">${data.genre}</span>
            </p>
            <p>
              Platform:
              <span class="bg-info rounded-3 px-2 small fw-bolder text-black">${data.platform}</span>
            </p>
            <p>
              Status:
              <span class="bg-info rounded-3 px-2 small fw-bolder text-black">${data.status}</span>
            </p>
            <p class="small">
              ${data.description}
            </p>
            <button class="btn text-capitalize text-white btn-show-game">
              <a href="${data.game_url}" target="_blank" class="text-decoration-none text-white">show game</a>
            </button>
          </div>
        </div>`;
    document.getElementById("sectionDetails").innerHTML = box;
    document.getElementById("sectionHome").classList.add("d-none");
    document.getElementById("sectionDetails").classList.remove("d-none");
    document.getElementById("detailsGame").classList.remove("d-none");
  }
}
const games = new Ui();
const display = new Ui();
games.getGames("mmorpg");

let xButton = document.getElementById("xButton");

xButton.addEventListener("click", function () {
  document.getElementById("sectionHome").classList.remove("d-none");
  document.getElementById("sectionDetails").classList.add("d-none");
  document.getElementById("detailsGame").classList.add("d-none");
});

const navLinks = document.querySelectorAll("nav ul li a");

function removeActiveClass() {
  navLinks.forEach((demo) => demo.classList.remove("active"));
}
navLinks.forEach((demo) => {
  demo.addEventListener("click", function () {
    games.getGames(this.dataset.category);
    removeActiveClass();
    this.classList.add("active");
  });
});
