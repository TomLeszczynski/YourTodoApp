import { useState } from "react";
import { displayErrorMessage } from "../../../utils/error.js";
import { StyledHeadDiv } from "../styles/StyledHeadDiv.jsx";
import { StyledAddButton } from "../styles/StyledAddButton.jsx";
import { StyledAddInput } from "../styles/StyledAddInput.jsx";
import iconPlus from "../../assets/icons8-plus-40.png";

export const InputTask = ({ setTaskList, numberOfTasks }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [isButtonAddTaskDisabled, setIsButtonAddTaskDisabled] = useState(true);

  const handleOpenForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };

  const handleChange = (event) => {
    setNewTask(event.target.value);

    event.target.value
      ? setIsButtonAddTaskDisabled(false)
      : setIsButtonAddTaskDisabled(true);
  };

  const handleSubmitTaskForm = (event) => {
    event.preventDefault();

    (async function addNewTask() {
      try {
        if (!newTask.length || newTask.length > 255) {
          throw new Error(
            "A task must contain at least 1 word and must not exceed 255 characters."
          );
        }
        const response = await fetch("http://127.0.0.1:3000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task: newTask,
          }),
        });
        if (!response.ok) {
          throw new Error(
            `Failed to add task "${newTask}". Please try again later.`
          );
        }
        const data = await response.json();

        setTaskList((prevState) => {
          return [
            ...prevState,
            {
              task: data.task,
              id: data.id,
              isDone: data.isDone,
            },
          ];
        });

        setNewTask("");
        setIsButtonAddTaskDisabled(true);
        setIsFormOpen((prevState) => !prevState);
      } catch (error) {
        displayErrorMessage(error);
      }
    })();
  };

  return (
    <>
      <StyledHeadDiv>
        <div>
          <h1>Your todo</h1>
          <span>{numberOfTasks} tasks</span>
        </div>
        {!isFormOpen && (
          <StyledAddButton onClick={handleOpenForm}>
            <img src={iconPlus} alt={""} />
          </StyledAddButton>
        )}
      </StyledHeadDiv>
      {isFormOpen && (
        <form onSubmit={handleSubmitTaskForm}>
          <StyledAddInput onChange={handleChange} type="text" />
          <StyledAddButton type={"submit"} disabled={isButtonAddTaskDisabled}>
            Add task
          </StyledAddButton>
        </form>
      )}
    </>
  );
};
