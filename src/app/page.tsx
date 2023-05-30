"use client";

import { useEffect } from "react";
import { EnvelopeIcon } from "@heroicons/react/20/solid";

export default function Home() {
  useEffect(() => {
    const elem = document.querySelector(".gradient-track");
    if (!elem) return;
    const handler = (e: any) => {
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
  return (
    <main className="relative isolate bg-slate-900 py-24 sm:py-32 min-h-screen gradient-track">
      <div className="mx-auto max-w-7xl px-6 md:px-16 lg:px-36">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Jeffrey Meng
          </h2>
          <p className="mt-6 text-lg leading-5 text-white">
            I&apos;m a software engineer interested in{" "}
            <i>Programming Languages</i>, <i>Systems</i>, and <i>the Web</i>.
          </p>
          {/*  TODO: Increase padding for entire page, check mobile responsiveness
            (disable cursor on mobile), light mode?. Think about typography more*/}
        </div>
        <div className="mt-16 max-w-3xl">
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
              {/*<span className={"text-red-500"}>TODO: add some more here? (I enjoy..., My passion is...)</span>*/}
            </p>
            <p className={"mt-10"}>
              When I&apos;m not behind a computer, you can find me outdoors
              climbing, skiing, backpacking, and diving (depending on the
              season), or indoors playing board games.
              <span className={"text-red-500"}>
                TODO: Add an absolute element with overflow hidden to fix the
                spotlight edge and also spotlight shift when scrolling
              </span>
            </p>

            {/*TODO: fix scrolling when cursor thing is at the edge of the screen (maybe the fix is to have an absolute backdrop) */}
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
        <div className={"mt-12"}>
          <h3 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Projects
          </h3>
          <p className="mt-6 text-lg leading-5 text-white">
            Here&apos;s some of the things I&apos;ve been working on recently:
            <span className={"text-red-500"}>
              Hovering should make the card show up, and the link become
              colored. Add year & technologies (max 3)
            </span>
          </p>
          <div className="mx-auto mt-16 max-w-7xl sm:mt-20 md:mt-24">
            <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
              {[
                {
                  name: "Jump ----- 2023",
                  description: "A toy programming language & compiler.",
                },
                {
                  name: "Discord Photos Bot.",
                  description:
                    "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
                },
                {
                  name: "RKRL.me.",
                  description: "The world's worst link shortener.",
                },
                {
                  name: "Personal Website.",
                  description: "This website.",
                },
                {
                  name: "Quicksheets.",
                  description:
                    "A lightweight spreadsheet editor written entirely from scratch in Python, including a custom formula language interpreter.",
                },
                {
                  name: "Unread XKCD.",
                  description: "This website.",
                },
                {
                  name: "Minecraft Deathswap.",
                  description: "This website.",
                },
                {
                  name: "MV Model UN Website.",
                  description:
                    "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
                },
                {
                  name: "Techedit.",
                  description:
                    "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. ",
                },
              ].map((feature) => (
                <div key={feature.name} className="relative">
                  <dt className="inline font-semibold text-white">
                    {feature.name}
                  </dt>{" "}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="mt-10 flex space-x-8">
          {[
            {
              name: "Email",
              href: "mailto:jeffrey@jeffkmeng.com",
              icon: EnvelopeIcon,
            },
            {
              name: "Github",
              href: "https://github.com/jeffreymeng",
              icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              ),
            },
            {
              name: "LinkedIn",
              href: "https://linkedin.com/in/jeffkmeng",
              icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
              ),
            },
          ].map((item) => (
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
        <p className="mt-10 text-md leading-5 text-gray-500">
          Copyright &copy; 2023 Jeffrey Meng
        </p>
      </div>
    </main>
  );
}
