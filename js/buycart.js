function parseAndRenderBuyCart() {
    var stored = localStorage.getItem('cart')
    storedParsed = JSON.parse(stored)
    var total = 0
    storedParsed.forEach(function(product) {
        buyContainer.append(
            `<p> ${ product.title }: $${ product.price }</p>`
        )
        total = total + product.price
    })
    $("#totalFinalPrice").html(`<p>TOTAL: $${total}</p>`)

}


$(document).ready(function() {
    btnBuyCart = $("#buyCart")
    buyContainer = $("#buy-container")
    parseAndRenderBuyCart()    
})