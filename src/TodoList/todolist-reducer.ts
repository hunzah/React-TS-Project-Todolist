import {v1} from 'uuid';
import {todoListsAPI, TodoListType} from '../api/todolistsAPI';
import {Dispatch} from 'redux';


export type TodolistDomainType = TodoListType & {
    filter: FilterValueType
}
export type FilterValueType =
    'all' | 'completed' | 'active'


export type RemoveTodoActionType = {
    type: 'REMOVE-TODO'
    id: string
}

export type AddTodoActionType = {
    type: 'ADD-TODO'
    // todolistId: string,
    // title: string
    todoList: TodoListType
}

export type ChangeTodoTitleActionType = {
    type: 'CHANGE-TODO-TITLE'
    newTitle: string
    id: string
}

export type ChangeTodoFilterActionType = {
    type: 'CHANGE-TODO-FILTER'
    newFilter: FilterValueType
    id: string
}

export type setTodoACType = {
    type: 'SET-TODO'
    todo: TodoListType[]
}

type ActionTypes = RemoveTodoActionType | AddTodoActionType |
    ChangeTodoTitleActionType | ChangeTodoFilterActionType |
    setTodoACType

export const todoListId1 = v1()
export const todoListId2 = v1()

const initialState: TodolistDomainType[] = []


export const todoListReducer = (state: TodolistDomainType[] = initialState, action: ActionTypes): TodolistDomainType[] => {

    switch (action.type) {
        case 'REMOVE-TODO':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODO':
            return [{...action.todoList, filter: 'all'}, ...state]
        case 'CHANGE-TODO-TITLE':
            return state.map((tl) => {
                if (tl.id === action.id) {
                    return {...tl, title: action.newTitle};
                }
                return tl;
            });
        case 'CHANGE-TODO-FILTER':
            return state.map((tl) => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.newFilter};
                }
                return tl;
            });
        case 'SET-TODO':
            return action.todo.map(tl => ({...tl, filter: 'all'}));
        default:
            return state
    }
}

export const removeTodoAC = (id: string): RemoveTodoActionType => {
    return {type: 'REMOVE-TODO', id: id} as const
}


export const addTodoAC = (todoList: TodoListType): AddTodoActionType => {
    return {type: 'ADD-TODO', todoList: todoList} as const
}

export const changeTodoTitleAC = (id: string, newTitle: string): ChangeTodoTitleActionType => {
    return {type: 'CHANGE-TODO-TITLE', id: id, newTitle: newTitle}
}

export const changeTodoFilterAC = (id: string, newFilter: FilterValueType): ChangeTodoFilterActionType => {
    return {type: 'CHANGE-TODO-FILTER', id: id, newFilter: newFilter}
}

export const setTodoAC = (todo: TodoListType[]): setTodoACType => {
    return {type: 'SET-TODO', todo: todo}
}

export const fetchTodoListsTC = (): any => (dispatch: Dispatch) => {
    todoListsAPI.getTodoLists().then(res => {
        dispatch(setTodoAC(res.data));
    });
};

export const removeTodoTC = (id: string): any => (dispatch: Dispatch) => {
    todoListsAPI.deleteTodoList(id).then(res => {
        dispatch(removeTodoAC(id))
    })

}
export const addTodoTC = (title: string): any => (dispatch: Dispatch) => {
    todoListsAPI.postTodoList(title).then(res => {
        dispatch(addTodoAC(res.data.data.item))
    })

}
export const changeTodoTitleTC = (id: string, title: string): any => (dispatch: Dispatch) => {
    todoListsAPI.putTodoList(id, title).then(res => {
        dispatch(changeTodoTitleAC(id, title))
    })
}
