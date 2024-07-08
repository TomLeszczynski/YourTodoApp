import { useState, useEffect } from "react";
import { StyledMainDiv } from "../styles/StyledMainDiv.jsx";
import { InputTask } from "../InputTask/InputTask.jsx";
import { TasksList } from "../TasksList/TasksList.jsx";

export const ToDoList = () => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    (async function getTasksList() {
      try {
        const res = await fetch("http://127.0.0.1:3000");
        const data = await res.json();
        setTaskList(data);
      } catch (error) {
        throw new Error("Data fetch has failed");
      }
    })();
  }, []);

  let numberOfTasks = taskList.length;

  return (
    <StyledMainDiv>
      <InputTask
        setTaskList={setTaskList}
        numberOfTasks={numberOfTasks}
      ></InputTask>
      <TasksList setTaskList={setTaskList} taskList={taskList}></TasksList>
    </StyledMainDiv>
  );
};
