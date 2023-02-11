let searchinput = document.getElementById("searchinput");
let bytitle = document.getElementById("bytitle");
let bycategory = document.getElementById("bycategory");

let createli = document.getElementById("createli");
let showall = document.getElementById("showall");
let sorttitle = document.getElementById("sorttitle");
let sortprice = document.getElementById("sortprice");
let sortvat = document.getElementById("sortvat");
let sortid = document.getElementById("sortid");
let deleteall = document.getElementById("deleteall");
let tbody = document.getElementById("tbody");
let table = document.getElementById("table");
let form = document.getElementById("demo");

let titlein = document.getElementById("title");
let categoryin = document.getElementById("category");
let pricein = document.getElementById("price");
let vatin = document.getElementById("vat");
let countin = document.getElementById("count");
let btncreate = document.getElementById("btncreate");
let mood = 'create';
let searchmood = 'bytitle';
let idTMP ;
let success = document.getElementById('success');
let back = document.getElementById('back');
let nothingFound = document.getElementById('nothingFound');


/******* back *******/

back.onclick = ()=>{
    showproducts();
}

/*****   Get product and Categories from localstorage  *******/

var Products = [];
var Categories = [];

if(localStorage.product !== "null"){
    Products = JSON.parse(localStorage.product);
    showproducts();
}

/*********     Create    ************ */
createli.onclick = function(){
    titlein.value = '';
    categoryin.value = '';
    pricein.value = '';
    vatin.value = '';
    countin.value = '';
    table.style.display = 'none';
    back.style.display = 'block';
    countin.style.display = 'block';
    btncreate.innerHTML = 'Create';
    mood = 'create';
    createform.style.display = 'block';
    titlein.focus();
}

function Newcategory(category){
    for(let i=0;i<Categories.length;i++){
        if(Categories[i]==category){
            return false;
        }
    }
    return true;
}

btncreate.onclick = function(){
    let title = titlein.value;
    let category = categoryin.value;
    let price = +pricein.value;
    let vat = +vatin.value;
    let count = 1;
    if(1 < +countin.value){
        count = +countin.value;
    }
    
    if(title==''){
        titlein.focus();
    }else if(category==''){
        categoryin.focus();
    }else if(price==0){
        pricein.focus();
    }else if(vat>80){
        vatin.value = '';
        vatin.focus();
    }else if(count<=100){
        if(mood=='create'){
            for(let i=0;i<count;i++){
                let product = {
                    title:title,
                    category:category,
                    price:price,
                    vat:vat,
                    id:Products.length,
                }
                if(count>1){
                    product.title += `${i+1}`
                }
                Products.push(product);
            }
            titlein.value = '';
            categoryin.value = '';
            pricein.value = '';
            vatin.value = '';
            countin.value = '';






            if(Newcategory(category)){
                Categories.push(category);
            }
            success.innerHTML = '<h4> The product has been added successfully</h4>';
            success.style.display =  'block';
            setTimeout(() => {
                success.style.display = 'none'
                titlein.focus();
            }, 2000);
            
        }else{
            Products[idTMP].title = title;
            Products[idTMP].category = category;
            Products[idTMP].price = price;
            Products[idTMP].vat = vat;
            location.reload();
        }
        localStorage.setItem('product',JSON.stringify(Products));
        localStorage.setItem('category',JSON.stringify(Categories));

    }else{
        countin.focus();
    }
}

/*********    Read    **************** */

function showproducts(List = Products){
    createform.style.display = 'none';
    back.style.display = 'none';
    table.style.display = 'block';
    if(List.length > 0){
        tbody.innerHTML = '';
        for(let i=0;i<List.length;i++){
            let ID = List[i].id;
            tbody.innerHTML += `
            <tr >
                <td class="td1">${ID + 1}</td>
                <td>${List[i].title}</td>
                <td>${List[i].category}</td>
                <td>${List[i].price}</td>
                <td>${List[i].vat}</td>
                <td><button onclick="Update(${ID})" type="submit">Update</button></td>
                <td><button onclick="Delete(${ID})" class="deletebtn" type="submit">Delete</button></td>
            </tr>
        `
        }
    }
}
showall.onclick = ()=>{
    showproducts(Products);
    location.reload();
}

