// pages/arrival/index.tsx
import TaskList from "@/components/TaskList";
import { NextPage } from "next";

const Arrival: NextPage = () => {
  return (
    <>
      <h1>入山手順</h1>
      <TaskList filterQuery="arrival-leaving[contains]arrival" />
    </>
  );
};

export default Arrival;
