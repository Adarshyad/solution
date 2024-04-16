let totalBill = (product) => {
let sum = 0
for (pro in product){
    let r = product[pro];
    n1 = Number(r.price) * Number(r.quantity)
    sum += n1
    prod = Number(product.price) * Number(product.quantity)
}
console.log("Total bill is: ", sum);
}

totalBill( [
    {
        "name": 'Soap',
        "price": 10,
        "quantity" : 2,
    },
    {
        "name": 'pen' ,
        "price": 50,
        "quantity" : 1,
    },
    {
        "name": 'Bag' ,
        "price": 40,
        "quantity" : 3,
    },
    {
        "name": 'key' ,
        "price": 100,
        "quantity" : 5,
    }
])
 