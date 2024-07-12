import { useState, useRef, useEffect } from "react";
import { displayErrorMessage } from "../../../utils/error.js";
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

  const handleDoneClickButton = (id) => {
    (async function changeStatusOfTask() {
      try {
        const response = await fetch(
          `http://127.0.0.1:3000/tasks/${id}/isDone`,
          {
            method: "PATCH",
          }
        );
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to change task status");
        }
        const data = await response.json();

        setTaskList(
          taskList.map((task) => {
            if (task.id === id) {
              return data;
            }
            return task;
          })
        );
      } catch (error) {
        displayErrorMessage(error);
      }
    })();
  };

  const handleSaveBlur = (id) => {
    (async function updateTask() {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task: currentInput,
          }),
        });
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to change task content");
        }
        const data = await response.json();

        setTaskList(
          taskList.map((task) => {
            if (task.id === id) {
              return data;
            }
            return task;
          })
        );

        setEditingTaskId(null);
      } catch (error) {
        setEditingTaskId(null);
        displayErrorMessage(error);
      }
    })();
  };

  const handleDeleteClickButton = (id) => {
    (async function deleteTask() {
      try {
        const response = await fetch(`http://127.0.0.1:3000/tasks/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to remove task");
        }

        const filteredList = taskList.filter((task) => task.id !== id);

        setTaskList(() => {
          return [...filteredList];
        });
      } catch (error) {
        displayErrorMessage(error);
      }
    })();
  };

  const handleEditClickButton = (id, currentTask) => {
    setEditingTaskId(id);
    setCurrentInput(currentTask);
  };

  const handleInputChange = (event) => {
    setCurrentInput(event.target.value);
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
