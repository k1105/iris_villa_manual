// components/TaskItem.tsx
import { useEffect, useRef, useState } from "react";
import { SkipIcon } from "./icons/SkipIcon";
import { CheckIcon } from "./icons/CheckIcon";
import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ weight: "400", subsets: ["latin"] });

interface TaskItemProps {
  task: Task;
  listIndex: number;
  onComplete: (taskId: string) => void;
  onPostpone: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  listIndex,
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
          <p className="list-index-container">{listIndex}</p>
          <h2 className="taskName">{task.title}</h2>
        </div>
      </div>
      <div
        className="description-container"
        ref={descriptionRef}
        style={{ height: isOpen ? `${contentHeight}px` : "0px" }}
      >
        <div className="place-container">
          <p className="place-icon">場所</p>
          <p className="place-name">
            {task.hat} {task.floor}
          </p>
        </div>
        <div className={`description ${inter.className}`}>
          {task.description}
        </div>
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
          <div className="option-button-wrapper bg-primary">
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
          <div className="option-button-wrapper bg-secondary">
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
            <p className={`micro-cms-link ${inter.className}`}>
              内容を編集する(MicroCMSへ)
            </p>
          </a>
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
            margin: 3rem auto 0;
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
          border-radius: 0.9rem;
          color: var(--primary);
          border: 2px solid var(--primary);
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
          width: 5rem;
          display: flex;
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

        .place-container {
          display: flex;
          gap: 0.5rem;
        }

        .place-icon {
          display: block;
          width: 3rem;
          height: 1.2rem;
          line-height: 1.2rem;
          text-align: center;
          background-color: var(--primary);
          color: white;
          border-radius: 0.75rem;
          font-size: 0.7rem;
        }

        .place-name {
          font-size: 0.8rem;
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
              margin: 1rem auto 0;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default TaskItem;
