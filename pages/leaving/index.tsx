// pages/leaving/index.tsx
import TaskList from "@/components/TaskList";
import { NextPage } from "next";
import Layout from "../layout";

const Leaving: NextPage = () => {
  return (
    <>
      <Layout header="下山手順">
        <TaskList arrivalLeaving="leaving" />
      </Layout>
    </>
  );
};

export default Leaving;
