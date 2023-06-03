import { Project } from "@/data/projects";

export default function Project({
  link,
  name,
  year,
  description,
  tech,
}: Project) {
  return (
    <a href={link}>
      <div
        className={
          "group w-full py-2 sm:p-4 sm:pb-6 dark:sm:hover:bg-gray-100/10 sm:hover:shadow-md dark:sm:hover:shadow-sm transition-all sm:rounded-lg " +
          "sm:hover:bg-gradient-to-br dark:sm:hover:bg-none sm:hover:to-slate-300 sm:hover:from-sky-300"
        }
      >
        <div>
          <div className="flex justify-between">
            <h3 className="inline font-bold text-cyan-500 sm:text-gray-800 dark:text-cyan-400 dark:sm:text-gray-200 dark:sm:group-hover:text-cyan-400 text-lg transition-all">
              {name}
            </h3>
            <p className="inline font-semibold text-gray-600 dark:text-gray-300 dark:sm:group-hover:text-gray-100 text-md">
              {year}
            </p>
          </div>
          <div
            className={
              "text-gray-700 sm:group-hover:text-gray-900 dark:text-gray-200 dark:sm:group-hover:text-white"
            }
          >
            {description}
          </div>
        </div>
        <div className={"flex text-xs gap-x-2 mt-2"}>
          {tech?.map((item) => (
            <span
              key={item}
              className="relative z-10 rounded-full bg-gray-200 sm:group-hover:bg-gray-300/75 dark:bg-gray-500/50 px-2 py-1 font-medium text-gray-700 dark:text-gray-300 sm:group-hover:text-gray-900 dark:sm:group-hover:text-gray-100 dark:sm:group-hover:bg-gray-500 transition-all"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
