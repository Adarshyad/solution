let name = "Alex"
let vol = "aeiouAEIOU"
let  sum = 0
for(let i = 0; i < name.length; i++)
{
    for(let j = 0; j < vol.length; j++){
        if (name[i] == vol[j]){
            sum++
        }
    }
}
console.log(sum);
