import React, {FC, useState} from 'react';
import s from './App.module.css';
import TodoList, {TaskType} from './TodoList/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm/AddItemForm';


export type FilterValueType =
    'all' | 'completed' | 'active'

type TodolistType = {
    id: string, title: string, filter: FilterValueType
}

type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {


    const todoListId1 = v1()
    const todoListId2 = v1()


    const [todoLists, setTodoList] = useState<TodolistType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    const [tasksObj, setTasksObj] = useState<TasksStateType>(
        {
            [todoListId1]: [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'REACT/REDUX', isDone: false}
            ],
            [todoListId2]: [
                {id: v1(), title: 'Bread', isDone: true},
                {id: v1(), title: 'Milk', isDone: false},

            ]
        }
    )

    // Work With Tasks
    function removeTask(id: string, todoListId: string) {
        const tasks = tasksObj[todoListId]
        tasksObj[todoListId] = tasks.filter(t => t.id !== id)

        setTasksObj({...tasksObj});
    }


    function addTasks(todoListId: string, title: string) {
        console.log(todoListId)
        console.log(title)
        const newTask: TaskType = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todoListId]
        console.log(tasks)
        let newTasks = [...tasks, newTask]
        console.log(newTasks)
        tasksObj[todoListId] =  newTasks
        setTasksObj({...tasksObj})
    }




    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        const tasks = tasksObj[todoListId]
        const task = tasks.find(t => t.id === taskId)

        if (task) task.isDone = isDone
        setTasksObj({...tasksObj})

    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        const tasks = tasksObj[todoListId]
        const task = tasks.find(t => t.id === taskId)

        if (task) task.title = newTitle
        setTasksObj({...tasksObj})
    }


    // Work with TodoLists
    const removeTodoList = (todoListId: string) => {
        setTodoList(todoLists.filter(tl => tl.id !== todoListId))

        // delete tasksObj[todoListId]
        setTasksObj({...tasksObj})

    }

    const changeTodoListTitle = (id: string, newTitle: string) => {
        const todoList = todoLists.find(tl => tl.id === id)
        if (todoList) {
            todoList.title = newTitle
        }
        setTodoList([...todoLists])

    }

    function changeFilter(value: FilterValueType, todoListId: string) {

        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoList([...todoLists])
        }
    }


    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodolistType = {id: newTodoListId, title: title, filter: 'all'}
        setTodoList([...todoLists, newTodoList])
       setTasksObj(prev=>({...prev,[newTodoListId]:[]}))
    }

    return (
        <div className={s.App}>
            <AddItemForm addItem={addTodoList} titleForButtons={'Add Todo'}/>
            {
                todoLists.map((tl) => {

                    let tasksForTodoList = tasksObj[tl.id];

                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList?.filter(t => t.isDone)
                    }
                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList?.filter(t => !t.isDone)
                    }

                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList ? tasksForTodoList : []}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTasks={addTasks}
                        changeStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
                    />

                })
            }


        </div>
    );
}

export default App;
