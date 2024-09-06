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
      className={`main ${isOpen ? "opened" : ""}`}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div className="headline">
        <div className="taskContainer">
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
        <div className="buttonContainer">
          <div onClick={() => onComplete(task.id)}>
            <CheckIcon
              style={{ fontSize: "1.5rem", color: "var(--secondary)" }}
            />
          </div>
          <div
            onClick={() => onPostpone(task.id)}
            style={{ fontSize: "1.5rem", color: "var(--secondary)" }}
          >
            <SkipIcon />
          </div>
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
                    }}
                  />
                </div>
              );
            }
            return res;
          })()}
        </div>
        <div>
          <a
            href={`https://iris-villa.microcms.io/apis/task/${task.id}`}
            className="micro-cms-link"
          >
            内容を編集する(MicroCMSへ)
          </a>
        </div>
      </div>

      <style jsx>{`
        .main {
          width: 60vw;
          margin: 0 auto;
          border-radius: 10px;
          padding: 10px 5px;
          transition: all 500ms ease;
        }

        .headline {
          display: flex;
        }

        .opened {
          background: white;
        }

        .placeContainer {
          width: 1.8rem;
          text-align: center;
        }

        .taskContainer {
          width: 80%;
          margin: 10px 0;
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

        .buttonContainer {
          padding-top: 1rem;
          display: flex;
          gap: 0.5rem;
        }

        .description-container {
          overflow-y: hidden;
          transition: height 500ms ease;
          margin-left: 3rem;
          display: flex;
          flex-flow: column;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .description {
          width: 400px;
        }

        @media screen and (max-width: 600px) {
          .main {
            width: 90vw;
            margin-bottom: 30px;
          }

          .taskName {
            font-size: 1rem;
            font-weight: normal;
            width: 90%;
          }

          .spacer {
            width: 4px;
          }

          .taskContainer {
            width: 80%;
            height: 3rem;
            margin: 0;
            gap: 0.5rem;
          }

          .description {
            font-size: 0.8rem;
            line-height: 1.2rem;
            width: 80%;
          }

          .image-wrapper {
            max-height: 300px;
          }
        }
      `}</style>
    </div>
  );
};

export default TaskItem;
