import { CheckIcon } from "./icons/CheckIcon";
import { useState, useEffect, useRef } from "react";
import { FilledCheckIcon } from "./icons/FilledCheckIcon";

type Props = {
  task: Task;
  onRestore: (taskId: string) => void;
};

const CompletedTaskItem = ({ task, onRestore }: Props) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isChecked, setIsChecked] = useState<Boolean>(false);
  const [contentHeight, setContentHeight] = useState(0);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && descriptionRef.current) {
      setContentHeight(descriptionRef.current.scrollHeight);
      console.log(task.id);
    } else {
      setContentHeight(0);
    }
  }, [isOpen, task]);

  return (
    <div
      className={`main ${isOpen ? "opened" : ""} ${isChecked ? "checked" : ""}`}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div className="headline">
        <div className="task-container">
          <p className="list-index-container">
            <FilledCheckIcon style={{ width: "2.05rem", height: "2.05rem" }} />
          </p>
          <h2 className="taskName">{task.title}</h2>
        </div>
      </div>
      <div
        className="description-container"
        ref={descriptionRef}
        style={{ height: isOpen ? `${contentHeight}px` : "0px" }}
      >
        <div className="button-container">
          <div className="option-button-wrapper bg-secondary">
            <div
              onClick={() => {
                setIsChecked(true);
                setTimeout(() => {
                  onRestore(task.id);
                }, 400);
              }}
              className="option-button"
            >
              <p>完了前にもどす</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .main {
          width: 60vw;
          overflow-y: hidden;
          margin: 0 auto 1rem;
          border-radius: 5px;
          transition: all 500ms ease;
        }

        .headline {
          display: flex;
          color: #333;
        }

        .opened {
          background: white;
          .task-container {
            margin: 3rem auto;
          }
        }

        .checked {
          height: 0%;
          padding: 0 5px;
        }

        .list-index-container {
          width: 1.8rem;
          height: 1.8rem;
          line-height: 1.45rem;
          color: var(--primary);
          text-align: center;
        }

        .task-container {
          width: 80%;
          margin: 0 auto;
          height: 3rem;
          line-height: 1.5rem;
          display: flex;
          gap: 1rem;
          transition: all 0.5s ease;
        }

        .image-wrapper {
          position: relative;
          height: 500px;
          width: 100%;
          margin-bottom: 1rem;
        }

        .bg-primary {
          background-color: var(--primary);
        }

        .bg-secondary {
          background-color: var(--secondary);
        }

        .taskName {
          font-size: 1.2rem;
          font-weight: normal;
          width: 80%;
          color: rgb(0 0 0 /0.3);
        }

        .button-container {
          padding-top: 0;
          display: flex;
          gap: 0.5rem;
        }

        .option-button-wrapper {
          width: 100%;
          border-radius: 1.5rem;
          font-weight: bold;
          color: white;
        }

        .option-button {
          margin: 0 auto;
          width: 10rem;
          display: flex;
          justify-content: center;
          height: 3rem;
          line-height: 3rem;
          gap: 0.5rem;
          color: black;
        }

        .description-container {
          overflow-y: hidden;
          transition: height 500ms ease;
          // margin-left: 3rem;
          display: flex;
          flex-flow: column;
          gap: 2rem;
          width: 80%;
          margin: 0 auto 2rem;
        }

        @media screen and (max-width: 600px) {
          .main {
            width: 95vw;
            margin-bottom: 10px;
          }

          .taskName {
            font-size: 1rem;
            font-weight: normal;
            width: 90%;
          }

          .spacer {
            width: 4px;
          }

          .task-container {
            width: 80vw;
            height: 3rem;
            margin: 0 auto;
            gap: 0.5rem;
          }

          .description-container {
            margin: 0 auto 1rem;
            width: 80vw;
            gap: 1rem;
          }

          .description {
            font-size: 0.8rem;
            line-height: 1.2rem;
            width: 90%;
          }

          .image-wrapper {
            width: 80vw;
            max-height: 250px;
          }

          .opened {
            .task-container {
              margin: 1rem auto;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default CompletedTaskItem;
