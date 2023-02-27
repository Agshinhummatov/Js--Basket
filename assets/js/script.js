"use strict";

let cardBtns = document.querySelectorAll("#shop a");

let products = [];

if (localStorage.getItem("basket") != null) {
    products = JSON.parse(localStorage.getItem("basket"));
}


console.log(products);


cardBtns.forEach(btn => {
    btn.addEventListener("click", function (e) {
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        e.preventDefault();
        let prodoctImage = this.parentNode.previousElementSibling.getAttribute("src");
        let productName = this.parentNode.firstElementChild.innerText;
        let productDesc = this.previousElementSibling.previousElementSibling.innerText;
        let productPrice = parseInt(this.previousElementSibling.lastElementChild.innerText);
        let productId = parseInt(this.parentNode.parentNode.getAttribute("data-id"));
        let existProduct = products.find(m=> m.id == productId);

        if (existProduct != undefined) {
            existProduct.count +=1;
            existProduct.price = productPrice * existProduct.count;
        }else{

            products.push({
                id: productId,                              // gotrduyum elementleri add edirem 
                name: productName,
                img: prodoctImage,
                descripation: productDesc,
                price: productPrice,
                count: 1
    
            })
        }



        
       

        localStorage.setItem("basket", JSON.stringify(products));

        getBasketCount(products);



    })
});


function getBasketCount(arr){
    let sum = 0;
    for (const item of arr) {
        sum += item.count
    }
   document.querySelector("sup").innerText = sum;
}

getBasketCount(products)








document.querySelector("#test span").addEventListener("click",function(){

    let num = parseInt(document.querySelector("input").value)
    num +=1;
    document.querySelector("input").value =num;
})





