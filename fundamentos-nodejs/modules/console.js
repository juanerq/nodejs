const hello = () => {
  let cont = 0
  const id = setInterval(() => {
    if (cont > 5) {
      return clearInterval(id)
    }
    console.log('hello');
    cont++
  }, 1000)
}

//hello()
console.log('hello')