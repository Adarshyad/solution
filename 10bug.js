let cart = [2, 3, 1, 4];

function doubleQuantities(cartArray) {
    for (let i = 0; i < cartArray.length; i++) {
        cartArray[i] *= 2;
    }
    return cartArray;
}

cart = doubleQuantities(cart);
console.log(cart); 