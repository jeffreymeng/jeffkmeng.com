"use client";
import cx from "classnames";
import React, { useEffect, useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import projects from "@/data/projects";
import socials from "@/data/socials";
import Project from "@/components/Project";
import Link from "next/link";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    const elem = document.querySelector(".gradient-track");
    if (!elem) return;
    const handler = (e: MouseEvent) => {
      let rect = elem.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // console.log(e.clientX, e.clientY, rect.left, rect.top);
      // console.log(x, y);
      //@ts-ignore
      elem.style.setProperty("--x", x + "px");
      //@ts-ignore
      elem.style.setProperty("--y", y + "px");
    };
    document.addEventListener("mousemove", handler);
    return () => {
      document.removeEventListener("mousemove", handler);
    };
  }, []);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "d") {
        setDarkMode((o) => !o);
      }
    };
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  });
  return (
    <main
      className={cx(
        "relative isolate py-12 sm:py-32 min-h-screen bg-gray-50",
        darkMode && "dark bg-gradient-to-br to-slate-900 from-sky-900"
      )}
    >
      <div
        className={
          "fixed h-screen w-screen gradient-track m-0 top-0 left-0 z-0"
        }
      ></div>
      <div className="relative mx-auto max-w-7xl px-6 md:px-16 lg:px-36 z-10">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Jeffrey Meng
          </h2>
          <p className="mt-6 text-lg leading-5 text-gray-900 dark:text-white">
            I&apos;m a software engineer thinking about{" "}
            <i>Programming Languages</i>, <i>Systems</i>, and <i>the Web</i>.
          </p>
        </div>
        <div className="mt-8 sm:mt-16 max-w-3xl">
          <div className="text-base leading-7 text-gray-700 dark:text-gray-300">
            <p>
              I&apos;m an undergraduate studying Computer Science at UC Irvine,
              where I also work on compilers-related research with{" "}
              <a
                className={
                  "inline hover:text-cyan-600 dark:hover:text-cyan-500 transition-all underline"
                }
                href={"https://michaelfranz.com"}
              >
                Prof. Michael Franz
              </a>
              . My passion is building well-designed applications and systems
              that increase efficiency and create exceptional experiences.
              During my summers, I enjoy interning at various cool companies: in
              2024, I&apos;ll be at Databricks, and I was previously at IBM
              working on{" "}
              <a
                className={
                  "inline hover:text-cyan-600 dark:hover:text-cyan-500 transition-all underline"
                }
                href={"https://www.ibm.com/products/instana"}
              >
                Instana
              </a>{" "}
              in 2023.
            </p>
            <p className={"mt-8"}>
              When I&apos;m not behind a computer, you can find me outdoors
              climbing, skiing, backpacking, or diving (depending on the
              season), or indoors playing board games. I&apos;m also pretty
              active within UC Irvine&apos;s{" "}
              <a
                className={
                  "inline hover:text-cyan-600 dark:hover:text-cyan-500 transition-all underline"
                }
                href={"https://icssc.club"}
              >
                ICSSC
              </a>
              , where I serve as a co-chair of our Events Committee and work to
              organize events for UCI&apos;s ICS student population.
            </p>
          </div>
        </div>
        <div className={"mt-12"}>
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Projects
          </h3>
          <p className="mt-6 text-lg leading-5 text-gray-700 dark:text-gray-300">
            Here&apos;s a few of the things I&apos;ve been working on recently:
          </p>
          <div className="mx-auto mt-6 sm:mt-10 max-w-7xl sm:mt-20 md:mt-12">
            <div className="grid max-w-2xl grid-cols-1 sm:gap-x-4 gap-y-6 text-base leading-7 text-gray-300 sm:grid-cols-2 sm:-mx-4 lg:max-w-none lg:grid-cols-3">
              {projects.map((project) => (
                <Project key={project.name} {...project} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-8">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Contact Me
          </h3>

          <div className={"mt-6"}>
            {socials.map(({ name, href, text, icon: ItemIcon }) =>
              React.createElement(
                href.startsWith("/") ? Link : "a",
                {
                  key: name,
                  href,
                  className:
                    "block mt-3 dark:text-gray-400 text-gray-500 sm:hover:text-gray-700 dark:sm:hover:text-gray-200 sm:transition-colors text-md",
                },
                <>
                  <span className="sr-only">{name}</span>
                  <ItemIcon
                    className="h-6 w-6 inline mr-2"
                    aria-hidden="true"
                  />
                  {text}
                </>
              )
            )}
            <p className={"text-gray-500 dark:text-gray-400 mt-8"}>
              If you&apos;d like, you can also{" "}
              <a
                className={
                  "inline hover:text-cyan-600 dark:hover:text-cyan-500 transition-all underline"
                }
                href={"/Jeffrey%20Meng.asc"}
              >
                download my PGP key
              </a>
              .
            </p>
          </div>
        </div>
        <p className="mt-16 text-md leading-5 text-gray-600 dark:text-gray-400">
          Copyright &copy; 2023 Jeffrey Meng
        </p>
      </div>
    </main>
  );
}
