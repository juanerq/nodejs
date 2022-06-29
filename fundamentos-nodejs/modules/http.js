const http = require('http')

http.createServer((req, res) => {
  console.log(req.url)

  res.writeHead(200, { "Content-Type": "text/plain" })
  res.write('hello')
  res.end()
}).listen(10101)

console.log(`Server runnign on port 10101`);