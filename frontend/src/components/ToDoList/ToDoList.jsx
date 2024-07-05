import { useState } from "react";
import { StyledMainDiv } from "../styles/StyledMainDiv.jsx";
import { InputTask } from "../InputTask/InputTask.jsx";
import { TaskList } from "../TasksList/TaskList.jsx";

const tasksListData = [
  {
    task: "Zjeść kokosanke",
    id: "bsib4ihbs",
    isDone: false,
  },
  {
    task: "Zrobić wino",
    id: "dfhgib345",
    isDone: false,
  },
  {
    task: "Kupić kapary",
    id: "zfjfhgu8hug43",
    isDone: false,
  },
  {
    task: "Napić się ginu",
    id: "ghbuhwergty485",
    isDone: false,
  },
];

export const ToDoList = () => {
  const [taskList, setTaskList] = useState(tasksListData);

  let numberOfTasks = taskList.length;

  return (
    <StyledMainDiv>
      <InputTask
        setTaskList={setTaskList}
        numberOfTasks={numberOfTasks}
      ></InputTask>
      <TaskList setTaskList={setTaskList} taskList={taskList}></TaskList>
    </StyledMainDiv>
  );
};
