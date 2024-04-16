let a = [70,80,90,84,79]
mx = a[0]
for(let i = 0; i < a.length; i++){
    if (a[i] > mx){
        mx = a[i]
    }
}
console.log(mx);