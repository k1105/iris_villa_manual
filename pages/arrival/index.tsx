// pages/arrival/index.tsx
import TaskList from "@/components/TaskList";
import { NextPage } from "next";
import Layout from "../layout";

const Arrival: NextPage = () => {
  return (
    <>
      <Layout header="入山手順">
        <TaskList arrivalLeaving="arrival" />
      </Layout>
    </>
  );
};

export default Arrival;
