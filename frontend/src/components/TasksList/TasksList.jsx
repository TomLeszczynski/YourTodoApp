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
    (async function deleteTask() {
      try {
        await fetch(`http://127.0.0.1:3000/tasks/${id}`, {
          method: "DELETE",
        });

        const filteredList = taskList.filter((task) => task.id !== id);

        setTaskList(() => {
          return [...filteredList];
        });
      } catch {
        throw new Error("Delete action has failed");
      }
    })();
  };

  const handleDoneClickButton = (id) => {
    (async function changeStatusOfTask() {
      try {
        const result = await fetch(`http://127.0.0.1:3000/tasks/${id}/isDone`, {
          method: "PATCH",
        });
        const data = await result.json();

        setTaskList(
          taskList.map((task) => {
            if (task.id === id) {
              return data;
            }
            return task;
          })
        );
      } catch {
        throw new Error("Patch action to change status has failed");
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

  const handleSaveBlur = (id) => {
    (async function updateTask() {
      try {
        const result = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task: currentInput,
          }),
        });
        const data = await result.json();

        setTaskList(
          taskList.map((task) => {
            if (task.id === id) {
              return data;
            }
            return task;
          })
        );

        setEditingTaskId(null);
      } catch {
        setEditingTaskId(null);
        throw new Error("Patch action has failed");
      }
    })();
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
