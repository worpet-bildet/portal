export const UserPageButtons = {
  sidebar: [
    {
      button: "Applications",
      link: "/apps/portal/",
    },
    {
      button: "Curators",
      link: "/apps/portal/usr/curs",
    },
  ],
  accounts: [
    { name: "Curator", link: "/apps/portal/cur" },
    { name: "Developer", link: "/apps/portal/dev" },
  ],
};

export const DeveloperPageButtons = {
  sidebar: [
    {
      button: "Application",
      link: "/apps/portal/dev",
    },
    {
      button: "Upload an App",
      link: "/apps/portal/dev/upload-app",
    },
  ],
  accounts: [
    { name: "Curator", link: "/apps/portal/cur" },
    { name: "User", link: "/apps/portal/" },
  ],
};

export const CuratorPageButtons = {
  sidebar: [
    {
      button: "My Profile",
      link: "/apps/portal/cur/me",
    },
    {
      button: "My Curated Apps",
      link: "/apps/portal/cur",
    },
  ],
  accounts: [
    { name: "Developer", link: "/apps/portal/dev" },
    { name: "User", link: "/apps/portal/" },
  ],
};
