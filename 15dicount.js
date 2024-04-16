let calculateDiscountPercentage = (listPrice, discountPrice) => {
    result = Math.floor((discountPrice / listPrice) * 100)
    return `${result}%`
}

console.log(calculateDiscountPercentage(680, 300));