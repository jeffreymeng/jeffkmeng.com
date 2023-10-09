import cx from "classnames";
import React, { ReactNode } from "react";

export default function Page({
  title,
  children,
  noFooter,
}: {
  title?: string;
  children: ReactNode;
  noFooter?: boolean;
}) {
  return (
    <main className={"min-h-screen bg-gray-50"}>
      <div
        className={cx(
          "relative isolate min-h-screen flex flex-col mx-auto max-w-7xl px-6 md:px-16 lg:px-24 py-12 sm:py-16"
        )}
      >
        {title && (
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl pb-4">
            {title}
          </h2>
        )}
        <div className=" flex-grow">
          <div className="">{children}</div>
        </div>

        {!noFooter && (
          <p className="mt-16 text-md leading-5 text-gray-600 dark:text-gray-400">
            Copyright &copy; 2023 Jeffrey Meng
          </p>
        )}
      </div>
    </main>
  );
}
