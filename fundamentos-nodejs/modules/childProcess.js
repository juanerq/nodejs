const { exec, spawn } = require('child_process')

/* exec('ls -la', (err, stdout, sterr) => {
  if (err) return console.log(err)

  console.log(stdout)
}) */

// Execute process
exec('node modules/console.js', (err, stdout, sterr) => {
  if (err) return console.log(err)

  console.log(stdout)
})

let proceso = spawn('ls', ['-la'])

proceso.stdout.on('data', (dato) => {
  console.log(dato.toString());
})

proceso.on('exit', () => {
  console.log('Finished process');
})