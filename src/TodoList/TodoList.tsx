import React, {useCallback, useEffect} from 'react';
import s from './TodoList.module.css'
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../store';
import {addTaskAC, addTaskTC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskTC, fetchTasksTC} from './tasks-reducer';
import {v1} from 'uuid';
import {Task} from './Task/Task';
import {FilterValueType} from './todolist-reducer';
import {TaskPriorities, TaskStatus, TaskType} from '../api/todolistsAPI';


type TodoListPropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValueType, todoListId: string) => void
    filter: FilterValueType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}


const TodoList = React.memo((props: TodoListPropsType) => {

    const dispatch = useDispatch()
    const tasksObj = useSelector<AppRootStateType, TaskType[]>((state => state.tasks[props.id]))

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [props.id, dispatch])


    // Work With Tasks
    function removeTask(id: string, todoListId: string) {
        dispatch(deleteTaskTC(id, todoListId))
    }

    // @ts-ignore
    // useEffect((id: string, todoListId: string) => {
    //     dispatch(deleteTaskTC(id,todoListId))
    // }, [props.id, dispatch])

    function changeTaskStatus(id: string, todoListId: string, status: TaskStatus) {
        dispatch(changeTaskStatusAC(id, todoListId, status))
    }

    function changeTaskTitle(id: string, todoListId: string, newTitle: string) {
        dispatch(changeTaskTitleAC(id, todoListId, newTitle))
    }


    const onClickAllHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
    const onClickActiveHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
    const onClickCompletedHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])


    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props.changeTodoListTitle, props.id])

    const addTask = useCallback((title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            status: TaskStatus.New,
            todoListId: props.id,
            startDate: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.low,
            deadline: '',
            description: ''
        };
        dispatch(addTaskTC(newTask, props.id))
    }, [props.id])

    let tasksForTodoList = tasksObj;

    if (props.filter === 'completed') {
        tasksForTodoList = tasksForTodoList?.filter(t => t.status === TaskStatus.Completed)
    }
    if (props.filter === 'active') {
        tasksForTodoList = tasksForTodoList?.filter(t => t.status === TaskStatus.InProgress || t.status === TaskStatus.New)
    }

    return (
        <div className={s.todolist}>

            <div className={s.closeButtonAndTitle}>
                <h3><EditableSpan title={props.title} onChangeTitleHandler={changeTodoListTitle}/></h3>
                <IconButton onClick={removeTodoListHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTask}/>
            <div>{
                tasksForTodoList.map(t => {
                    return <Task key={t.id} todolistId={props.id} task={t}
                                 removeTask={removeTask}
                                 changeTaskStatus={changeTaskStatus}
                                 changeTaskTitle={changeTaskTitle}/>
                })}
            </div>

            <div className={s.filterButtons}>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onClickAllHandler}
                    // color={'secondary'}
                >All
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onClickActiveHandler}
                    // color={'error'}
                >Active
                </Button>

                <Button
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onClickCompletedHandler}
                    // color={'success'}
                >Completed
                </Button>

            </div>
        </div>
    )
})


export default TodoList;