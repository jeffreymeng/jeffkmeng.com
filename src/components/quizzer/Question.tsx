import { QuestionData } from "@/app/quizzer/page";
import sanitizeHtml from "sanitize-html";
import cx from "classnames";
import React from "react";

export default function Question({
  imageURL,
  question,
  answers,
  imageStatus,
  selected,
  onSelect,
}: {
  imageURL?: string | null;
  imageStatus?: "none" | "loading" | "error" | "done";
  question: string;
  answers: QuestionData["answers"];
  selected: number[];
  onSelect: (i: number) => void;
}) {
  return (
    <>
      <div
        className={"question text-md"}
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(question),
        }}
      />
      {imageURL ? (
        <img className={"max-h-[50vh]"} src={imageURL} />
      ) : imageStatus == "loading" ? (
        <p>Loading image...</p>
      ) : imageStatus == "error" ? (
        <p>Unable to locate image</p>
      ) : null}
      <div className={"answer"}>
        {answers.map(({ content }, i) => (
          <button
            key={i}
            className={cx(
              "text-left w-full border-2 hover:border-blue-300 active:border-blue-500 rounded-md py-2 px-4 my-2 cursor-pointer",
              selected.includes(i) &&
                "border-2 border-blue-500 hover:border-blue-500"
            )}
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(content),
            }}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>
    </>
  );
}
