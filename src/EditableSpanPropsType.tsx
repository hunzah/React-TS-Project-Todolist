import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type EditableSpanPropsType = {
    title: string
    onChangeTitleHandler: (newValue: string)=> void
}

export function EditableSpan(props:EditableSpanPropsType) {
    const [editeMode, setEditeMode] = useState<boolean>(false)
    const [title,setTitle] = useState ('')

    const activateEditeMode=()=> {
        setEditeMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditeMode(false)
        props.onChangeTitleHandler(title)
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && activateViewMode();
    };

    return editeMode? <input
        value={title}
        onChange={onChangeHandler}
        onBlur={activateViewMode}
        onKeyDown={onKeyDownHandler}
        />
        : <span onDoubleClick={activateEditeMode}>{props.title}</span>
}
