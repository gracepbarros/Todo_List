import Head from 'next/head';
import React, {useState} from 'react';
import '../styles/Home.module.css';
import '../styles/global.css';
import Todo from "./components/Todo";
import Form from "./components/Form";

//Contador para ID, atualizando cada vez que add um novo item
let idCount = 0; 

export default function Home() {

  const [tasks, setTasks] = useState([]);

  function addTask(name){
    const newTask = {id: `${idCount++}`, name, completed: false};
    setTasks([...tasks,newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const updatedTask = tasks.map((task) => {
      if(id === task.id){
        return {...task,name: newName};
      }
      return task;
    }
    );
    setTasks(updatedTask);
  }

  const taskList = tasks.map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
    />));

  //Texto de task remaining diferente para plural e singular
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>Grace's Todo List</h1>
      <Form addTask={addTask}/> 
      <h2 id="list-heading" tabIndex="-1">
        {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
          {taskList} 
      </ul>
    </div>

    );
}