/********      Update    ************/

function Update(ID){
    table.style.display = 'none';
    btncreate.innerHTML = 'Update';
    mood = 'update';
    countin.style.display = 'none';
    createform.style.display = 'block';

    titlein.value = Products[ID].title;
    categoryin.value = Products[ID].category;
    pricein.value = Products[ID].price;
    vatin.value = Products[ID].vat;
    idTMP = ID;

}

/**********    Sort   ***************/

sorttitle.onclick = function(){
    Products.sort(function(a,b) {
        let atitle = a.title.toLowerCase();
        let btitle = b.title.toLowerCase();
        if(atitle > btitle){ return 1 ;}
        if(atitle < btitle){ return -1 ;}
        return 0 ;
    });
    localStorage.product = JSON.stringify(Products);
    showproducts();
};

sortprice.onclick = function(){
    Products.sort(function(a,b) {
        let aprice = a.price;
        let bprice = b.price;
        if(aprice > bprice){ return 1 ;}
        if(aprice < bprice){ return -1 ;}
        return 0 ;
    });
    localStorage.product = JSON.stringify(Products);
    showproducts();
};

sortvat.onclick = function(){
    Products.sort(function(a,b) {
        let avat = a.vat;
        let bvat = b.vat;
        if(avat > bvat){ return 1 ;}
        if(avat < bvat){ return -1 ;}
        return 0 ;
    });
    localStorage.product = JSON.stringify(Products);
    showproducts();
};
sortid.onclick = function(){
    Products.sort(function(a,b) {
        let aid = a.id;
        let bid = b.id;
        if(aid > bid){ return 1 ;}
        if(aid < bid){ return -1 ;}
        return 0 ;
    });
    localStorage.product = JSON.stringify(Products);
    showproducts();
};

/**********   delete  ***************/

function reloadID(){
    for(let i=0;i<Products.length;i++){
        Products[i].id = i;
    }
}

deleteall.onclick = function(){
    if(confirm('Are you sure you want to delete all Products !')){
        localStorage.setItem('product','null');
        location.reload();
    }
}

function Delete(ID){
    if(confirm('Are you sure you want to delete this Product !?')){
        Products.splice(ID,1);
        reloadID();
        localStorage.product = JSON.stringify(Products);
        location.reload();
    }
}

/**********   Search *****************/

bytitle.onclick = ()=>{
    searchmood = 'bytitle';
    searchinput.setAttribute('placeholder','Search by title');
    searchinput.focus();
}
bycategory.onclick = ()=>{
    searchmood = 'bycategory';
    searchinput.setAttribute('placeholder','Search by category');
    searchinput.focus();
}

function SearchProd(value){
    let res = [];
    tbody.innerHTML = ''
    for(let i=0;i<Products.length;i++){

        if(searchmood == 'bytitle'){
            if(Products[i].title.toLowerCase().includes(value.toLowerCase())){
                res.push(Products[i]);
                tbody.innerHTML += `
                <tr >
                    <td class="td1">${i + 1}</td>
                    <td>${Products[i].title}</td>
                    <td>${Products[i].category}</td>
                    <td>${Products[i].price}</td>
                    <td>${Products[i].vat}</td>
                    <td><button onclick="Update(${i})" type="submit">Update</button></td>
                    <td><button onclick="Delete(${i})" class="deletebtn" type="submit">Delete</button></td>
                </tr>
                `
            }
        }
        else{
            if(Products[i].category.toLowerCase().includes(value.toLowerCase())){
                res.push(Products[i]);
                tbody.innerHTML += `
                <tr >
                    <td class="td1">${i + 1}</td>
                    <td>${Products[i].title}</td>
                    <td>${Products[i].category}</td>
                    <td>${Products[i].price}</td>
                    <td>${Products[i].vat}</td>
                    <td><button onclick="Update(${i})" type="submit">Update</button></td>
                    <td><button onclick="Delete(${i})" class="deletebtn" type="submit">Delete</button></td>
                </tr>
                `
            }
        }
    }
    if(res.length==0){
        tbody.innerHTML = `
            <tr>
                <th id="nothingfound" >Nothing was found .. </th>
            </tr>
        `
    }
}

