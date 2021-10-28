global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  })
) as jest.Mock;

global.atob = jest.fn(() => {
  return '';
}) as jest.Mock;

global.DOMParser = jest.fn(() => {
  return '';
}) as jest.Mock;

global.parser = jest.fn(() => {
  return '';
}) as jest.Mock;

global.parser.parseFromString = jest.fn(() => {
  return '';
}) as jest.Mock;

// @ts-ignore
window.streamlineData = {
  isMultisite: true,
  siteId: 1,
  favourites:
    '[{"adminUrl":"https://fabrikat.local/harmoni/wp-admin/","children":{"Dashboard":{"index":0,"name":"Dashboard","children":{"index.php":{"adminUrl":"https://fabrikat.local/harmoni/wp-admin/","href":"https://fabrikat.local/harmoni/wp-admin/index.php","index":0,"name":"Home","nameParent":"Dashboard","path":"index.php","siteId":305,"type":"menu"}}},"Posts":{"index":1,"name":"Posts","children":{"post-new.php":{"adminUrl":"https://fabrikat.local/harmoni/wp-admin/","href":"https://fabrikat.local/harmoni/wp-admin/post-new.php","index":1,"name":"Add New","nameParent":"Posts","path":"post-new.php","siteId":305,"type":"menu"},"edit.php":{"adminUrl":"https://fabrikat.local/harmoni/wp-admin/","href":"https://fabrikat.local/harmoni/wp-admin/edit.php","index":0,"name":"All Posts","nameParent":"Posts","path":"edit.php","siteId":305,"type":"menu"}}}},"title":"Admin menu (site: /harmoni/)","siteId":305,"type":"menu"},{"adminUrl":"https://fabrikat.local/spx/wp-admin/","children":{"Downloads":{"index":4,"name":"Downloads","children":{"edit.php?post_type=download":{"adminUrl":"https://fabrikat.local/spx/wp-admin/","href":"https://fabrikat.local/harmoni/wp-admin/edit.php?post_type=download","index":0,"name":"All Downloads","nameParent":"Downloads","path":"edit.php?post_type=download","siteId":303,"type":"menu"},"edit.php?post_type=download&page=edd-tools":{"adminUrl":"https://fabrikat.local/spx/wp-admin/","href":"https://fabrikat.local/harmoni/wp-admin/edit.php?post_type=download&page=edd-tools","index":9,"name":"Tools","nameParent":"Downloads","path":"edit.php?post_type=download&page=edd-tools","siteId":303,"type":"menu"}}},"Appearance":{"index":5,"name":"Appearance","children":{"customize.php?return=%2Fspx%2Fwp-admin%2F":{"adminUrl":"https://fabrikat.local/spx/wp-admin/","href":"https://fabrikat.local/harmoni/wp-admin/customize.php?return=%2Fspx%2Fwp-admin%2F","index":1,"name":"Customize","nameParent":"Appearance","path":"customize.php?return=%2Fspx%2Fwp-admin%2F","siteId":303,"type":"menu"}}},"Posts":{"index":1,"name":"Posts","children":{"edit.php":{"adminUrl":"https://fabrikat.local/spx/wp-admin/","href":"https://fabrikat.local/harmoni/wp-admin/edit.php","index":0,"name":"All Posts","nameParent":"Posts","path":"edit.php","siteId":303,"type":"menu"},"edit-tags.php?taxonomy=category":{"adminUrl":"https://fabrikat.local/spx/wp-admin/","href":"https://fabrikat.local/harmoni/wp-admin/edit-tags.php?taxonomy=category","index":2,"name":"Categories","nameParent":"Posts","path":"edit-tags.php?taxonomy=category","siteId":303,"type":"menu"}}},"Media":{"index":2,"name":"Media","children":{"upload.php":{"adminUrl":"https://fabrikat.local/spx/wp-admin/","href":"https://fabrikat.local/harmoni/wp-admin/upload.php","index":0,"name":"Library","nameParent":"Media","path":"upload.php","siteId":303,"type":"menu"}}}},"title":"Admin menu (site: /spx/)","siteId":303,"type":"menu"},{"adminUrl":"https://fabrikat.local/blockstudio/wp-admin/","children":{"Downloads":{"index":4,"name":"Downloads","children":{"edit.php?post_type=download":{"adminUrl":"https://fabrikat.local/blockstudio/wp-admin/","href":"https://fabrikat.local/harmoni/wp-admin/edit.php?post_type=download","index":0,"name":"All Downloads","nameParent":"Downloads","path":"edit.php?post_type=download","siteId":309,"type":"menu"},"post-new.php?post_type=download":{"adminUrl":"https://fabrikat.local/blockstudio/wp-admin/","href":"https://fabrikat.local/harmoni/wp-admin/post-new.php?post_type=download","index":1,"name":"Add New","nameParent":"Downloads","path":"post-new.php?post_type=download","siteId":309,"type":"menu"}}}},"title":"Admin menu (site: /blockstudio/)","siteId":309,"type":"menu"},{"adminUrl":"https://fabrikat.local/dennis/wp-admin/","children":{"Settings":{"index":8,"name":"Settings","children":{"options-general.php":{"adminUrl":"https://fabrikat.local/dennis/wp-admin/","href":"https://fabrikat.local/harmoni/wp-admin/options-general.php","index":0,"name":"General","nameParent":"Settings","path":"options-general.php","siteId":312,"type":"menu"}}}},"name":"Admin menu (site: /dennis/)","siteId":312,"type":"menu"},{"title":"Posts","titleAlt":"Showing 3 results for <span style=\\"font-style: italic;\\">e</span>","children":{"1":{"ID":1,"post_author":"1","post_date":"2020-05-25 12:34:29","post_date_gmt":"2020-05-25 12:34:29","post_content":"Welcome to <a href=\\"https://fabrikat.local/\\">spacepress</a>. This is your first post. Edit or delete it, then start blogging!","post_title":"Hello world!","post_excerpt":"","post_status":"publish","comment_status":"open","ping_status":"open","post_password":"","post_name":"hello-world","to_ping":"","pinged":"","post_modified":"2020-05-25 12:34:29","post_modified_gmt":"2020-05-25 12:34:29","post_content_filtered":"","post_parent":0,"guid":"https://fabrikat.local/harmoni/?p=1","menu_order":0,"post_type":"post","post_mime_type":"","comment_count":"1","filter":"raw","hrefEdit":"https://fabrikat.local/harmoni/wp-admin/post.php?post=1&amp;action=edit","name":"Hello world!","siteId":305},"14":{"ID":14,"post_author":"1","post_date":"2020-10-23 22:41:12","post_date_gmt":"2020-10-23 22:41:12","post_content":"","post_title":"Documentation","post_excerpt":"","post_status":"publish","comment_status":"closed","ping_status":"closed","post_password":"","post_name":"documentation","to_ping":"","pinged":"","post_modified":"2020-10-23 22:41:12","post_modified_gmt":"2020-10-23 22:41:12","post_content_filtered":"","post_parent":0,"guid":"https://fabrikat.local/harmoni/?page_id=14","menu_order":0,"post_type":"page","post_mime_type":"","comment_count":"0","filter":"raw","hrefEdit":"https://fabrikat.local/harmoni/wp-admin/post.php?post=14&amp;action=edit","name":"Documentation","siteId":305},"22":{"ID":22,"post_author":"1","post_date":"2021-02-16 01:11:31","post_date_gmt":"2021-02-16 01:11:31","post_content":"","post_title":"Home","post_excerpt":"","post_status":"publish","comment_status":"closed","ping_status":"closed","post_password":"","post_name":"home","to_ping":"","pinged":"","post_modified":"2021-02-16 01:11:31","post_modified_gmt":"2021-02-16 01:11:31","post_content_filtered":"","post_parent":0,"guid":"https://fabrikat.local/harmoni/?page_id=22","menu_order":0,"post_type":"page","post_mime_type":"","comment_count":"0","filter":"raw","hrefEdit":"https://fabrikat.local/harmoni/wp-admin/post.php?post=22&amp;action=edit","name":"Home","siteId":305}},"type":"post","siteId":305}]',
  settings:
    '{"keyNavigation":{"default":true},"keyExit":{"default":true},"searchResetInput":{"default":true},"appearanceBlur":{"default":false}}',
};
