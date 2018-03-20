
var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a+b);
      } else {
        reject('arguments must be numbers');
      }
    }, 1500);
  });
};

asyncAdd(5, 7)
  .then((res) => {
    console.log(res);
    return asyncAdd(res, 33);
  })
  .then((res) => {
    console.log('result should be 45: ', res);
  })
  .catch((errorMessage) => {
    console.log(errorMessage);
  })

// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('hey, it worked');
//     //reject('unable to fulfill promise');
//   }, 3000);
// });
//
// somePromise.then((message) => {
//   console.log('success:', message);
// }, (errorMessage) => {
//   console.log('error: ', errorMessage);
// });
