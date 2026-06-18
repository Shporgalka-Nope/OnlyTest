"use client";
import CreateQuestion from "@/Features/CreateTestSequence/CreateQuestionForm/CreateQuestion";
import TestForm from "@/Features/CreateTestSequence/CreateTestForm/TestForm";
import DMSF from "@/Features/DynamicMultiStepForm/DMSF";
import { useAppSelector } from "@/state/useStoreHooks";
import NavigationBar from "./UI/NavigationBar";
import PublishTest from "@/Features/CreateTestSequence/PublishTest/PublishTest";

export default function Home() {
  const questionsList = useAppSelector((state) => {
    const unsortedQuestions = state.session.testForm!.questions;
    if (!unsortedQuestions) return [];

    return [...unsortedQuestions].sort((a, b) => a.order - b.order);
  });

  const OnFinish = () => {
    console.log("FINISHED");
  };
  return (
    <div className="d-flex flex-column">
      <NavigationBar dmsfId="test-create-form" steps={questionsList} />
      <DMSF onFinish={OnFinish} id="test-create-form" persist>
        <TestForm />
        {questionsList?.map((q) => (
          <CreateQuestion key={q.id} question={q} />
        ))}
        <CreateQuestion />
        <PublishTest />
      </DMSF>
    </div>
  );
}
