const inquirer = require('inquirer')
require('colors')

const questions = [{
  type: 'list',
  name: 'option',
  message: 'You want to do?',
  choices: [
    { value: '1', name: `${'1'.green}. Create task` },
    { value: '2', name: `${'2'.green}. List tasks` },
    { value: '3', name: `${'3'.green}. List completed tasks` },
    { value: '4', name: `${'4'.green}. List pending tasks` },
    { value: '5', name: `${'5'.green}. Complete task(s)` },
    { value: '6', name: `${'6'.green}. Delete task` },
    { value: '0', name: `${'0'.green}. Leave` },
  ]
}]

const inquirerMenu = async () => {

  console.clear()
  console.log('======================'.yellow)
  console.log('   Select an option   '.white)
  console.log('======================\n'.yellow)

  const { option } = await inquirer.prompt(questions)

  return option
}

const pausa = async () => {

  const enter = [{
    type: 'input',
    name: 'pausa',
    message: `press ${ 'ENTER'.green } to continue `
  }]

  console.log('\n');
  const { pausa } = await inquirer.prompt(enter)

  return pausa
}

const readInput = async (message) => {

  const question = [{
    type: 'input',
    name: 'desc',
    message,
    validate( value ) {
      if(value.trim().length === 0) 
        return 'Please enter a value'
      return true
    }
  }]

  const { desc } = await inquirer.prompt(question)

  return desc
}

const listDeleteTask = async ( tasks ) => {
  
  const choices = tasks.map(({id, desc}, index) => {
    return { value: id, name: `${index + 1}. `.green + desc }
  })
  
  choices.unshift({
    value: '0', name: '0. Leave'
  })

  const question = {
    type: 'list',
    name: 'id',
    message: 'Delete',
    choices
  }
  
  console.log('\n');
  const { id } = await inquirer.prompt(question)

  return id
} 

const confirm = async (message) => {
  const question = {
    type: 'confirm',
    name: 'ok',
    message
  }

  const { ok } = await inquirer.prompt(question)

  return ok
}

const listCompleteTask = async ( tasks ) => {
  
  const choices = tasks.map(({id, desc, completedIn}, index) => {
    return { 
      value: id, 
      name: `${index + 1}. `.green + desc,
      checked: ( completedIn ) ? true : false
    }
  })

  const question = {
    type: 'checkbox',
    name: 'ids',
    message: 'Selections',
    choices
  }
  
  console.log('\n');
  const { ids } = await inquirer.prompt(question)

  return ids
} 

module.exports = {
  inquirerMenu,
  pausa,
  readInput,
  listDeleteTask,
  confirm,
  listCompleteTask
}