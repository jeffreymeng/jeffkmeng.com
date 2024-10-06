import cx from "classnames";
import React, { ReactNode } from "react";

export default function Page({
  title,
  children,
  footer = true,
}: {
  title?: string;
  children: ReactNode;
  footer?: boolean | ReactNode;
}) {
  return (
    <main className={"min-h-screen bg-gray-50"}>
      <div
        className={cx(
          "relative isolate min-h-screen flex flex-col mx-auto max-w-7xl px-6 md:px-16 lg:px-24 py-12 sm:py-16",
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

        {footer !== false && (
          <p className="mt-16 text-md leading-5 text-gray-600 dark:text-gray-400">
            {footer === true ? (
              <React.Fragment>
                Copyright &copy; 2023-2024 Jeffrey Meng
              </React.Fragment>
            ) : (
              footer
            )}
          </p>
        )}
      </div>
    </main>
  );
}
