import { client } from "@/libs/client";
import { useEffect, useRef, useState } from "react";
import TaskItem from "./TaskItem";
import { Note } from "./Note";
import { FinishMessage } from "./FinishMessage";

interface TaskListProps {
  arrivalLeaving: "arrival" | "leaving";
}

const TaskList: React.FC<TaskListProps> = ({ arrivalLeaving }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [hatFilter, setHatFilter] = useState<string>("母屋");
  const [initialTaskCounts, setInitialTaskCounts] = useState<{
    hanare: number;
    omoya: number;
  }>({ hanare: 0, omoya: 0 });

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await client.get({
        endpoint: "task",
        queries: {
          filters: `arrival-leaving[contains]${arrivalLeaving}`,
          limit: 100,
        },
      });
      setTasks(data.contents);

      // 各カテゴリごとの初期タスク数を設定
      const hatOmoyaCount = data.contents.filter(
        (task: Task) => task.hat[0] === "母屋"
      ).length;
      const hatHanareCount = data.contents.filter(
        (task: Task) => task.hat[0] === "離れ"
      ).length;

      setInitialTaskCounts({
        omoya: hatOmoyaCount,
        hanare: hatHanareCount,
      });
      setLoading(false);
    };

    fetchTasks();
  }, [arrivalLeaving]);

  useEffect(() => {
    if (hatFilter) {
      setFilteredTasks(tasks.filter((task) => task.hat[0] === hatFilter));
    } else {
      setFilteredTasks(tasks);
    }
  }, [hatFilter, tasks]);

  const handleComplete = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handlePostpone = (taskId: string) => {
    const postponedTask = tasks.find((task) => task.id === taskId);
    if (postponedTask) {
      setTasks(
        tasks.filter((task) => task.id !== taskId).concat(postponedTask)
      );
    }
  };

  const getIncompleteCount = (hat: string | null) => {
    if (hat === null) {
      return tasks.length;
    }
    return tasks.filter((task) => task.hat[0] === hat).length;
  };

  const getProgressBarWidth = () => {
    const totalTasksForCurrentHat =
      hatFilter === "離れ"
        ? initialTaskCounts["hanare"]
        : initialTaskCounts["omoya"]; // 現在のカテゴリに応じた初期タスク数

    return (
      (innerWidth * (totalTasksForCurrentHat - filteredTasks.length)) /
      totalTasksForCurrentHat
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        className="progress-bar"
        style={{
          width: `${getProgressBarWidth()}px`,
        }}
      ></div>
      <div className="hat-filter-container">
        <div
          onClick={() => setHatFilter("母屋")}
          className={`hat-filter ${hatFilter === "母屋" ? "selected" : ""}`}
        >
          母屋 ({getIncompleteCount("母屋")})
        </div>
        <div
          onClick={() => setHatFilter("離れ")}
          className={`hat-filter ${hatFilter === "離れ" ? "selected" : ""}`}
        >
          離れ ({getIncompleteCount("離れ")})
        </div>
      </div>
      <div className="container">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onComplete={handleComplete}
              onPostpone={handlePostpone}
            />
          ))
        ) : (
          <FinishMessage arrivalLeaving={arrivalLeaving} />
        )}
      </div>
      <Note />

      <style jsx>{`
        .container {
          min-height: 55vh;
          transition: all 500ms ease;
        }

        .progress-bar {
          position: fixed;
          z-index: 99;
          top: 0;
          left: 0;
          height: 0.5rem;
          background-color: var(--primary);
          transition: all 0.5s ease;
        }

        .hat-filter-container {
          margin: 0 auto 20px;
          width: 15rem;
          display: flex;
          align-item: center;
          justify-content: space-between;
        }

        .hat-filter {
          height: 2rem;
          width: 7rem;
          line-height: 2rem;
          text-align: center;
          border-radius: 1rem;
          transition: all 0.5s ease;
        }

        .selected {
          background-color: rgb(0 0 0 /0.1);
        }

        @media screen and (max-width: 600px) {
        }
      `}</style>
    </div>
  );
};

export default TaskList;
