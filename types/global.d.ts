interface Task {
  id: string;
  title: string;
  description?: string;
  hat: string[];
  floor: string;
  category: string;
  image: { url: string; height: number; width: number }[];
  completed: boolean;
}
