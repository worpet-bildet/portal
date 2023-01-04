export const UserPageButtons = {
  sidebar: [{
    button: "Applications",
    link: '/apps/galleria/'
  }, {
    button: "Curators",
    link: '/apps/galleria/usr/curs'
  }],
  accounts: [
    { name: 'Curator', link: '/apps/galleria/cur' },
    { name: 'Developer', link: '/apps/galleria/dev' }
  ]
};

export const DeveloperPageButtons = {
  sidebar: [{
    button: "Application",
    link: '/apps/galleria/dev'
  }, {
    button: "Upload an App",
    link: '/apps/galleria/dev/upload-app'
  }],
  accounts: [
    { name: 'Curator', link: '/apps/galleria/cur' },
    { name: 'User', link: '/apps/galleria/' }
  ]
};

export const CuratorPageButtons =  {
  sidebar: [ {
    button: "My Profile",
    link: '/apps/galleria/cur/me'
  }, {
    button: "My Curated Apps",
    link: '/apps/galleria/cur'
  }],
  accounts: [
    { name: 'Developer', link: '/apps/galleria/dev' },
    { name: 'User', link: '/apps/galleria/' }
  ]
};
