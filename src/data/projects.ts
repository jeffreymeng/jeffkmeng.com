type Project = {
  name: string;
  year: number;
  description: string;
  tech?: string[];
  link: string;
};

const projects: Project[] = [
  {
    name: "Jump",
    year: 2023,
    description: "A toy programming language & compiler.",
    link: "https://github.com/jeffreymeng/jump",
    tech: ["TypeScript"],
  },

  {
    name: "Personal Website",
    year: 2023,
    description: "The source code for this website",
    link: "https://github.com/jeffreymeng/jeffkmeng.com",
    tech: ["React", "Next", "Tailwind"],
  },
  {
    name: "Slack Exporter",
    year: 2022,
    description: "A backup tool for slack channels",
    link: "https://github.com/jeffreymeng/slack-exporter",
    tech: ["TypeScript", "Slack API"],
  },
  {
    name: "Discord Photos Bot",
    description:
      "A discord bot to allow users to quickly repost images, memes, etc.",
    year: 2021,
    link: "https://github.com/jeffreymeng/discordphotosbot",
    tech: ["Firebase", "Express", "TypeScript"],
  },
  {
    name: "Quicksheets",
    description:
      "A lightweight spreadsheet editor written entirely from scratch in Python, including a custom formula language interpreter.",
    year: 2021,
    link: "https://github.com/jeffreymeng/quicksheets",
    tech: ["Python", "Tkinter"],
  },
  {
    name: "Unread XKCD",
    description:
      "A chrome extension that adds a button to XKCD.com that allows you to view a random unseen comic.",
    year: 2021,
    link: "https://chrome.google.com/webstore/detail/unread-xkcd/kdopolncblaedldhpafjogpjhmelmdep",
    tech: ["TypeScript"],
  },
  {
    name: "Minecraft Deathswap",
    description:
      "A scoreboard based minecraft spigot plugin to play the death swap game mode.",
    year: 2020,
    link: "https://github.com/jeffreymeng/mcmultiplayerdeathswap",
    tech: ["Java", "Bukkit"],
  },
  {
    name: "MV Model UN Website",
    description:
      "A website for my high school's Model UN club, complete with a custom registration flow, PDF waivier autofill, and extensive admin controls.",
    year: 2020,
    link: "https://montavistamun.com/",
    tech: ["React", "Firebase", "TypeScript"],
  },
  {
    name: "Techedit",
    description: "A simple, lightweight collaborative text-editor. ",
    year: 2019,
    link: "https://techedit.io",
    tech: ["Firebase", "jQuery", "Bootstrap"],
  },
];

if (
  JSON.stringify(projects) !==
  JSON.stringify(projects.sort((a, b) => b.year - a.year))
) {
  throw new Error("Projects are not sorted properly.");
}

export type { Project };
export default projects;
