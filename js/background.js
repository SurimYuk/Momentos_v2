"use strict";

const body = document.querySelector("body"),
  imageInfoContainer = document.querySelector(".js-image-info");

const PICTURE_API_KEY = "QBouKhzobtjHTVUCnxViWDuxa0RxXi03741fpK7_-6Q";

function setImageInfo(city, country) {
  imageInfoContainer.innerText = `📍 ${city === null ? "" : city}, ${
    country === null ? "" : country
  }`;
}

function getImageUrl() {
  fetch(
    `https://api.unsplash.com/photos/random/?client_id=${PICTURE_API_KEY}&query=landscape&orientation=landscape`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const imgCity = json.location.city;
      const imgCountry = json.location.country;
      if (imgCity === null || imgCountry === null) {
        getImageUrl();
      } else {
        setImageInfo(imgCity, imgCountry);
        localStorage.setItem("url", JSON.stringify(json.urls.regular));
      }
      return;
    });
}

function paintBgImage() {
  getImageUrl();
  const imgUrl = JSON.parse(localStorage.getItem("url"));
  body.style.backgroundImage = `url(${imgUrl})`;
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundSize = "cover";
}

function init() {
  paintBgImage();
}

init();
