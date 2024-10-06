import React, { useEffect, useMemo, useState } from "react";
import { QuestionData } from "@/app/quizzer/page";
import Question from "@/components/quizzer/Question";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
function useStickyState<T>(
  defaultValue: T,
  key: string,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = React.useState<T>(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

export default function Quizzer({
  setName,
  onExit,
  data,
  loadImage,
}: {
  setName?: string;
  onExit: () => void;
  data: QuestionData[];
  loadImage: ((src: string) => Promise<string | null>) | null;
}) {
  const [questionNum, setQuestionNum] = useStickyState(
    0,
    (setName || "unknown") + "-questionNum",
  );
  const [imageStatus, setImageStatus] = useState<
    "none" | "loading" | "error" | "done"
  >();
  const [answerStatus, setAnswerStatus] = useState<
    "correct" | "incorrect" | ""
  >("");
  const [imageURL, setImageURL] = useState<string | null>();
  const [selected, setSelected] = useState<number[]>([]);
  const [showSource, setShowSource] = useState(false);
  const canSelectMultiple = useMemo(
    () =>
      data[questionNum].question.toLowerCase().includes("select all") ||
      data[questionNum].answers.filter((q) => q.correct).length != 1,
    [data, questionNum],
  );
  const [results, setResults] = useStickyState<
    {
      question: number;
      correct: boolean;
    }[]
  >([], (setName || "unknown") + "-results");
  useEffect(() => {
    setAnswerStatus("");
    setSelected([]);
    setImageURL(null);
    setImageStatus("none");
    if (data[questionNum].image && loadImage) {
      setImageStatus("loading");
      loadImage(data[questionNum].image).then((url) => {
        if (url) {
          setImageStatus("done");
          setImageURL(url);
        } else {
          setImageStatus("error");
        }
      });
    }
  }, [data, questionNum, loadImage]);
  console.log("h3142i", results);
  return (
    <div>
      <div className={"flex justify-between"}>
        {questionNum === 0 ? (
          <div />
        ) : (
          <button
            onClick={() => setQuestionNum((i) => i - 1)}
            type="button"
            className={
              "relative inline-flex items-center rounded-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-10 hover:bg-gray-50"
            }
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
        <p>
          Question {questionNum + 1} / {data.length}
          {setName && " (" + setName + ")"}.{" "}
          <a className="link" onClick={onExit}>
            Exit.
          </a>
        </p>
        <span className="isolate inline-flex rounded-md shadow-sm">
          {questionNum >= data.length - 1 ? (
            <div />
          ) : (
            <button
              onClick={() => setQuestionNum((i) => i + 1)}
              type="button"
              className={
                "relative inline-flex items-center rounded-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-10 hover:bg-gray-50"
              }
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </span>
      </div>
      <Question
        question={data[questionNum].question}
        answers={data[questionNum].answers}
        imageStatus={imageStatus}
        imageURL={imageURL}
        selected={selected}
        onSelect={(i) => {
          setAnswerStatus("");
          if (canSelectMultiple) {
            setSelected((o) =>
              o.includes(i) ? o.filter((x) => x !== i) : [...o, i],
            );
          } else {
            setSelected([i]);
          }
        }}
      />
      <div className={"flex justify-between"}>
        <div></div>
        <div>
          <button type="button" className="rounded-md px-2.5 py-1.5">
            {answerStatus === "correct" && (
              <span className={"text-green-600 mr-3"}>Correct!</span>
            )}
            {answerStatus === "incorrect" && (
              <span className={"text-red-600 mr-3"}>Incorrect!</span>
            )}
          </button>
          {answerStatus !== "correct" ? (
            <button
              onClick={() => {
                const correct = data[questionNum].answers
                  .map((x) => x.correct)
                  .every((c, i) => c === selected.includes(i));
                setAnswerStatus(correct ? "correct" : "incorrect");
                setResults((old) => [
                  ...old,
                  {
                    question: questionNum,
                    correct,
                  },
                ]);
              }}
              className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Check
            </button>
          ) : (
            <button
              onClick={() => setQuestionNum((i) => i + 1)}
              className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Next
            </button>
          )}
        </div>
      </div>

      <p className={"mt-3"}>
        Source:{" "}
        {showSource ? (
          <>
            {data[questionNum].source} (
            <a className={"link"} onClick={() => setShowSource(false)}>
              hide
            </a>
            )
          </>
        ) : (
          <>
            (
            <a className={"link"} onClick={() => setShowSource(true)}>
              show
            </a>
            )
          </>
        )}
      </p>
      <p>
        Correct: [
        {Array.from(
          new Set(results.filter((x) => x.correct).map((x) => x.question + 1)),
        )
          .sort((a, b) => a - b)
          .join(", ")}
        ]
      </p>
      <p>
        Incorrect: [
        {Array.from(
          new Set(results.filter((x) => !x.correct).map((x) => x.question + 1)),
        )
          .sort((a, b) => a - b)
          .join(", ")}
        ]
      </p>
      <p>
        {
          new Set(results.filter((x) => x.correct).map((x) => x.question + 1))
            .size
        }{" "}
        / {new Set(results.map((x) => x.question + 1)).size}
      </p>
    </div>
  );
}
