const Task = require("./task")

class Tasks {

  _listado = {}

  get listArray() {
    return Object.entries(this._listado).map(([key, value]) => value)
  }

  constructor() {
    this._listado = {}
  }

  deletTask(id) {
    if( this._listado[id] ) {
      delete this._listado[id]
    }
  }

  setTasksFromArray( tasks = [] ) {
    tasks.forEach(task => this._listado[task.id] = task )
  }

  createTask( desc ) {
    const task = new Task( desc )
    this._listado[task.id] = task
  }

  listTasks( completed ) {
    console.log()
    let cont = 1

    this.listArray.forEach(({desc, completedIn}) => {
      let numTask = `${cont}.`.green
      let status = completedIn ? completedIn.green : 'Pending'.red
      
      let task = `${numTask} ${desc} :: ${status}`

      if(completed && completedIn) {
        cont++
        console.log( task )
      } else if (completed === false && !completedIn) {
        cont++
        console.log( task )
      }

      if(typeof completed === 'undefined') {
        cont++
        console.log( task )
      }
    })
  }

  toggleCompleted( ids ) {
    
    this.listArray.forEach(task => {

      this._listado[task.id].completedIn = (ids.includes(task.id)) 
        ? new Date().toISOString() 
        : null

    })

  } 

}

module.exports = Tasks 