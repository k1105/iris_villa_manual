// components/TaskItem.tsx
import { useEffect, useRef, useState } from "react";
import { SkipIcon } from "./icons/SkipIcon";
import { CheckIcon } from "./icons/CheckIcon";
import Image from "next/image";

interface Task {
  id: string;
  number: string;
  title: string;
  description?: string;
  hat: string[];
  floor: string;
  category: string;
  image: { url: string; height: number; width: number }[];
}

interface TaskItemProps {
  task: Task;
  onComplete: (taskId: string) => void;
  onPostpone: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onComplete,
  onPostpone,
}) => {
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
          <div className="placeContainer">
            <p style={{ fontSize: "0.8rem" }}>{task.hat}</p>
            <p style={{ fontSize: "1.0rem", fontWeight: "600" }}>
              {task.floor}
            </p>
          </div>
          <div
            className={`spacer ${
              task.hat[0] === "母屋" ? "bg-primary" : "bg-secondary"
            }`}
          ></div>
          <h2 className="taskName">{task.title}</h2>
          {/* <p>{task.description}</p> */}
          {/* あれば画像を表示 */}
        </div>
      </div>
      <div
        className="description-container"
        ref={descriptionRef}
        style={{ height: isOpen ? `${contentHeight}px` : "0px" }}
      >
        <div className="description">{task.description}</div>
        <div className="images">
          {(() => {
            const res = [];
            for (const image of task.image) {
              res.push(
                <div className="image-wrapper">
                  <Image
                    src={image.url}
                    alt={`${task.title}の説明画像`}
                    fill
                    priority
                    style={{
                      objectFit: "contain", // or cover
                      textAlign: "center",
                    }}
                  />
                </div>
              );
            }
            return res;
          })()}
        </div>
        <div className="button-container">
          <div className="option-button-wrapper">
            <div
              onClick={() => {
                setIsChecked(true);
                setTimeout(() => {
                  onComplete(task.id);
                }, 400);
              }}
              className="option-button"
            >
              <CheckIcon style={{ fontSize: "1.5rem", marginTop: "0.75rem" }} />
              <p>完了</p>
            </div>
          </div>
          <div className="option-button-wrapper">
            <div onClick={() => onPostpone(task.id)} className="option-button">
              <SkipIcon
                style={{
                  fontSize: "1.5rem",
                  marginTop: "0.75rem",
                }}
              />
              <p>あとで</p>
            </div>
          </div>
        </div>
        <div>
          <a
            href={`https://iris-villa.microcms.io/apis/task/${task.id}`}
            style={{ textDecoration: "none" }}
          >
            <p className="micro-cms-link">内容を編集する(MicroCMSへ)</p>
          </a>
        </div>
      </div>

      <style jsx>{`
        .main {
          width: 60vw;
          overflow-y: hidden;
          margin: 0 auto;
          border-radius: 5px;
          padding: 10px 5px;
          transition: all 500ms ease;
        }

        .headline {
          display: flex;
        }

        .opened {
          background: white;
        }

        .checked {
          height: 0%;
          padding: 0 5px;
        }

        .placeContainer {
          width: 1.8rem;
          text-align: center;
        }

        .task-container {
          width: 80%;
          margin: 10px 20px;
          height: 60px;
          display: flex;
          gap: 1rem;
        }

        .image-wrapper {
          position: relative;
          height: 500px;
          width: 100%;
          margin-bottom: 1rem;
        }

        .spacer {
          height: 100%;
          width: 5px;
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
        }

        .button-container {
          padding-top: 0;
          display: flex;
          gap: 0.5rem;
        }

        .option-button-wrapper {
          border: 1px solid var(--secondary);
          width: 100%;
          border-radius: 1.5rem;
        }

        .option-button {
          margin: 0 auto;
          width: 5rem;
          display: flex;
          height: 3rem;
          line-height: 3rem;
          gap: 0.5rem;
          color: var(--secondary);
        }

        .description-container {
          overflow-y: hidden;
          transition: height 500ms ease;
          // margin-left: 3rem;
          display: flex;
          flex-flow: column;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .description {
          width: 400px;
        }

        .micro-cms-link {
          color: var(--secondary);
          font-size: 0.8rem;
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
            width: 80%;
            height: 3rem;
            margin: 0 5px 1rem;
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
        }
      `}</style>
    </div>
  );
};

export default TaskItem;
