import { Project } from "@/data/projects";

export default function ProjectButton({
  link,
  name,
  year,
  description,
  tech,
}: Project) {
  return (
    <a
      href={link}
      className="group relative py-2 sm:p-3 sm:hover:bg-gray-100/10 sm:hover:shadow-lg transition-all rounded-lg"
    >
      <div>
        <div className="flex justify-between">
          <h3 className="inline font-bold text-cyan-400 sm:text-gray-200 sm:group-hover:text-cyan-400 text-lg transition-all">
            {name}
          </h3>
          <p className="inline font-semibold text-gray-300 sm:group-hover:text-gray-100 text-md">
            {year}
          </p>
        </div>
        <div className={"text-gray-200 sm:group-hover:text-white"}>
          {description}
        </div>
      </div>
      <div className={"flex text-xs gap-x-2 mt-2"}>
        {(tech || []).map((item) => (
          <span className="relative z-10 rounded-full bg-gray-500/50 px-2 py-1 font-medium text-gray-300 sm:group-hover:text-gray-100 sm:group-hover:bg-gray-500 transition-all">
            {item}
          </span>
        ))}
      </div>
    </a>
  );
}
