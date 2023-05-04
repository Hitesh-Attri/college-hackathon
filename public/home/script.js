

let product = document.getElementsByClassName("products")[0];
let button=document.getElementsByClassName("e");  
let button2=document.getElementsByClassName("f");
let load=document.getElementsByClassName("d")[0]
// let body=document.getElementsByTagName("body");
console.log(button2)
function loadMore() {
    let request = new XMLHttpRequest();
    request.open("get", "/prod")
    request.send();
    request.addEventListener("load", function () {
        let obj = JSON.parse(request.responseText)
        let arr = obj.send;
        if(arr.length==0){
            load.style.display="none";
        }
        if (arr.length != 0) {
            arr.forEach(item => {
                let divv = document.createElement("div")
                divv.className = "divv";
                let id = document.createElement("span")
                id.className = "idd"
                id.innerHTML = item.id;
                id.style.display = "none";
                // console.log(item, typeof item)
                let span = document.createElement("span")
                span.className = "productname"
                span.innerText = item.productName;
                let span2 = document.createElement("span")
                let img = document.createElement("img");
                img.src = item.filename
                img.alt = "Unable to show"
                img.style.height = "200px"
                img.style.width = "200px"

                let br = document.createElement("br")
                let br2 = document.createElement("br")
                let button = document.createElement("button")
                button.type = "button"
                button.innerHTML = "view Details"
                button.className = "btn btn-info e";
                let button2=document.createElement("button")
                button2.type="button"
                button2.innerText="Add to Cart"
                button2.className = "btn btn-info f";
                button.onclick = "viewDetails(this)";
                let desc = document.createElement("span")
                desc.className = "desc";
                desc.innerHTML = item.desc;
                desc.style.display = "none";
                img.id = item.id;
                span.id = item.id;
                span2.id = item.id;
                button.id = item.id;
                divv.id = item.id;
                desc.id = item.id;
                let br3=document.createElement("br")
                let price=document.createElement("span")
                price.className="price";
                price.id=item.id;
                price.style.display="none"
                price.innerHTML=item.price;
                let quantity=document.createElement("span")
                quantity.className="quant";
                quantity.id=item.id;
                quantity.innerHTML=item.quantity;
                quantity.style.display="none"
                let alert=document.createElement("div")
                alert.style.color="aliceblue"
                alert.innerHTML="ellkw;  "
                alert.className="alert text-center"
                alert.id=item.id
                span2.appendChild(img)
                divv.appendChild(span);
                divv.appendChild(id)
                divv.appendChild(br);
                divv.appendChild(span2);
                divv.appendChild(br2)
                divv.appendChild(button)
                divv.appendChild(desc)
                divv.appendChild(br3)
                divv.appendChild(button2)
                divv.appendChild(quantity)
                divv.appendChild(price)
                
                divv.appendChild(alert)
                product.appendChild(divv);
                button.addEventListener("click",(event)=>{
                    let identity=event.target.id;
                    let description=(event.target.nextElementSibling).innerHTML;
                    // console.log(description)
                    console.log(description)
                    product.classList.toggle("pro")
                    product.style.pointerEvents="none"
                    let popup=document.createElement("div");
                    popup.className="popup"
                    product.style.filter="blur(20px)"
                    let divvv=document.getElementById(identity)
                    let n=document.createElement("div");
                    n.className="proname";
                    // console.log(divvv.childNodes[0].innerHTML)
                    n.innerHTML=divvv.childNodes[0].innerHTML;
                    // console.log(divvv.childNodes[1])
                    // console.log(divv.childNodes[2])
                    let img=document.createElement("img");
                    img.src=divv.childNodes[3].childNodes[0].src
                    img.alt="unable to show";
                    img.style.width="200px";
                    img.style.height="200px"
                    
                    let d=document.createElement("div")
                     d.innerHTML =`<p>${description}</p>`;
                    
                    // popup.style.backgroundColor="black"
                   let button=document.createElement("button")
                   button.innerHTML="close"
                   button.className="btn btn-info"
                   button.addEventListener("click",()=>{
                    //  product.classList.toggle("products")

                     popup.classList.toggle("popupactive")
                     document.body.removeChild(popup)
                    product.style.filter="none";
                    product.style.pointerEvents="visible"
                   })
                   d.style.width="200px";
                   d.style.height="200px";
                   d.style.display="inline";
                   let br=document.createElement("br")
                   
                    popup.appendChild(n)
                    popup.appendChild(br)
                    popup.appendChild(img)
                    popup.appendChild(br)
                    popup.appendChild(d)
                    popup.appendChild(br)
                    popup.appendChild(button)
                   document.body.appendChild(popup)
                })
                button2.addEventListener("click",(event)=>{
                   
                    console.log(divv)
                    let identity=divv.id
                    console.log(divv.children[9])
                    let stock=divv.children[9].innerHTML;
                    var request=new XMLHttpRequest();
                    request.open("POST","/addtocart")
                    request.setRequestHeader("Content-Type","application/json")
                    request.send(JSON.stringify({"id":identity,"stock":stock}));
                    request.addEventListener("load",()=>{
                       if(JSON.parse(request.responseText).msg=="fail"){
                         divv.style.backgroundColor="grey";
                        divv.style.pointerEvents="none";
                        let p=divv.children[11]
                        p.innerHTML=`Product out of stock`
                        p.style.color="black"
                        
                       } 
                    //    else alert("successfully added to cart")
                    else{
                        let p=divv.children[11]
                        p.innerHTML=`Added to Cart`
                        p.style.color="black"
                        
                    }
                })
                })
            })
            
        }
        
    })
    
}
for(let i=0;i<button.length;i++){
    button[i].addEventListener("click",(event)=>{
        let identity=event.target.id;
        // console.log(identity)
                    let description=(event.target.nextElementSibling).innerHTML;
                    // console.log(description)
                    product.classList.toggle("pro")
                    let popup=document.createElement("div");
                    popup.className="popup"
                    product.style.filter="blur(20px)"
                    product.style.pointerEvents="none"
                    let divvv=document.getElementById(identity)
                    console.log(divvv)
                    let n=document.createElement("div");
                    n.className="proname";
                    // console.log(divvv.childNodes[0].innerHTML)
                    n.innerHTML=divvv.children[0].innerHTML;
                    let img=document.createElement("img");
                    img.src=divvv.children[3].children[0].src;
                    console.log(img.src)
                    img.alt="unable to show";
                    img.style.width="200px";
                    img.style.height="200px"
                    
                    let d=document.createElement("div")
                     d.innerHTML =`<p>${description}</p>`;
                    
                    // popup.style.backgroundColor="black"
                
                   let button=document.createElement("button")
                   button.innerHTML="close"
                   button.addEventListener("click",()=>{
                    //  product.classList.toggle("products")

                     popup.classList.toggle("popupactive")
                     document.body.removeChild(popup)
                    product.style.filter="none";
                    product.style.pointerEvents="auto"
                   })
                   d.style.width="200px";
                   d.style.height="200px";
                   d.style.display="inline";
                   button.className="btn btn-info"
                   let br=document.createElement("br")
                   
                    popup.appendChild(n)
                    popup.appendChild(br)
                    popup.appendChild(img)
                    popup.appendChild(br)
                    popup.appendChild(d)
                    popup.appendChild(br)
                    popup.appendChild(button)
                   document.body.appendChild(popup)
    })
}
for(let i=0;i<button2.length;i++){
    console.log("yo")
    button2[i].addEventListener("click",(event)=>{
        console.log("bye")
        let identity=event.target.id;
        // let name=event.target
        var divvv=document.getElementById(identity)
        let stock=divvv.children[9].innerHTML;
        var request=new XMLHttpRequest();
        request.open("POST","/addtocart")
        request.setRequestHeader("Content-Type","application/json")
        console.log("ew")
        request.send(JSON.stringify({"id":identity,"stock":stock}));
        request.addEventListener("load",()=>{
           if(JSON.parse(request.responseText).msg=="fail"){
             divvv.style.backgroundColor="grey";
            divvv.style.pointerEvents="none";
            let p=divvv.children[11]
            p.innerHTML=`Product out of stock`
            p.style.color="black"
            
           } 
        //    else alert("successfully added to cart")
        else{
            let p=divvv.children[11]
            p.innerHTML=`Added to Cart`
            p.style.color="black"
            
        }
        })
    })
}