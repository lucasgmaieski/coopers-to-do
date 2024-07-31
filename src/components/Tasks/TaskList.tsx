"use client"

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DraggableStateSnapshot } from '@hello-pangea/dnd';
import axios from 'axios';
import Image from 'next/image';
import { Session } from 'next-auth';
import { ButtonEraseAll } from './ButtonEraseAll';

interface Task {
  id: number;
  content: string;
  done: boolean;
  order: number;
}

type Props = {
    session: Session | null
}

export function TaskList({session}: Props){
  const [tasks, setTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [newTaskContent, setNewTaskContent] = useState<string>('');
  const [transitioningTask, setTransitioningTask] = useState<number | null>(null);
  const [addingTask, setAddingTask] = useState<number | null>(null);
  const [deletingTask, setDeletingTask] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editingTaskContent, setEditingTaskContent] = useState<string>('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('/api/todos');
                if(response.data.tasks) {
                    const allTasks: Task[] = response.data.tasks;
                    setTasks(allTasks.filter(task => !task.done));
                    setDoneTasks(allTasks.filter(task => task.done));
                } else {
                    console.log(response.data.message)
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Erro ao buscar tarefas:', error.message);
                } else {
                    console.error('Erro desconhecido:', error);
                }
            }
        };
        fetchTasks();
    }, []);

    const handleDragEnd = async (result: DropResult) => {
        if (!result.destination) return;
        const reorderedTasks = [...tasks];
        const [movedTask] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, movedTask);

        const originalTasks = [...tasks];

        setTasks(reorderedTasks);
    
        try {
            await Promise.all(
                reorderedTasks.map((task, index) =>
                    axios.patch(`/api/todos/${task.id}`, { order: index + 1 })
                )
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Erro ao atualizar a ordem das tarefas:', error.message);
            } else {
                console.error('Erro desconhecido:', error);
            }
            setTasks(originalTasks);
        }
    };    

    const handleToggleDone = async (task: Task) => {
        setTransitioningTask(task.id);
    
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            
            const updatedTask = { ...task, done: !task.done };

            const resUpdatedTask = await axios.patch(`/api/todos/${task.id}`, { done: updatedTask.done });
            if(resUpdatedTask.data.status === 200) {
                if (updatedTask.done) {
                    setTasks(tasks.filter(t => t.id !== task.id));
                    setDoneTasks([...doneTasks, updatedTask]);
                    setAddingTask(task.id);
                } else {
                    setDoneTasks(doneTasks.filter(t => t.id !== task.id));
                    setTasks([...tasks, updatedTask]);
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Erro ao atualizar o status da tarefa:', error.message);
            } else {
                console.error('Erro desconhecido:', error);
            }
        } finally {
            setTransitioningTask(null);
            setTimeout(() => {
                setAddingTask(null);
            }, 700);
        }
    };    

    const handleDelete = async (id: number) => {
        setDeletingTask(id);
    
        try {
            await new Promise((resolve) => setTimeout(resolve, 450));
            const deletedTask = await axios.delete(`/api/todos/${id}`);
            if(deletedTask.data.status === 200) {
                setDoneTasks(doneTasks.filter(task => task.id !== id));
                setTasks(tasks.filter(task => task.id !== id));
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Erro ao deletar a tarefa:', error.message);
            } else {
                console.error('Erro desconhecido:', error);
            }
        } finally {
            setDeletingTask(null);
        }
    };

    const handleDeleteAll = async (done: boolean) => {
        try {
            const deletedTasks = await axios.delete(`/api/todos?done=${done}`);
            if(deletedTasks.data.status === 200) {
                done ? setDoneTasks([]) : setTasks([]);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Erro na requisição:', error.message);
            } else {
                console.error('Erro desconhecido:', error);
            }
        }
    };

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newTaskContent.trim()) {
            try {
                const response = await axios.post('/api/todos', {
                    userId: session?.user.id,
                    content: newTaskContent
                });
                if(response.data.status === 201) {
                    const newTask: Task = response.data.task;
                    setTasks([...tasks, newTask]);
                    setNewTaskContent('');
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Erro na requisição:', error.message);
                } else {
                    console.error('Erro desconhecido:', error);
                }
            }
        }
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task.id);
        setEditingTaskContent(task.content);
    };

    const handleSaveTask = async (task: Task) => {
        if (editingTaskContent.trim() && editingTaskContent !== task.content) {
            const updatedTask = { ...task, content: editingTaskContent };
            setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
            await axios.patch(`/api/todos/${task.id}`, { content: editingTaskContent });
        }
        setEditingTask(null);
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingTaskContent(e.target.value);
    };

    return (
        <div className="grid sm:grid-cols-2 gap-y-10 gap-x-5 md:gap-x-10 justify-center container max-w-4xl">
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="tasks">
                    {(provided) => (
                        <div className="relative shadow-[0_4px_60px_0_rgba(66,66,66,0.2)] before:content-[''] before:absolute before:w-full before:h-5 before:bg-themecolorsecondary before:top-0 before:left-0 px-6 pt-10 sm:pt-[60px] pb-10 text-center h-fit z-20" ref={provided.innerRef} {...provided.droppableProps}>
                            <h2 className="font-bold font-poppins text-[40px]">To-do</h2>
                            <h3 className='text-2xl'>Take a breath <br /> Start doing</h3>
                            <ul className="mt-8 transition-all">
                                {tasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                    {(provided , snapshot: DraggableStateSnapshot) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={`flex gap-3 items-center justify-between p-2 bg-white group ${transitioningTask === task.id ? 'animate-settingAsDoneHide' : ''} ${deletingTask === task.id ? 'animate-deletingTask' : ''} ${snapshot.isDragging ? 'bg-slate-100 rounded' : ''}`}    
                                        >
                                            <div 
                                                className="size-6 border-2 border-themecolorsecondary rounded-full flex items-center justify-center cursor-pointer"
                                                onClick={() => handleToggleDone(task)}
                                            >
                                                {transitioningTask === task.id &&
                                                    <Image
                                                        className="relative size-3"
                                                        src="/check.png"
                                                        alt="Image Hero"
                                                        width={12}
                                                        height={12}
                                                    />
                                                }
                                            </div>
                                            {editingTask === task.id ? (
                                                <input
                                                    type="text"
                                                    value={editingTaskContent}
                                                    onChange={handleEditInputChange}
                                                    onBlur={() => handleSaveTask(task)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleSaveTask(task);
                                                        }
                                                    }}
                                                    autoFocus
                                                    spellCheck="false"
                                                    className="text-base text-start flex-1 w-full border-b border-b-transparent focus-within:outline-none  focus-within:border-b-themecolorsecondary text-themecolorsecondary"
                                                />
                                            ) : (
                                                <span 
                                                    className="text-base text-start flex-1 border-b border-b-transparent" 
                                                    onClick={() => handleEditTask(task)}
                                                    onBlur={() => handleSaveTask(task)}
                                                >{task.content}</span>
                                            )}
                                            <button className="text-xs font-bold text-[#999999] opacity-0 group-hover:opacity-100 hover:text-red-900 transition-all" onClick={() => handleDelete(task.id)}>Delete</button>
                                        </li>
                                    )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                            <form onSubmit={handleAddTask} className="flex items-center justify-between gap-3 group p-2">
                                <div className="size-6 min-w-6 border-2 border-themecolorsecondary rounded-full flex items-center justify-center"></div>
                                <input
                                    type="text"
                                    value={newTaskContent}
                                    onChange={(e) => setNewTaskContent(e.target.value)}
                                    placeholder="Add new task..."
                                    className="text-base text-start flex-1 w-full border-b border-transparent placeholder:text-themecolorsecondary focus-within:outline-none focus-within:border-themecolorsecondary text-themecolorsecondary"
                                    required
                                />
                                <button className="opacity-0 pointer-events-none group-focus-within:pointer-events-auto group-focus-within:opacity-100 transition-opacity text-base text-white bg-themecolorsecondary px-2 py-1 rounded-md" type="submit">Add</button>
                            </form>
                            <ButtonEraseAll handleDeleteAll={() => handleDeleteAll(false)} disabled={tasks.length === 0}/>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <div className="relative shadow-[0_4px_60px_0_rgba(66,66,66,0.2)] before:content-[''] before:absolute before:w-full before:h-5 before:bg-themecolorprimary before:top-0 before:left-0 px-8 pt-10 sm:pt-[60px] pb-10 text-center h-fit">
                <h2 className='font-bold font-poppins text-[40px]'>Done</h2>
                <h3 className='text-2xl'>
                    {doneTasks.length > 0 ? 'Congratulations!' : 'Go do it!'} <br /> 
                    <span className='font-bold'>You have done {doneTasks.length > 1 ? `${doneTasks.length} tasks`: `${doneTasks.length} task`}</span>
                </h3>
                <ul className="space-y-3 mt-8">
                    {doneTasks.map((task) => (
                        <li key={task.id} className={`task-item flex gap-3 items-center justify-between group ${addingTask === task.id ? 'animate-settingAsDoneShow' : ''} ${deletingTask === task.id ? 'animate-deletingTask' : ''}`}>
                            <Image
                                className="relative size-6"
                                src="/icon-check.png"
                                alt="Image Hero"
                                width={24}
                                height={24}
                            />
                            <span className="text-base text-start flex-1">{task.content}</span>
                            <button className="text-xs font-bold text-[#999999] opacity-0 group-hover:opacity-100 hover:text-red-900 transition-all" onClick={() => handleDelete(task.id)}>Delete</button>
                        </li>
                    ))}
                    {doneTasks.length === 0 && 
                        <li className=''>Empty list</li>
                    }
                </ul>
                <ButtonEraseAll handleDeleteAll={() => handleDeleteAll(true)} disabled={doneTasks.length === 0}/>
            </div>
        </div>
    );
};

