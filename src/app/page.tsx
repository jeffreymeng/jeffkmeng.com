"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const btn = document.querySelector(".gradient-track");
    if (!btn) return;
    const handler = (e: any) => {
      // let rect = e.target?.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      console.log(x, y);
      //@ts-ignore
      btn.style.setProperty("--x", x + "px");
      //@ts-ignore
      btn.style.setProperty("--y", y + "px");
    };
    document.addEventListener("mousemove", handler);
    return () => {
      document.removeEventListener("mousemove", handler);
    };
  }, []);
  return (
    <main className="relative isolate bg-slate-900 py-24 sm:py-32 h-screen gradient-track">
      <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-36">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Jeffrey Meng
          </h2>
          <p className="mt-6 text-lg leading-5 text-white">
            I'm a software engineer interested in <i>Programming Languages</i>,{" "}
            <i>Systems</i>, and <i>the Web</i>.
          </p>
          {/*  TODO: Increase padding for entire page, check mobile responsiveness
            (disable cursor on mobile), light mode?. Think about typography more*/}
        </div>
        <div className="mt-16 max-w-3xl">
          <div className="text-base leading-7 text-gray-300">
            <p>
              I study Computer Science at UC Irvine, and I'm an intern at IBM
              for the summer. At UC Irvine, I also research Programming
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
              {/*<span className={"text-red-500"}>TODO: add some more here? (I enjoy..., My passion is...)</span>*/}
            </p>
            <p className={"mt-10"}>
              When I'm not behind a computer, you can find me outdoors climbing,
              skiing, backpacking, and diving (depending on the season), or
              indoors playing board games.
            </p>

            <p className={"mt-10"}>
              Some things I've worked on include{" "}
              <b>Jump, a Toy Programming Language</b>{" "}
            </p>
            {/*TODO: the bold thing needs to be another element probably, not part of the paragraph*/}
            {/*  Do the sticky scroll replacement here http://jsfiddle.net/yZKea/ (source https://stackoverflow.com/questions/18938191/replacing-a-sticky-header-with-a-second-header-when-it-reaches-the-currently-stu )*/}
          </div>
          {/*<dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">*/}
          {/*  {stats.map((stat) => (*/}
          {/*    <div key={stat.name} className="flex flex-col-reverse">*/}
          {/*      <dt className="text-base leading-7 text-gray-300">*/}
          {/*        {stat.name}*/}
          {/*      </dt>*/}
          {/*      <dd className="text-2xl font-bold leading-9 tracking-tight text-white">*/}
          {/*        {stat.value}*/}
          {/*      </dd>*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</dl>*/}
        </div>
      </div>
    </main>
  );
}
