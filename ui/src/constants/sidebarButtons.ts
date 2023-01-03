export const UserPageButtons = {
  sidebar: [{
    button: "Applications",
    link: '/apps/app-store/'
  }, {
    button: "Curators",
    link: '/apps/app-store/usr/curs'
  }],
  accounts: [
    { name: 'Curator', link: '/apps/app-store/cur' },
    { name: 'Developer', link: '/apps/app-store/dev' }
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
    { name: 'Curator', link: '/apps/app-store/cur' },
    { name: 'User', link: '/apps/app-store/' }
  ]
};

export const CuratorPageButtons =  {
  sidebar: [ {
    button: "My Profile",
    link: '/apps/app-store/cur/me'
  }, {
    button: "My Curated Apps",
    link: '/apps/app-store/cur'
  }],
  accounts: [
    { name: 'Developer', link: '/apps/app-store/dev' },
    { name: 'User', link: '/apps/app-store/' }
  ]
};
