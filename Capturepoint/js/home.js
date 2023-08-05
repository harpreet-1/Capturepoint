// sildeshow_part
slideshow();
function slideshow() {
  let sildeshow_pic = [
    "https://www.adorama.com/images/cms/36471Hero-Sony-Lens-Desktop@2x_(1)_52724.jpg",
    "https://www.adorama.com/images/cms/36471Nikon-Z9-In-Stock-Hero-Desktop@2x_28627.jpg",
    "https://www.adorama.com/images/cms/36471Hero-Accessorize-Your-Gear-Desktop@2x_27069.jpg",
    "https://www.adorama.com/images/cms/36471Hero-New-Year-New-You-Desktop@2x_02759.jpg",
    "https://www.adorama.com/images/cms/36471New-MacBook-Pro-2023-Hero-Desktop@1.5x_87161.jpg",
  ];

  window.addEventListener("load", () => {
    let sildeshow_el = document.getElementById("slideshow_image");
    let i = 1;
    setInterval(() => {
      if (i == 5) {
        i = 0;
      }
      sildeshow_el.setAttribute("src", sildeshow_pic[i]);
      i++;
    }, 4000);
  });
}

// slider part
slider1();

function slider1() {
  const left_btn = document.querySelector(".l_btn");
  const right_btn = document.querySelector(".r_btn");

  right_btn.addEventListener("click", function (event) {
    event.preventDefault();
    const connet = document.querySelector("#top_deal_cards");
    connet.scrollLeft += 1100;
  });
  left_btn.addEventListener("click", function (event) {
    event.preventDefault();
    const connet = document.querySelector("#top_deal_cards");
    connet.scrollLeft -= 1100;
  });
}
// new_release_data display

let new_release_section = document.getElementById("new_release_cards");
//
let new_release_data = JSON.parse(localStorage.getItem("new_release"));

fetchdata();

function fetchdata() {
  fetch("./new_realses.json")
    .then((response) => response.json())
    .then((jsondata) => {
      data = jsondata;

      display_new_releases(data);
    });
}

function display_new_releases(data) {
  localStorage.setItem("new_release", JSON.stringify(data));

  new_release_section.innerHTML = "";
  data.forEach((element, index) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    let image = document.createElement("img");
    image.setAttribute("src", element.image);
    let rating = document.createElement("div");
    rating.setAttribute("class", "rating");
    let star1 = document.createElement("i");
    star1.setAttribute("class", "fa-solid fa-star");
    let star2 = document.createElement("i");
    star2.setAttribute("class", "fa-solid fa-star");
    let star3 = document.createElement("i");
    star3.setAttribute("class", "fa-solid fa-star");
    let star4 = document.createElement("i");
    star4.setAttribute("class", "fa-solid fa-star");
    let star5 = document.createElement("i");
    star5.setAttribute("class", "fa-solid fa-star");

    rating.append(star1, star2, star3, star4, star5);

    let title = document.createElement("h3");
    let title_a = document.createElement("a");
    title_a.innerText = element.title;
    title.append(title_a);
    let price = document.createElement("p");
    price.setAttribute("class", "new_release_price");
    price.innerText = element.price;
    let des = document.createElement("p");
    des.setAttribute("class", "new_release_des");
    des.innerText = element.des;

    card.append(image, rating, title, price, des);
    new_release_section.append(card);

    card.addEventListener("click", () => {
      localStorage.setItem("product", JSON.stringify(element));
      window.location.href = "single_product.html";
    });
  });
}

let topdeals = document.getElementById("top_deal_cards");
//
// let new_release_data=JSON.parse(localStorage.getItem("new_release"))

fetchdata1();

function fetchdata1() {
  fetch("./all_products.json")
    .then((response) => response.json())
    .then((jsondata1) => {
      data1 = jsondata1;

      display_top(data1);
    });
}

function display_top(data) {
  localStorage.setItem("new_release", JSON.stringify(data));

  topdeals.innerHTML = "";
  for (let i = 0; i <= 35; i += 2) {
    let card = document.createElement("div");
    card.setAttribute("class", "top_deal_card");
    let image = document.createElement("img");
    image.setAttribute("src", data[i].image);

    let title = document.createElement("h2");
    let title_a = document.createElement("a");
    title_a.innerText = data[i].title;
    title.append(title_a);

    let rating = document.createElement("div");
    rating.setAttribute("class", "rating");
    let star1 = document.createElement("i");
    star1.setAttribute("class", "fa-solid fa-star");
    let star2 = document.createElement("i");
    star2.setAttribute("class", "fa-solid fa-star");
    let star3 = document.createElement("i");
    star3.setAttribute("class", "fa-solid fa-star");
    let star4 = document.createElement("i");
    star4.setAttribute("class", "fa-solid fa-star");
    let star5 = document.createElement("i");
    star5.setAttribute("class", "fa-solid fa-star");

    rating.append(star1, star2, star3, star4, star5);
    let price = document.createElement("p");
    price.setAttribute("class", "now_price");
    price.innerText = "Instant Rebate: $70.00";
    let des = document.createElement("p");
    let des1 = document.createElement("p");
    des.setAttribute("class", "discount");
    des.innerText = data[i].price;

    card.append(image, title, rating, des1, des, price);
    topdeals.append(card);

    card.addEventListener("click", () => {
      localStorage.setItem("product", JSON.stringify(data[i]));
      window.location.href = "single_product.html";
    });
  }
}
