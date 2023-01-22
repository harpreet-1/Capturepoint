// login check
let login=localStorage.getItem("login")||false
console.log(login);

if(login){
  let log_out= document.createElement("span")
    log_out.innerText="Log Out"
    log_out.style.fontSize="12px"
    log_out.style.textDecoration="underline"
    log_out.style.cursor="pointer"
    log_out.addEventListener("click",()=>{
      
      localStorage.removeItem("login")
      localStorage.removeItem("cart")
      localStorage.removeItem("cart_items")
      localStorage.removeItem("total")

      window.location.href="index.html"
      localStorage.setItem("login",false)
    })
  document.getElementById("signin_text").innerHTML=""
  document.getElementById("signin_text").innerText=login
  document.getElementById("signin_text").append(log_out)
}
else{
    

    document.getElementById("signin_text").addEventListener("click",()=>{
        
        window.location.href="signin.html"

    })
}

