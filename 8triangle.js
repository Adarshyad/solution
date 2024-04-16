let n = 6
for(let i = 1; i <= n + 1; i++){
    let s = ""
    for(j = 1; j < (n - i + 2) ; j++){
        s = s + "*"
    }
    console.log(s);
}
