import { useState, useEffect } from "react";
import { StyledMainDiv } from "../styles/StyledMainDiv.jsx";
import { InputTask } from "../InputTask/InputTask.jsx";
import { TasksList } from "../TasksList/TasksList.jsx";

export const ToDoList = () => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {

    fetch("http://127.0.0.1:3000/tasks")
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }
        return response.json();
      })
      .then((data) => setTaskList(data))
      .catch((error) => {
        if (error.name === "TypeError") {
          return alert(
            "Sorry, Server not responding right now. Please try again later."
          );
        } else {
          return alert(error.message);
        }
      });
      
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
