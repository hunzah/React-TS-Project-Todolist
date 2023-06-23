import type {Meta, StoryObj} from '@storybook/react';
import React from 'react';
import {useSelector} from 'react-redux';

import {TaskType} from '../TodoList';
import {Task} from './Task';
import {ReduxStoreProviderDecorator} from '../../stories/ReduxStoreProviderDecorator.stories';
import {AppRootStateType} from '../../store';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta = {
    title: 'TODOLISTS/TaskRedux',
    component: Task,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const TaskReduxWrap = () => {
    const todolistID = 'todolistId1'
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistID][0])

    return <Task removeTask={()=>{}}
                 changeTaskStatus={()=>{}}
                 changeTaskTitle={()=>{}}
                 task={task} todolistId={todolistID} />
}

export const AppWithReduxStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    render: () => <TaskReduxWrap/>
}