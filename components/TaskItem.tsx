// components/TaskItem.tsx
import React from "react";

interface Task {
  id: string;
  number: string;
  title: string;
  description?: string;
  hat: string[];
  floor: string;
  category: string;
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
  return (
    <div className="main">
      <div className="taskContainer">
        <p>
          {task.hat} {task.floor} | {task.category}
        </p>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        {/* あれば画像を表示 */}
      </div>
      <div className="buttonContainer">
        <button onClick={() => onComplete(task.id)}>完了</button>
        <button onClick={() => onPostpone(task.id)}>あとでにする</button>
      </div>
      <style jsx>{`
        .main {
          display: flex;
          width: 60vw;
          margin: 0 auto;
          justify-content: space-between;
        }
        .taskContainer {
          width: 40vw;
          margin: 10px 0;
          height: 200px;
        }

        @media screen and (max-width: 600px) {
          .main {
            width: 95vw;
            margin-bottom: 30px;
          }

          .taskContainer {
            width: 60%;
            height: 100%;
            margin: 0;
            h2 {
              font-size: 1rem;
              margin-bottom: 0.6rem;
            }
            p {
              font-size: 0.9rem;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default TaskItem;
