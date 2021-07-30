//Функция promiseReduce последовательно вызывает переданные асинхронные 
//функции и выполняет reduce функцию сразу при получении результата 
//до вызова следующей асинхронной функции. Функция promiseReduce 
//должна возвращать промис с конечным результатом.

var fn1 = () => {
    console.log('fn1')
    return Promise.resolve(1)
  }
  
var fn2 = () => new Promise(resolve => {
    console.log('fn2')
    setTimeout(() => resolve(2), 1000)
})
  
function promiseReduce(asyncFunctions, reduce, initialValue) { 
    /*  
    * Реализация
    */

    let promise = Promise.resolve();
    let acc = initialValue;

    asyncFunctions.forEach(func => {
        promise = promise
            .then(() => func())
            .then(result => {
                acc = reduce(result, acc);
                return acc;
            });
    });

    return promise;
}
  
promiseReduce(
    [fn1, fn2], 
    function (memo, value) {
        console.log('reduce')
    return memo * value
    }, 
    1
)
.then(console.log) 

//Вывод в консоль
  
//fn1
//reduce
//fn2
//reduce
//2