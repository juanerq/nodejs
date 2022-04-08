const argv = require('./config/yargs')

const fibonacci = async (base) => {
  let fibo = [0, 1]
  
  for(let i = 2; i < base; i++) {
    fibo[i] = fibo[i - 1] + fibo[i - 2]
  }
  return fibo.join(', ')
}

fibonacci(argv.base)
  .then(resp => {
    if(argv.list) console.log(resp);
  })