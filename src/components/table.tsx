import { ReactNode } from "react";
import cx from "classnames";

export default function Table({
  header,
  rows,
}: {
  header: string[];
  rows: Record<string, ReactNode>[];
}) {
  return (
    <table className="w-full divide-y divide-gray-300">
      <thead>
        <tr>
          {header.map((title, i) => (
            <th
              scope="col"
              key={title}
              className={cx(
                "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900",
                i === 0 && "sm:pl-0"
              )}
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {rows.map((row, r) => (
          <tr key={r}>
            {header.map((heading, i) => (
              <td
                key={heading}
                className={cx("py-4 pl-4 pr-3 text-sm", i === 0 && "sm:pl-0")}
              >
                {row[heading.toLowerCase()]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
