function billSpliter(total, numPeople){
    const amountPerPerson = total / numPeople
    console.log(`Each person should pay ${amountPerPerson.toFixed(2)}.`);
}

const totalBill = 5589
const numOfPerson = 5
billSpliter(totalBill,numOfPerson)