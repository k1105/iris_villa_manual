import { client } from "@/libs/client";
import { useEffect, useRef, useState } from "react";
import TaskItem from "./TaskItem";
import { Note } from "./Note";
import { FinishMessage } from "./FinishMessage";

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

interface TaskListProps {
  arrivalLeaving: "arrival" | "leaving";
}

const TaskList: React.FC<TaskListProps> = ({ arrivalLeaving }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [hatFilter, setHatFilter] = useState<string | null>(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="hat-filter-container">
        <div
          onClick={() => setHatFilter(null)}
          className={`hat-filter ${hatFilter === null ? "selected" : ""}`}
        >
          <p>すべて ({getIncompleteCount(null)})</p>
        </div>
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
        }

        .hat-filter-container {
          margin: 0 auto 20px;
          width: 22rem;
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
