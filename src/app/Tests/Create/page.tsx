"use client";
import CreateTestForm from "@/Features/CreateTestSequence/CreateTestForm/CreateTestForm";
import DMSF from "@/Features/DynamicMultiStepForm/DMSF";

export default function Home() {
  const OnFinish = () => {
    console.log("FINISHED");
  };
  return (
    <DMSF onFinish={OnFinish}>
      <CreateTestForm />
    </DMSF>
  );
}
