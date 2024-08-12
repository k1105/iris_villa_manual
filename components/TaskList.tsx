import { client } from "@/libs/client";
import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

interface Task {
  id: string;
  number: string;
  title: string;
  description?: string;
  hat: string[];
  floor: string;
  category: string;
}

interface TaskListProps {
  filterQuery: string;
}

const TaskList: React.FC<TaskListProps> = ({ filterQuery }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [hatFilter, setHatFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await client.get({
        endpoint: "task",
        queries: { filters: filterQuery, limit: 100 },
      });
      setTasks(data.contents);
      setLoading(false);
    };

    fetchTasks();
  }, [filterQuery]);

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
      <div>
        <a href="#" onClick={() => setHatFilter(null)}>
          すべて ({getIncompleteCount(null)})
        </a>{" "}
        |{" "}
        <a href="#" onClick={() => setHatFilter("母屋")}>
          母屋 ({getIncompleteCount("母屋")})
        </a>{" "}
        |{" "}
        <a href="#" onClick={() => setHatFilter("離れ")}>
          離れ ({getIncompleteCount("離れ")})
        </a>
      </div>
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
        <div>すべてのタスクが完了しました。</div>
      )}
    </div>
  );
};

export default TaskList;
