// let x = {
//     name: "Jeet",
//     age: 32
//     };
    
     
    
//     let y = {...x};
    
   
//     y.name = "Pankaj"
     
    
//     // change y.name to Pankaj
    
     
    
//     console.log({x, y});



//Finding the largest element in the array
const array = [22, 65, 55, 96, 33, 88, 44]
let max = 0; let max2 = 0;
var arr = []
let arrayB = []
for (let i = 0; i < array.length; i++) {
    
    if(array[i] > max) {
        max = array[i]       
    } 
}
console.log("Array", max);

for (let j = 0; j < array.length; j++) {
    if(array[j] > max2) {
        max2 = array[j]
    }
}
console.log("Max value", max2)