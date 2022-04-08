require('colors')

const { inquirerMenu, pausa, readInput, listDeleteTask, confirm, listCompleteTask } = require('./helpers/inquirer')
const Tasks = require('./models/tasks')
const { saveFile, readDB } = require('./helpers/saveFile')

const main = async () => {

  let opt = ''
  const tasks = new Tasks()

  const tasksDB = readDB()

  if(tasksDB) {
    tasks.setTasksFromArray(tasksDB)
  }

  do {
    opt = await inquirerMenu()

    switch(opt) {
      case '1': const desc = await readInput('Description:')
                tasks.createTask( desc )
        break

      case '2': tasks.listTasks()
        break

      case '3': tasks.listTasks(true)
        break

      case '4': tasks.listTasks(false)
        break

      case '5': const ids = await listCompleteTask( tasks.listArray )
                tasks.toggleCompleted( ids )
        break

      case '6': const id = await listDeleteTask(tasksDB)
                
                if(id !== '0') {
                  const conf = await confirm('Are you sure about that?') 
                  if(conf) {
                    tasks.deletTask(id)
                    console.log('Deleted task')
                  }
                }
        break
    }

    saveFile(tasks.listArray)

    if(opt !== '0') await pausa()

  } while(opt !== '0')

}

main()