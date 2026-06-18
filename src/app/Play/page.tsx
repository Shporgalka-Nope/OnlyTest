"use client";
import DMSF from "@/Features/DynamicMultiStepForm/DMSF";
import GetResultsForAttempt from "@/Features/GetResultsForAttempt/GetResultsForAttempt";
import PlayQuestion from "@/Features/PlayQuestion/PlayQuestion";
import { useGetTestStartTestQuery } from "@/state/apiAutogen";
import { useSearchParams } from "next/navigation";

export default function page() {
  const params = useSearchParams();
  const testId = params.get("testId");

  const { data } = useGetTestStartTestQuery({ testId: testId ?? undefined });

  const onFinish = () => {
    console.log("FINISHED");
  };
  return (
    <div className="d-flex flex-column">
      <DMSF onFinish={onFinish} id="test-play-form" persist>
        {data?.questions
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((q, i) => (
            <PlayQuestion
              attemptId={data.attemptId}
              displayQuestion={q}
              key={q.questionId}
              index={i + 1}
            />
          ))}
        <GetResultsForAttempt attemptId={data?.attemptId!} />
      </DMSF>
    </div>
  );
}
