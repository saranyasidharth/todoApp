import { useCallback, useMemo, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import ListTask from "../ListTask";
import styles from './index.module.css'

export type TodoListType = { task: string; isCompleted: boolean }
export default function AddTodoTask() {

  const [title, setTitle] = useState<string>("");
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [viewTask, setViewTask] = useState(0);

  const todo: TodoListType[] = useMemo(() => {
    if (localStorage.getItem('todo') !== null) {
      return JSON.parse(localStorage.getItem('todo') ?? "");
    }
  }, [refreshList]);

  const handleAdd = () => {
    if (!todo || !todo.some(task => task.task === title)) {
      localStorage.setItem(
        "todo",
        JSON.stringify([...(todo ? todo : []), { task: title, isCompleted: false }])
      );
      setRefreshList((v) => !v)
        ;
    }
  };


  const handleClear = useCallback(() => {
    localStorage.clear();
    setRefreshList((v) => !v);
  }, []);

  return (
    <>
      <h1>Todo App</h1>
      <div className={styles.addTask}>
        <TextField
          id="filled-basic"
          label="Add new task"
          variant="filled"
          onChange={(event) => setTitle(event.target.value)}
        />
        <Button variant="contained" onClick={() => handleAdd()}>
          Add
        </Button>
        <Button variant="contained" onClick={() => handleClear()}>
          Clear
        </Button>
      </div>

      <div className={styles.listTaskButton}>
        <Button variant="contained" onClick={() => setViewTask(0)} className={viewTask === 0 ? styles.activeButton : ""}>
          All Tasks
        </Button>
        <Button variant="contained" onClick={() => setViewTask(1)} className={viewTask === 1 ? styles.activeButton : ""}>
          Completed Tasks
        </Button>
        <Button variant="contained" onClick={() => setViewTask(2)} className={viewTask === 2 ? styles.activeButton : ""}>
          Pending Tasks
        </Button>
      </div>

      <ListTask setRefreshList={setRefreshList} viewTask={viewTask} todoList={todo} />
    </>
  );
}
