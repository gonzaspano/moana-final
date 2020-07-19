var cart = []
var inputTextSearch
var btnSearch
var results = [];
var searchBoxInput;
var searchKey;
var searchResultLength;
var searchButton;
var formSearch;
var searchResume;
var products;
var jsonData = []

function render() {
    var urlLocal = `http://127.0.0.1:5500/js/data.json`
    $.ajax({
        method: "GET",
        url: urlLocal,
    }).done(function (data) {
        renderProducts(data);
        jsonData = data
    }).fail(function(){
        console.log('error');
    });
}

function renderProducts(products) {
    products.forEach(product => {
        $('#products-container').append(getCardHtml(product));
    });
    var btnAddCart = $(".botonAddCart")
    btnAddCart.click(function(event) {
        var btnAddCartId = $(event.target).data("id")
        addToCart(btnAddCartId)
    })
}

function getCardHtml(product) {
    return `
    <div class="box search-item col-sm-12 col-md-12 col-lg-4 col-xl-4">
    <img src="${product.img}" alt="" class="productoimg">
    <p class="productotexto">${product.title} $${product.price} </p>
    <button type="button" class="btn btn-outline-dark productoboton botonAddCart" data-id="${product.id}">Agregar al carrito</button>
    </div>`;

}
////
function renderSearch() {
    productsContainter.css("display", "none")
    productsSearchContainter.empty()
    results.forEach(function(product, index) {
        productsSearchContainter.append(`
        <div class="box search-item">
        <img src="${product.img}" alt="" class="productoimg">
        <p class="productotexto">${product.title} $${product.price} </p>
        <button type="button" class="btn btn-outline-dark productoboton botonAddCart" data-id="${product.id}">Agregar al carrito</button>
        </div>
        `)
    })
        var btnAddCart = $(".botonAddCart")
        btnAddCart.click(function(event) {
             var btnAddCartId = $(event.target).data("id")
             addToCart(btnAddCartId)

        })
}

function search(key) {
    jsonData.forEach(function(product){
        if(product.title.toLowerCase().includes(key.toLowerCase())) {
            results.push(product)
        }
    })
    return results
}


function getSearchBoxValue(event) {
    var searchBoxInputValue = searchBoxInput.val();
    results = []
    var searchResult = search(searchBoxInputValue);   


    if ($.trim(searchBoxInputValue) !== '') {
        setSearchKeyRender(searchBoxInputValue, searchResult.length);
        renderSearch(results)
    }
}

function setSearchKeyRender(key, resultLength) {
    searchResultLength.html(resultLength);
    searchKey.html(key);
    searchResume.css("display", "block");
}
/////////////
function renderCart() {
    cartContainer.empty()
    var total = parseInt(0);
    cart = localStorage.getItem('cart')
    cart = JSON.parse(cart)
    cart.forEach(function(product, index) {
        cartContainer.append(
        `<li id="lettercarro">${product.title}: $${product.price}</li>`
        )
        total = total + product.price
    })
    $("#totalPrice").html(`<p>TOTAL: $${total}</p>`)
}

function addToCart(index) {
    cart.push(jsonData[index])
    localStorage.setItem('cart', JSON.stringify(cart))
    renderCart()
}

var btnRemoveProductCart = $("#removeProductCart")
btnRemoveProductCart.click(function(event) {
    cart.pop()
    localStorage.setItem('cart', JSON.stringify(cart))
    renderCart()
})

var btnCleanCart = $("#cleanCart")
btnCleanCart.click(function(event) {
    cart = []
    localStorage.setItem('cart', JSON.stringify(cart))
    renderCart()
})

//////////BOTON COMPRAR

var btnBuyCart = $("#buyCart")
var buyContainer = $("#buy-container")
    
btnBuyCart.click(function(event) {
    location.href="cart.html"
})

$(document).ready(function(){
    cartContainer = $("#cart-container")
    productsContainter = $("#products-container")
    productsSearchContainter = $("#products-search-container")

    searchKey = $("#search-key");
    searchResultLength = $("#search-result-length");

    searchButton = $("#search-button");
    searchButton.click(getSearchBoxValue);

    searchBoxInput = $("#search-box-input");

    formSearch = $("#form-search");
    formSearch.submit(function (event) {
        event.preventDefault();
        if (!searchButton.disabled) {
            getSearchBoxValue();
        }
    });
    searchResume = $("#search-resume")
    searchResume.css("display", "none");

    render()
    renderCart()
})