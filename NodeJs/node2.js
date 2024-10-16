/* 
Synchronous: One task at a time, blocks the execution of the next task until finished.
Asynchronous: Multiple tasks can run in the background, allowing the application to keep running smoothly without waiting.
Node.js is Asynchronous, optimized for handling I/O operations efficiently without blocking the main execution thread.
*/

console.log('task1')
setTimeout(() => { console.log('logic execution') }, 2000);
console.log('task2')
console.log('task3')


//==========================> HANDLING ASYNCHRONOUS DATA
let a = 10; let b = 5;
setTimeout(()=>{
    b = 20
},2000);
console.log(`Sum : ${a+b}`)


let c = 5; let d = 7;
let watingData = new Promise((resolve,reject)=> {
    setTimeout(()=>{
        resolve(30);
    },2000)
})

watingData.then((d)=>{
    console.log(`${c} + ${d} = ${c+d}`)
})


