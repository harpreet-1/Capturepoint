
let body=document.querySelector(".card_box")


// let input=JSON.parse(localStorage.getItem("search"))
let input="hp"
search(input.toUpperCase());

function search(input) {
  fetch("./all_products.json")
    .then((response) => response.json())
    .then((jsondata) => {
      data = jsondata;
    // console.log(data)
    let searched=data.filter((el,i)=>{
        return(el.title.toUpperCase().includes(input))
    })
    console.log()
    display_searched(searched)
    });
}
function display_searched(data){
    body.innerHTML=""
    data.forEach((element,index) => {
        let card=document.createElement("div")
       
        let image=document.createElement("img")
        image.setAttribute("src",element.image)
        let rating=document.createElement("div")
        rating.setAttribute("class","rating")
        let star1=document.createElement("i")
        star1.setAttribute("class","fa-solid fa-star")
        let star2=document.createElement("i")
        star2.setAttribute("class","fa-solid fa-star")
        let star3=document.createElement("i")
        star3.setAttribute("class","fa-solid fa-star")
        let star4=document.createElement("i")
        star4.setAttribute("class","fa-solid fa-star")
        let star5=document.createElement("i")
        star5.setAttribute("class","fa-solid fa-star")
    
    
        rating.append(star1,star2,star3,star4,star5)
    
        let title=document.createElement("p")
        let title_a=document.createElement("a")
        title_a.innerText=element.title
        title.append(title_a)

        let model=document.createElement("p")
        model.innerText="SKU: IPCZS80B MFR: DC-ZS80DK"
        let price=document.createElement("p")
        price.innerText="Final Price :"


        let price_a=document.createElement("h4")
        price_a.innerText="$ "+element.price

        let text1=document.createElement("p")
        let finace=document.createElement("span")
        let text2=document.createElement("span")
        let link=document.createElement("a")
        finace.innerText="$67/mo"
        text2.innerText="suggested payments with 6‑month special financing."
        link.innerText="Learn how."
        text1.append(finace,text2,link)

        let btn=document.createElement("div")

        btn.textContent="Add to Cart"
        let Stock=document.createElement("p")
        Stock.textContent="In Stock"
        
    
    
        card.append(image,rating,title,model,price,text1,btn,Stock)
        body.append(card)
    
        card.addEventListener("click",()=>{
          
          localStorage.setItem("product",JSON.stringify(element))
          window.location.href="single_product.html"
        })
      });
}



