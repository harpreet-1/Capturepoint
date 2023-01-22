
let body=document.querySelector(".card_box")


let input=JSON.parse(localStorage.getItem("search"))

search(input.toUpperCase());

function search(input) {
  fetch("./all_products.json")
    .then((response) => response.json())
    .then((jsondata) => {
      data = jsondata;
    
    let searched=data.filter((el,i)=>{
        return(el.title.toUpperCase().includes(input))
    })

    localStorage.setItem("searched",JSON.stringify(searched))
    // console.log(searched)
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
        price.append(price_a)

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


// 
// sorting


let sort_by_price=document.querySelector("#sort_by_price_el")
let filter_form=document.querySelector("form")
let min=document.getElementById("min")
let max=document.getElementById("max")



let currendata=JSON.parse(localStorage.getItem('searched'))

filter_form.addEventListener("submit",(e)=>{
  e.preventDefault()
  let min1=min.value 
  let max1=max.value
  currendata=JSON.parse(localStorage.getItem('searched'))
  currendata=currendata.filter((el)=>{
    return(el.price>=min1 &&el.price<=max1)
  })

  
  display_searched(currendata)
})

sort_by_price.addEventListener("change",()=>{
  // alert("sdsad")
  let sort_data=[...currendata]
  if(sort_by_price.value==""){
   
    display_searched(sort_data)

  }
  else{
    
    if(sort_by_price.value=="asc"){
     
      sort_data.sort(function(a,b){return a.price-b.price})
      
    }
    else{
      sort_data.sort(function(a,b){return b.price-a.price})
    }
    display_searched(sort_data)
 
  }
})

