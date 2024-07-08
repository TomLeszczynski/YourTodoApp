import { useState } from "react";
import { StyledHeadDiv } from "../styles/StyledHeadDiv.jsx";
import { StyledAddButton } from "../styles/StyledAddButton.jsx";
import { StyledAddInput } from "../styles/StyledAddInput.jsx";
import iconPlus from "../../assets/icons8-plus-40.png";

export const InputTask = ({ setTaskList, numberOfTasks }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newTask, setNewTask] = useState(null);
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

  const handleAddTaskForm = (event) => {
    event.preventDefault();

    (async function addNewTask() {
      try {
        const result = await fetch("http://127.0.0.1:3000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task: newTask,
          }),
        });
        const data = await result.json();

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
        throw new Error("Post action has failed");
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
        <form>
          <StyledAddInput onChange={handleChange} type="text" />
          <StyledAddButton
            onClick={handleAddTaskForm}
            disabled={isButtonAddTaskDisabled}
          >
            Add task
          </StyledAddButton>
        </form>
      )}
    </>
  );
};
