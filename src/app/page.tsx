"use client";
import cx from "classnames";
import { useEffect, useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import projects from "@/data/projects";
import socials from "@/data/socials";
import ProjectButton from "@/components/ProjectButton";
import ReactGA from "react-ga4";
ReactGA.initialize("G-SGD74WQ9M0");

export default function Home() {
  const [gradient, setGradient] = useState(true);
  useEffect(() => {
    const elem = document.querySelector(".gradient-track");
    if (!elem) return;
    const handler = (e: MouseEvent) => {
      let rect = elem.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      console.log(e.clientX, e.clientY, rect.left, rect.top);
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
      if (event.key === "g") {
        setGradient((o) => !o);
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
        "relative isolate py-12 sm:py-32 min-h-screen",
        gradient
          ? "bg-gradient-to-br to-slate-900 from-sky-900"
          : "bg-slate-900"
      )}
    >
      <div
        className={
          "fixed h-screen w-screen gradient-track m-0 top-0 left-0 z-0"
        }
      ></div>
      <div className="relative mx-auto max-w-7xl px-6 md:px-16 lg:px-36 z-10">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Jeffrey Meng
          </h2>
          <p className="mt-6 text-lg leading-5 text-white">
            I&apos;m a software engineer thinking about{" "}
            <i>Programming Languages</i>, <i>Systems</i>, and <i>the Web</i>.
          </p>
        </div>
        <div className="mt-8 sm:mt-16 max-w-3xl">
          <div className="text-base leading-7 text-gray-300">
            <p>
              I study Computer Science at UC Irvine, and I&apos;m an intern at
              IBM for the summer. At UC Irvine, I also research Programming
              Languages & Static Analysis with{" "}
              <a
                className={
                  "inline hover:text-cyan-500 transition-all underline"
                }
                href={"https://michaelfranz.com"}
              >
                Prof. Michael Franz
              </a>
              . My passion is building applications and systems that increase
              efficiency and contribute to well-designed experiences.
            </p>
            <p className={"mt-8"}>
              When I&apos;m not behind a computer, you can find me outdoors
              climbing, skiing, backpacking, or diving (depending on the
              season), or indoors playing board games.
            </p>
          </div>
        </div>
        <div className={"mt-12"}>
          <h3 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Projects
          </h3>
          <p className="mt-6 text-lg leading-5 text-gray-300">
            Here&apos;s a few of the things I&apos;ve been working on recently:
          </p>
          <div className="mx-auto mt-6 sm:mt-10 max-w-7xl sm:mt-20 md:mt-12">
            <div className="mx-auto grid max-w-2xl grid-cols-1 sm:gap-x-4 gap-y-6 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectButton key={project.name} {...project} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex space-x-8">
          {socials.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-200"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-10 text-md leading-5 text-gray-400">
          Copyright &copy; 2023 Jeffrey Meng
        </p>
      </div>
    </main>
  );
}
