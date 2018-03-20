console.log('starting app');

setTimeout(() => {
  console.log('inside callback of 2000 milliseconds');
  console.log(Error.stackTraceLimit);
  console.log(typeof Error.stackTraceLimit);
},2000);

setTimeout(() => {
  console.log('inside callback of 0 milliseconds');
},0);

console.log('finishing');
