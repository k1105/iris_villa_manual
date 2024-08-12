// pages/leaving/index.tsx
import TaskList from "@/components/TaskList";
import { NextPage } from "next";

const Leaving: NextPage = () => {
  return (
    <>
      <h1>下山手順</h1>
      <TaskList filterQuery="arrival-leaving[contains]leaving" />
    </>
  );
};

export default Leaving;
