import { ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
      <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
        <h1 className=" text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          I'm Jeffrey Meng,
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-700">
          a software engineer interested in <i>Programming Languages</i>,{" "}
          <i>Systems</i>, and <i>the Web</i>.
        </p>
      </div>
    </main>
  );
}
