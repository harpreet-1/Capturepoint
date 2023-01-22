let cart_item=document.getElementById("cart_quantity")
let cart_value= JSON.parse(localStorage.getItem("cart_items"))||0
cart_item.innerText= cart_value

localStorage.setItem("cart_items", JSON.stringify(cart_value));
cart_item = document.getElementById("cart_quantity");

cart_item.innerText = cart_value;

if (login) {
  let log_out = document.createElement("span");
  log_out.innerText = "Log Out";
  log_out.style.fontSize = "12px";
  log_out.style.textDecoration = "underline";
  log_out.style.cursor = "pointer";
  log_out.addEventListener("click", () => {
    localStorage.removeItem("login");
    localStorage.removeItem("cart");
    localStorage.removeItem("cart_items");
    localStorage.removeItem("total");

    window.location.href = "index.html";
    // localStorage.setItem("login", false);
  });
  document.getElementById("signin_text").innerHTML = "";
  document.getElementById("signin_text").innerText = login;
  document.getElementById("signin_text").append(log_out);
} else {
  document.getElementById("signin_text").addEventListener("click", () => {
    window.location.href = "signin.html";
  });
}

let input_el = document.querySelector("#search_icon");

      input_el.addEventListener("click", () => {
        // alert(document.querySelector(".serchbar").value)
        let input = document.querySelector(".serchbar").value;
        localStorage.setItem("search", JSON.stringify(input));
        window.location.href = "search.html";
      });