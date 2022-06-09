let cart = [];
let modalqt = 1;
let modalKey = 0;



const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

pizzaJson.map((item,index)=>{
    let pizzaItem = document.querySelector(".models .pizza-item").cloneNode(true);
    pizzaItem.setAttribute("data-key",index);
    pizzaItem.querySelector(".pizza-item--img img").src = item.img;
    pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
    pizzaItem.querySelector(".pizza-item--price").innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;
    pizzaItem.querySelector("a").addEventListener("click",(e)=>{
        e.preventDefault()
        let key = pizzaItem.getAttribute("data-key");
        modalqt = 1
        modalKey = key;

        c(".pizzaBig img").src = pizzaJson[key].img;
        c(".pizzaInfo h1").innerHTML = pizzaJson[key].name;
        c(".pizzaInfo .pizzaInfo--desc").innerHTML = pizzaJson[key].description;
        c(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c(".pizzaInfo--size.selected").classList.remove("selected");
        c(".pizzaInfo--qt").innerHTML = modalqt;
        cs(".pizzaInfo--size").forEach((item,indexItem)=>{
            if(indexItem == 2){
                item.classList.add("selected");
            }
            item.querySelector("span").innerHTML = pizzaJson[key].sizes[indexItem];

        });
        
        c(".pizzaWindowArea").style.opacity = 0;
        c(".pizzaWindowArea").style.display = "flex";
        setTimeout(()=>{
            c(".pizzaWindowArea").style.opacity = 1;
        },200);
    
    });




    
    c(".pizza-area").append(pizzaItem);
});

function closeModal(){
    c(".pizzaWindowArea").style.opacity = 0;
    setTimeout(()=>{
        c(".pizzaWindowArea").style.display = "none";
    },200);
}

cs(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton").forEach((item)=>{
    item.addEventListener("click",closeModal);
    item.style.cursor = "pointer";
});

c(".pizzaInfo--qtmenos").addEventListener("click",()=>{
   if(modalqt > 1){
    modalqt--;
    c(".pizzaInfo--qt").innerHTML = modalqt;
   };
});
c(".pizzaInfo--qtmais").addEventListener("click",()=>{
    modalqt++;
    c(".pizzaInfo--qt").innerHTML = modalqt;
});

cs(".pizzaInfo--size").forEach((item)=>{
    item.addEventListener("click",()=>{
        c(".pizzaInfo--size.selected").classList.remove("selected");
        item.classList.add("selected");
    })
});

c(".pizzaInfo--addButton").addEventListener("click",()=>{
    let size = parseInt(c(".pizzaInfo--size.selected").getAttribute("data-key"));
    let identifier = pizzaJson[modalKey].id+"@"+size;
    let key = cart.findIndex((item)=>item.identifier == identifier);
    if(key > -1){
        cart[key].quantidade += modalqt;

    }else{

        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            quantidade:modalqt
        });
    }
    updateCart();
    closeModal();
});


function updateCart() {
    if(cart.length > 0){
        c("aside").classList.add("show");
    }else{
        c("aside").classList.remove("show");

    }
}