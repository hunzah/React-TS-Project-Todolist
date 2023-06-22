import {ChangeEvent, KeyboardEvent, useState} from 'react';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const useAddItemForm = (props:AddItemFormPropsType) => {

    const [newItemTitle, setNewItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItemTitle(e.currentTarget.value)
    }


    const isAddTaskNotPossible = newItemTitle.length === 0 || newItemTitle.trim().length > 20
    const onKeyPressHandler =
        isAddTaskNotPossible ? undefined
            : (e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                    if (newItemTitle.trim() === '') {
                        setError('Title is required')
                    } else {
                        props.addItem(newItemTitle.trim())
                        setNewItemTitle('')
                        setError(null)
                    }
                }
            }


    const onClickHandler = () => {
        if (newItemTitle.trim() === '') {
            setError('Title is required')
        } else {
            props.addItem(newItemTitle.trim())
            setNewItemTitle('')
        }
    }
    return({
        newItemTitle,
        error,
        onNewTitleChangeHandler,
        onKeyPressHandler,
        onClickHandler,
        isAddTaskNotPossible
    })
}
