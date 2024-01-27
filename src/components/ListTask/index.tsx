import { Box, Button, Checkbox, Modal, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import styles from "./index.module.css";
import { TodoListType } from "../AddTodoTask";
import { useState } from "react";

export type ListTaskPropsType = {
    todoList: TodoListType[];
    setRefreshList: React.Dispatch<React.SetStateAction<boolean>>;
    viewTask: number;
};

export default function ListTask({
    viewTask,
    setRefreshList,
    todoList,
}: ListTaskPropsType) {

    const [openIndex, setOpenIndex] = useState<number|null>(null);
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleCheckBox = (index: number) => {
        const updatedTodoList = todoList?.map((task, i) =>
            i === index ? { ...task, isCompleted: !task.isCompleted } : task
        );
        setRefreshList((v: boolean) => !v);
        localStorage.setItem("todo", JSON.stringify(updatedTodoList));
    };

    const handleDelete = (index: number) => {
        const updatedTodoList = todoList.filter((task, i) => i !== index);
        localStorage.setItem("todo", JSON.stringify(updatedTodoList));
        setRefreshList((v: boolean) => !v);
        setOpenIndex(null);

    };


    return (
        <div className={styles.listSection}>
            {todoList?.map(
                (task, index) =>
                    (viewTask === 1
                        ? task.isCompleted
                        : viewTask === 2
                            ? !task.isCompleted
                            : true) && (
                        <div key={index} className={styles.listTask}>
                            <div style={{ display: "flex" }}>
                                <Checkbox
                                    checked={task.isCompleted}
                                    onChange={() => handleCheckBox(index)}
                                    inputProps={{ "aria-label": "controlled" }}
                                />
                                <h2>{task.task}</h2>
                            </div>
                            <DeleteOutlineIcon
                                onClick={() => setOpenIndex(index)}
                                className={styles.deleteIcon}
                            />
                            <Modal
                                open={openIndex === index}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style} >
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Are you sure you want to delete this task?
                                    </Typography>

                                    <Button variant="contained" onClick={() => handleDelete(index)} sx={{mr:2,mt:2}}>
                                        Delete
                                    </Button>
                                    <Button variant="contained" onClick={() => setOpenIndex(null)} sx={{mr:2,mt:2}} >
                                        Cancel
                                    </Button>

                                </Box>
                            </Modal>
                        </div>
                    )
            )}
        </div>
    );
}
