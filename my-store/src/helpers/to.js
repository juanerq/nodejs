const to = (promise) => {
  return promise
    .then(data => [null, data])
    .catch(error => [error, null])
}

export default to
