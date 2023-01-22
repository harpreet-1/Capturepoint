let cart_item=document.getElementById("cart_quantity")
let cart_value= JSON.parse(localStorage.getItem("cart_items"))||0
cart_item.innerText= cart_value