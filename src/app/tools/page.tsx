import React from "react";
import Page from "@/components/Page";
import StyledLink from "@/components/StyledLink";

export default function ToolsPage() {
  return (
    <Page title={"Tools"}>
      <p className="mt-6 text-lg leading-5 text-gray-900 dark:text-white">
        This section contains some utilities that I&apos;ve made, mostly for my
        own convenience.
      </p>
      <ul className="list-disc mt-6">
        <li>
          <StyledLink href={"/tools/numbers"}>
            Number Representation Converter
          </StyledLink>
        </li>
      </ul>
    </Page>
  );
}
