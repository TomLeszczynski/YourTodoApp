import { useState, useRef, useEffect } from "react";
import { StyledLi } from "../styles/StyledLi.jsx";
import { StyledListButton } from "../styles/StyledListButton.jsx";
import { StyledUl } from "../styles/StyledUl.jsx";
import { StyledListP } from "../styles/StyledListP.jsx";
import { StyledEditInput } from "../styles/StyledEditInput.jsx";

export const TasksList = ({ taskList, setTaskList }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [currentInput, setCurrentInput] = useState("");
  const EditInputRef = useRef(null);

  useEffect(() => {
    if (editingTaskId !== null) {
      EditInputRef.current.focus();
    }
  }, [editingTaskId]);

  const handleDeleteClickButton = (id) => {
    const filteredList = taskList.filter((task) => task.id !== id);

    setTaskList(() => {
      return [...filteredList];
    });
  };

  const handleDoneClickButton = (id) => {
    setTaskList(
      taskList.map((task) => {
        if (task.id === id) {
          return { ...task, isDone: true };
        }
        return task;
      })
    );
  };

  const handleEditClickButton = (id, currentTask) => {
    setEditingTaskId(id);
    setCurrentInput(currentTask);
  };

  const handleInputChange = (event) => {
    setCurrentInput(event.target.value);
  };

  const handleSaveBlur = (id) => {
    setTaskList(
      taskList.map((taskItem) => {
        if (taskItem.id === id) {
          return { ...taskItem, task: currentInput };
        }
        return { ...taskItem };
      })
    );

    setEditingTaskId(null);
  };

  return (
    <StyledUl>
      {taskList.map(({ task, id, isDone }) => {
        return (
          <>
            <StyledLi key={id}>
              {editingTaskId === id ? (
                <StyledEditInput
                  type="text"
                  value={currentInput}
                  onChange={handleInputChange}
                  onBlur={() => handleSaveBlur(id)}
                  ref={EditInputRef}
                />
              ) : (
                <StyledListP
                  style={isDone ? { textDecoration: "line-through" } : {}}
                >
                  {task}
                </StyledListP>
              )}
              <div>
                {!isDone && (
                  <StyledListButton
                    $backgroundColor={"#29ce1a"}
                    $borderColor={"#29ce1a"}
                    onClick={() => handleEditClickButton(id, task)}
                  >
                    Edit
                  </StyledListButton>
                )}
                {!isDone && (
                  <StyledListButton
                    $backgroundColor={"#e0f719"}
                    $borderColor={"#e0f719"}
                    onClick={() => handleDoneClickButton(id)}
                  >
                    Done
                  </StyledListButton>
                )}
                <StyledListButton
                  $backgroundColor={"#af0808"}
                  $borderColor={"#af0808"}
                  onClick={() => handleDeleteClickButton(id)}
                >
                  Delete
                </StyledListButton>
              </div>
            </StyledLi>
          </>
        );
      })}
    </StyledUl>
  );
};
