export const UserPageButtons = {
  sidebar: [{
    button: "Applications",
    link: '/apps/app-store/usr'
  }, {
    button: "Curators",
    link: '/apps/app-store/usr/curs'
  }],
  accounts: [
    { name: 'C', link: '/apps/app-store/cur' },
    { name: 'D', link: '/apps/app-store/dev' }
  ]
};

export const DeveloperPageButtons = {
  sidebar: [{
    button: "Application",
    link: '/apps/app-store/dev'
  }, {
    button: "Upload an App",
    link: '/apps/app-store/dev/upload-app'
  }],
  accounts: [
    { name: 'C', link: '/apps/app-store/cur' },
    { name: 'U', link: '/apps/app-store/usr' }
  ]
};

export const CuratorPageButtons =  {
  sidebar: [{
    button: "My Profile",
    link: '/apps/app-store/cur/me'
  }, {
    button: "My Curated Apps",
    link: '/apps/app-store/cur'
  }],
  accounts: [
    { name: 'D', link: '/apps/app-store/dev' },
    { name: 'U', link: '/apps/app-store/usr' }
  ]
};