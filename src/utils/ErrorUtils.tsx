import {SetErrorAC, SetErrorACType, SetStatusAC, SetStatusACType} from '../AppWithRedux/app.reducer';
import {ResponseType} from '../api/todolistsAPI';
import {Dispatch} from 'redux';

export const handleServerAppError = (res: ResponseType<any>, dispatch: Dispatch<SetErrorACType | SetStatusACType>) => {
    if (res.data.messages.length) {
        dispatch(SetErrorAC(res.data.messages[0]))
    } else {
        dispatch(SetErrorAC('aaaaaaaaaa'))
    }
    dispatch(SetStatusAC('failed'))
}
export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<SetErrorACType | SetStatusACType>) => {
    dispatch(SetErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(SetStatusAC('failed'))
}

