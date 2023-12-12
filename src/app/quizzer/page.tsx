"use client";
import cx from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import ReactGA from "react-ga4";
import Table from "@/components/table";
ReactGA.initialize("G-SGD74WQ9M0");
import {
  BlobReader,
  BlobWriter,
  Data64URIWriter,
  TextWriter,
  ZipReader,
} from "@zip.js/zip.js";
import sanitizeHtml from "sanitize-html";
import Quizzer from "@/components/quizzer/Quizzer";
import seededShuffle from "@/utils/seededShuffle";
export type QuestionData = {
  question: string;
  source?: string;
  image: string;
  answers: {
    content: string;
    correct: boolean;
  }[];
};

export default function Main() {
  const [showFormat, setShowFormat] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>();
  const [data, setData] = useState<QuestionData[] | null>();
  const [shuffle, setShuffle] = useState(true);
  const [loadImage, setLoadImage] = useState<
    ((name: string) => Promise<string | null>) | null
  >(null);
  const clearState = () => {
    setError(null);
    setLoadImage(null);
  };
  useEffect(() => {
    if (!file) return;
    clearState();
    (async () => {
      console.log(file);
      const zipFileReader = new BlobReader(file);
      const reader = new ZipReader(zipFileReader);
      const entries = await reader.getEntries();
      console.log(entries);
      const writer = new TextWriter();
      const questions = entries.find(
        (f) =>
          !f.filename.startsWith("__") &&
          f.filename.split("/").at(-1)!!.endsWith("questions.json")
      );
      if (!questions) {
        clearState();
        setError(
          "Unable to locate a questions.json file in the given zip file. " +
            "Please double check the file format and try again."
        );
        return;
      }

      if (!questions) return;
      // @ts-ignore
      await questions.getData(writer);
      const loadedData = JSON.parse(await writer.getData());
      console.log(loadedData);
      setData(loadedData);
      setLoadImage(() => async (name: string) => {
        if (name.startsWith("https://")) return name;

        const dataURLWriter = new Data64URIWriter();
        const file = entries.find(
          (f) =>
            !f.filename.startsWith("__") &&
            f.filename.split("/").at(-1)!!.endsWith(name)
        );
        if (!file) return null;
        // @ts-ignore
        await file.getData(dataURLWriter);
        return await dataURLWriter.getData();
      });
    })();
  }, [file]);

  const shuffledData = useMemo(
    () => ((!shuffle || !data) ? data : seededShuffle(data, 1000)),
    [data]
  );

  return (
    <main className={"min-h-screen bg-gray-50"}>
      <div
        className={cx(
          "relative isolate min-h-screen flex flex-col mx-auto max-w-7xl px-6 md:px-16 lg:px-24",
          data ? "py-6" : "py-12 sm:py-16"
        )}
      >
        {!data && (
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Quizzer
          </h2>
        )}
        <div className=" flex-grow">
          <div className="">
            {!data && (
              <>
                <p className="mt-6 text-lg leading-5 text-gray-900 dark:text-white">
                  This is a study utility that can quiz you given a zip file
                  with questions in the{" "}
                  <button
                    className={"link"}
                    onClick={() => setShowFormat(true)}
                  >
                    correct format
                  </button>
                  . It can be useful for testing yourself on questions you
                  programmatically generate or obtain, such as from{" "}
                  <a
                    className={"link"}
                    href={
                      "https://gist.github.com/jeffreymeng/921a1e949e59ed1d843702440175b0a1"
                    }
                  >
                    canvas
                  </a>
                  .
                </p>
                {showFormat && (
                  <div className="mt-6 p-4 text-lg leading-5 text-gray-900 dark:text-white border-2 rounded-md">
                    <p>
                      (
                      <button
                        className={"link"}
                        onClick={() => setShowFormat(false)}
                      >
                        close
                      </button>
                      )
                    </p>
                    <h3 className={"mt-4 text-lg font-bold"}>Format</h3>
                    <p className={"mt-2"}>
                      Quizzer expects a zip file with a questions.json JSON file
                      as well as some optional images. If you don&apos;t wish to
                      have any images, you can also just upload the
                      questions.json file. The questions and answers in
                      questions.json can contain HTML, which will be sanitized
                      before it is displayed. Notably, image tags are stripped
                      out of the HTML, so you can keep invalid images and
                      provide them with the image field instead.{" "}
                    </p>
                    <Table
                      header={["Key", "Type", "Description"]}
                      rows={[
                        {
                          key: "question",
                          type: "string",
                          description:
                            "Text or HTML to render as the question.",
                        },
                        {
                          key: "source",
                          type: "optional string",
                          description:
                            "The optional source of the question (to be provided as metadata).",
                        },
                        {
                          key: "image",
                          type: "string",
                          description:
                            "An optional path to an image (either an absolute URL starting with https://, or a path relative to the zip file base) to render " +
                            "below the question. If not provided, no image is rendered.",
                        },
                        {
                          key: "answers",
                          type: "list of objects",
                          description:
                            "A list of objects (see answers[i].content and answers[i].correct) for details.",
                        },
                        {
                          key: "answers[i].content",
                          type: "string",
                          description:
                            " (a field in each answer object) Text or HTML to render as an answer choice.",
                        },
                        {
                          key: "answers[i].correct",
                          type: "boolean",
                          description:
                            "(a field in each answer object) Indicates whether this option is correct. " +
                            "Multiple answers may be correct (but at least one should be).",
                        },
                      ]}
                    />
                  </div>
                )}
                {error && <p className={"mt-10 text-red-700"}>{error}</p>}
                <p className={"mt-10 text-lg "}>
                  To begin,{" "}
                  <label htmlFor="file-upload" className="link">
                    <span>select a file to upload</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept={"application/zip,application/json"}
                      onChange={(event) => {
                        clearState();
                        setFile(
                          event.target.files ? event.target.files[0] : null
                        );
                      }}
                    />
                  </label>
                  .
                </p>
                <div className="flex items-center mt-4">
                  <input id={"shuffle-checkbox"} checked={shuffle} onChange={e => setShuffle(e.target.checked)} type="checkbox"
                         className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="shuffle-checkbox"
                           className="ms-2 text-gray-900 dark:text-gray-300 cursor-pointer select-none">Shuffle Questions</label>
                </div>
              </>
            )}

            <p>
              {shuffledData && (
                <>
                  <Quizzer
                    setName={file?.name}
                    onExit={() => setData(null)}
                    data={shuffledData}
                    loadImage={loadImage}
                  />
                </>
              )}
            </p>
          </div>
        </div>
        {!data && (
          <p className="mt-16 text-md leading-5 text-gray-600 dark:text-gray-400">
            Copyright &copy; 2023 Jeffrey Meng
          </p>
        )}
      </div>
    </main>
  );
}
