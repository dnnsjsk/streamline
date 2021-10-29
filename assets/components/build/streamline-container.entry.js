import { r as registerInstance, h, e as Host } from './index-2c4cdcb5.js';
import { s as state$1 } from './capitalizeFirstLetter-a06ceb0e.js';
import { s as state, a as setSearchPlaceholder } from './setSearchPlaceholder-f92c7cd9.js';

function setTestData() {
  const menu = [
    {
      adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
      children: {
        Dashboard: {
          index: 0,
          name: 'Dashboard',
          children: {
            'index.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/index.php',
              index: 0,
              name: 'Home',
              nameParent: 'Dashboard',
              path: 'index.php',
              siteId: 314,
              type: 'menu',
            },
            'index.php?page=relevanssi/relevanssi.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/index.php?page=relevanssi/relevanssi.php',
              index: 1,
              name: 'User searches',
              nameParent: 'Dashboard',
              path: 'index.php?page=relevanssi/relevanssi.php',
              siteId: 314,
              type: 'menu',
            },
            'index.php?page=relevanssi_admin_search': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/index.php?page=relevanssi_admin_search',
              index: 2,
              name: 'Admin search',
              nameParent: 'Dashboard',
              path: 'index.php?page=relevanssi_admin_search',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        Posts: {
          index: 1,
          name: 'Posts',
          children: {
            'edit.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php',
              index: 0,
              name: 'All Posts',
              nameParent: 'Posts',
              path: 'edit.php',
              siteId: 314,
              type: 'menu',
            },
            'post-new.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/post-new.php',
              index: 1,
              name: 'Add New',
              nameParent: 'Posts',
              path: 'post-new.php',
              siteId: 314,
              type: 'menu',
            },
            'edit-tags.php?taxonomy=category': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit-tags.php?taxonomy=category',
              index: 2,
              name: 'Categories',
              nameParent: 'Posts',
              path: 'edit-tags.php?taxonomy=category',
              siteId: 314,
              type: 'menu',
            },
            'edit-tags.php?taxonomy=post_tag': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit-tags.php?taxonomy=post_tag',
              index: 3,
              name: 'Tags',
              nameParent: 'Posts',
              path: 'edit-tags.php?taxonomy=post_tag',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        Media: {
          index: 2,
          name: 'Media',
          children: {
            'upload.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/upload.php',
              index: 0,
              name: 'Library',
              nameParent: 'Media',
              path: 'upload.php',
              siteId: 314,
              type: 'menu',
            },
            'media-new.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/media-new.php',
              index: 1,
              name: 'Add New',
              nameParent: 'Media',
              path: 'media-new.php',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        Pages: {
          index: 3,
          name: 'Pages',
          children: {
            'edit.php?post_type=page': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=page',
              index: 0,
              name: 'All Pages',
              nameParent: 'Pages',
              path: 'edit.php?post_type=page',
              siteId: 314,
              type: 'menu',
            },
            'post-new.php?post_type=page': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/post-new.php?post_type=page',
              index: 1,
              name: 'Add New',
              nameParent: 'Pages',
              path: 'post-new.php?post_type=page',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        Downloads: {
          index: 4,
          name: 'Downloads',
          children: {
            'edit.php?post_type=download': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download',
              index: 0,
              name: 'All Downloads',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download',
              siteId: 314,
              type: 'menu',
            },
            'post-new.php?post_type=download': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/post-new.php?post_type=download',
              index: 1,
              name: 'Add New',
              nameParent: 'Downloads',
              path: 'post-new.php?post_type=download',
              siteId: 314,
              type: 'menu',
            },
            'edit-tags.php?taxonomy=download_category&post_type=download': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit-tags.php?taxonomy=download_category&post_type=download',
              index: 2,
              name: 'Categories',
              nameParent: 'Downloads',
              path: 'edit-tags.php?taxonomy=download_category&post_type=download',
              siteId: 314,
              type: 'menu',
            },
            'edit-tags.php?taxonomy=download_tag&post_type=download': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit-tags.php?taxonomy=download_tag&post_type=download',
              index: 3,
              name: 'Tags',
              nameParent: 'Downloads',
              path: 'edit-tags.php?taxonomy=download_tag&post_type=download',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=download&page=edd-payment-history': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download&page=edd-payment-history',
              index: 4,
              name: 'Payment History',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download&page=edd-payment-history',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=download&page=edd-customers': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download&page=edd-customers',
              index: 5,
              name: 'Customers',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download&page=edd-customers',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=download&page=edd-discounts': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download&page=edd-discounts',
              index: 6,
              name: 'Discount Codes',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download&page=edd-discounts',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=download&page=edd-reports': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download&page=edd-reports',
              index: 7,
              name: 'Reports',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download&page=edd-reports',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=download&page=edd-settings': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download&page=edd-settings',
              index: 8,
              name: 'Settings',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download&page=edd-settings',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=download&page=edd-tools': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download&page=edd-tools',
              index: 9,
              name: 'Tools',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download&page=edd-tools',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=download&page=edd-addons': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download&page=edd-addons',
              index: 10,
              name: 'Extensions',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download&page=edd-addons',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=download&page=edd-licenses': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download&page=edd-licenses',
              index: 11,
              name: 'Licenses',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download&page=edd-licenses',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        Appearance: {
          index: 5,
          name: 'Appearance',
          children: {
            'themes.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/themes.php',
              index: 0,
              name: 'Themes ',
              nameParent: 'Appearance',
              path: 'themes.php',
              siteId: 314,
              type: 'menu',
            },
            'customize.php?return=%2Fstreamline%2Fwp-admin%2F': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/customize.php?return=%2Fstreamline%2Fwp-admin%2F',
              index: 1,
              name: 'Customize',
              nameParent: 'Appearance',
              path: 'customize.php?return=%2Fstreamline%2Fwp-admin%2F',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        'Plugins ': {
          index: 6,
          name: 'Plugins ',
          children: {
            'plugins.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/plugins.php',
              index: 0,
              name: 'Plugins ',
              nameParent: 'Plugins ',
              path: 'plugins.php',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        Users: {
          index: 7,
          name: 'Users',
          children: {
            'users.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/users.php',
              index: 0,
              name: 'All Users',
              nameParent: 'Users',
              path: 'users.php',
              siteId: 314,
              type: 'menu',
            },
            'user-new.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/user-new.php',
              index: 1,
              name: 'Add New',
              nameParent: 'Users',
              path: 'user-new.php',
              siteId: 314,
              type: 'menu',
            },
            'profile.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/profile.php',
              index: 2,
              name: 'Profile',
              nameParent: 'Users',
              path: 'profile.php',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        Tools: {
          index: 8,
          name: 'Tools',
          children: {
            'tools.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/tools.php',
              index: 0,
              name: 'Available Tools',
              nameParent: 'Tools',
              path: 'tools.php',
              siteId: 314,
              type: 'menu',
            },
            'import.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/import.php',
              index: 1,
              name: 'Import',
              nameParent: 'Tools',
              path: 'import.php',
              siteId: 314,
              type: 'menu',
            },
            'export.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/export.php',
              index: 2,
              name: 'Export',
              nameParent: 'Tools',
              path: 'export.php',
              siteId: 314,
              type: 'menu',
            },
            'site-health.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/site-health.php',
              index: 3,
              name: 'Site Health',
              nameParent: 'Tools',
              path: 'site-health.php',
              siteId: 314,
              type: 'menu',
            },
            'export-personal-data.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/export-personal-data.php',
              index: 4,
              name: 'Export Personal Data',
              nameParent: 'Tools',
              path: 'export-personal-data.php',
              siteId: 314,
              type: 'menu',
            },
            'erase-personal-data.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/erase-personal-data.php',
              index: 5,
              name: 'Erase Personal Data',
              nameParent: 'Tools',
              path: 'erase-personal-data.php',
              siteId: 314,
              type: 'menu',
            },
            'ms-delete-site.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/ms-delete-site.php',
              index: 6,
              name: 'Delete Site',
              nameParent: 'Tools',
              path: 'ms-delete-site.php',
              siteId: 314,
              type: 'menu',
            },
            'tools.php?page=ssl-insecure-content-fixer-tests': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/tools.php?page=ssl-insecure-content-fixer-tests',
              index: 7,
              name: 'SSL Tests',
              nameParent: 'Tools',
              path: 'tools.php?page=ssl-insecure-content-fixer-tests',
              siteId: 314,
              type: 'menu',
            },
            'tools.php?page=wp-migrate-db-pro': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/tools.php?page=wp-migrate-db-pro',
              index: 8,
              name: 'Migrate DB Pro',
              nameParent: 'Tools',
              path: 'tools.php?page=wp-migrate-db-pro',
              siteId: 314,
              type: 'menu',
            },
            'tools.php?page=streamline': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/tools.php?page=streamline',
              index: 9,
              name: 'Streamline',
              nameParent: 'Tools',
              path: 'tools.php?page=streamline',
              siteId: 314,
              type: 'menu',
            },
            'tools.php?page=spx-license': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/tools.php?page=spx-license',
              index: 10,
              name: 'spx',
              nameParent: 'Tools',
              path: 'tools.php?page=spx-license',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        Settings: {
          index: 9,
          name: 'Settings',
          children: {
            'options-general.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/options-general.php',
              index: 0,
              name: 'General',
              nameParent: 'Settings',
              path: 'options-general.php',
              siteId: 314,
              type: 'menu',
            },
            'options-writing.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/options-writing.php',
              index: 1,
              name: 'Writing',
              nameParent: 'Settings',
              path: 'options-writing.php',
              siteId: 314,
              type: 'menu',
            },
            'options-reading.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/options-reading.php',
              index: 2,
              name: 'Reading',
              nameParent: 'Settings',
              path: 'options-reading.php',
              siteId: 314,
              type: 'menu',
            },
            'options-media.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/options-media.php',
              index: 3,
              name: 'Media',
              nameParent: 'Settings',
              path: 'options-media.php',
              siteId: 314,
              type: 'menu',
            },
            'options-permalink.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/options-permalink.php',
              index: 4,
              name: 'Permalinks',
              nameParent: 'Settings',
              path: 'options-permalink.php',
              siteId: 314,
              type: 'menu',
            },
            'options-privacy.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/options-privacy.php',
              index: 5,
              name: 'Privacy',
              nameParent: 'Settings',
              path: 'options-privacy.php',
              siteId: 314,
              type: 'menu',
            },
            'options-general.php?page=relevanssi/relevanssi.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/options-general.php?page=relevanssi/relevanssi.php',
              index: 6,
              name: 'Relevanssi',
              nameParent: 'Settings',
              path: 'options-general.php?page=relevanssi/relevanssi.php',
              siteId: 314,
              type: 'menu',
            },
            'options-general.php?page=ssl-insecure-content-fixer': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/options-general.php?page=ssl-insecure-content-fixer',
              index: 7,
              name: 'SSL Insecure Content',
              nameParent: 'Settings',
              path: 'options-general.php?page=ssl-insecure-content-fixer',
              siteId: 314,
              type: 'menu',
            },
            'options-general.php?page=somfrp_options_page': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/options-general.php?page=somfrp_options_page',
              index: 8,
              name: 'Frontend Reset Password',
              nameParent: 'Settings',
              path: 'options-general.php?page=somfrp_options_page',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        'Custom Fields': {
          index: 10,
          name: 'Custom Fields',
          children: {
            'edit.php?post_type=acf-field-group': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=acf-field-group',
              index: 0,
              name: 'Field Groups',
              nameParent: 'Custom Fields',
              path: 'edit.php?post_type=acf-field-group',
              siteId: 314,
              type: 'menu',
            },
            'post-new.php?post_type=acf-field-group': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/post-new.php?post_type=acf-field-group',
              index: 1,
              name: 'Add New',
              nameParent: 'Custom Fields',
              path: 'post-new.php?post_type=acf-field-group',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=acf-field-group&page=acf-tools': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=acf-field-group&page=acf-tools',
              index: 2,
              name: 'Tools',
              nameParent: 'Custom Fields',
              path: 'edit.php?post_type=acf-field-group&page=acf-tools',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=acf-field-group&page=acf-settings-updates': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=acf-field-group&page=acf-settings-updates',
              index: 3,
              name: 'Updates',
              nameParent: 'Custom Fields',
              path: 'edit.php?post_type=acf-field-group&page=acf-settings-updates',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        SEO: {
          index: 11,
          name: 'SEO',
          children: {
            'admin.php?page=theseoframework-settings': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/admin.php?page=theseoframework-settings',
              index: 0,
              name: 'SEO',
              nameParent: 'SEO',
              path: 'admin.php?page=theseoframework-settings',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        'WP Mail SMTP': {
          index: 12,
          name: 'WP Mail SMTP',
          children: {
            'admin.php?page=wp-mail-smtp': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/admin.php?page=wp-mail-smtp',
              index: 0,
              name: 'Settings',
              nameParent: 'WP Mail SMTP',
              path: 'admin.php?page=wp-mail-smtp',
              siteId: 314,
              type: 'menu',
            },
            'admin.php?page=wp-mail-smtp-logs': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/admin.php?page=wp-mail-smtp-logs',
              index: 1,
              name: 'Email Log',
              nameParent: 'WP Mail SMTP',
              path: 'admin.php?page=wp-mail-smtp-logs',
              siteId: 314,
              type: 'menu',
            },
            'admin.php?page=wp-mail-smtp-reports': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/admin.php?page=wp-mail-smtp-reports',
              index: 2,
              name: 'Email Reports',
              nameParent: 'WP Mail SMTP',
              path: 'admin.php?page=wp-mail-smtp-reports',
              siteId: 314,
              type: 'menu',
            },
            'admin.php?page=wp-mail-smtp-tools': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/admin.php?page=wp-mail-smtp-tools',
              index: 3,
              name: 'Tools',
              nameParent: 'WP Mail SMTP',
              path: 'admin.php?page=wp-mail-smtp-tools',
              siteId: 314,
              type: 'menu',
            },
            'admin.php?page=wp-mail-smtp-about': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/admin.php?page=wp-mail-smtp-about',
              index: 4,
              name: 'About Us',
              nameParent: 'WP Mail SMTP',
              path: 'admin.php?page=wp-mail-smtp-about',
              siteId: 314,
              type: 'menu',
            },
          },
        },
      },
      siteId: 314,
      type: 'menu',
    },
  ];
  const fav = [
    {
      adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
      children: {
        Posts: {
          index: 1,
          name: 'Posts',
          children: {
            'post-new.php': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/post-new.php',
              index: 1,
              name: 'Add New',
              nameParent: 'Posts',
              path: 'post-new.php',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        Downloads: {
          index: 4,
          name: 'Downloads',
          children: {
            'edit.php?post_type=download': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download',
              index: 0,
              name: 'All Downloads',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download',
              siteId: 314,
              type: 'menu',
            },
            'edit.php?post_type=download&page=edd-discounts': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=download&page=edd-discounts',
              index: 6,
              name: 'Discount Codes',
              nameParent: 'Downloads',
              path: 'edit.php?post_type=download&page=edd-discounts',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        Tools: {
          index: 8,
          name: 'Tools',
          children: {
            'tools.php?page=wp-migrate-db-pro': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/tools.php?page=wp-migrate-db-pro',
              index: 8,
              name: 'Migrate DB Pro',
              nameParent: 'Tools',
              path: 'tools.php?page=wp-migrate-db-pro',
              siteId: 314,
              type: 'menu',
            },
            'tools.php?page=streamline': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/tools.php?page=streamline',
              index: 9,
              name: 'Streamline',
              nameParent: 'Tools',
              path: 'tools.php?page=streamline',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        'Custom Fields': {
          index: 10,
          name: 'Custom Fields',
          children: {
            'edit.php?post_type=acf-field-group': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/edit.php?post_type=acf-field-group',
              index: 0,
              name: 'Field Groups',
              nameParent: 'Custom Fields',
              path: 'edit.php?post_type=acf-field-group',
              siteId: 314,
              type: 'menu',
            },
            'post-new.php?post_type=acf-field-group': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/post-new.php?post_type=acf-field-group',
              index: 1,
              name: 'Add New',
              nameParent: 'Custom Fields',
              path: 'post-new.php?post_type=acf-field-group',
              siteId: 314,
              type: 'menu',
            },
          },
        },
        'WP Mail SMTP': {
          index: 12,
          name: 'WP Mail SMTP',
          children: {
            'admin.php?page=wp-mail-smtp': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/admin.php?page=wp-mail-smtp',
              index: 0,
              name: 'Settings',
              nameParent: 'WP Mail SMTP',
              path: 'admin.php?page=wp-mail-smtp',
              siteId: 314,
              type: 'menu',
            },
            'admin.php?page=wp-mail-smtp-tools': {
              adminUrl: 'https://fabrikat.local/streamline/wp-admin/',
              href: 'https://fabrikat.local/streamline/wp-admin/admin.php?page=wp-mail-smtp-tools',
              index: 3,
              name: 'Tools',
              nameParent: 'WP Mail SMTP',
              path: 'admin.php?page=wp-mail-smtp-tools',
              siteId: 314,
              type: 'menu',
            },
          },
        },
      },
      siteId: 314,
      type: 'menu',
    },
    {
      children: {
        '226': {
          ID: 226,
          post_author: '1',
          post_date: '2020-05-29 22:01:43',
          post_date_gmt: '2020-05-29 22:01:43',
          post_content: '',
          post_title: 'Changelog',
          post_excerpt: '',
          post_status: 'publish',
          comment_status: 'closed',
          ping_status: 'closed',
          post_password: '',
          post_name: 'changelog',
          to_ping: '',
          pinged: '',
          post_modified: '2020-05-29 22:03:14',
          post_modified_gmt: '2020-05-29 22:03:14',
          post_content_filtered: '',
          post_parent: 0,
          guid: 'https://spx.dev/?page_id=226',
          menu_order: 0,
          post_type: 'page',
          post_mime_type: '',
          comment_count: '0',
          filter: 'raw',
          hrefEdit: 'aHR0cHM6Ly9mYWJyaWthdC5sb2NhbC9zcHgvd3AtYWRtaW4vcG9zdC5waHA/cG9zdD0yMjYmYW1wO2FjdGlvbj1lZGl0',
          name: 'Changelog',
          siteId: 314,
          sitePath: '/spx/',
        },
        '1179': {
          ID: 1179,
          post_author: '1',
          post_date: '2020-12-30 14:58:08',
          post_date_gmt: '2020-12-30 14:58:08',
          post_content: '<!-- wp:paragraph -->\n<p>What a year it has been. With 2020 being such a rollercoaster for many of us, we are glad, excited and full of motivation for what 2021 will have in store.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>🎊 The year for spx</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Little over 6 months ago, version 1.0 was released into the wild. It being our first commercial product, we didn’t know what to expect at first. Since spx is such a user-centric product, listening to feedback and suggestions has been crucial and pivotal in moving the plugin forward. In fact, some of the new features in 3.0 are completely inspired by your messages! Let’s dive into all the new features and enhancements.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>🚨 Removal of singular Oxygen elements</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Singular Oxygen elements are being deprecated in favor of the master component. spx is not a page builder centric plugin, but is instead able to adapt to new tools in the WordPress space. If you wanna know more about the reasoning for this, please visit the 2.0 post.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>What this means for your current sites:</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>If you are using any of the singular Oxygen elements on your sites, it is advised to swap them out for the master component before updating to 3.0. If you are already using the master component, you have nothing to worry about.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>🍰 Shortcodes</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>The following components are now also available as shortcodes. This greatly improves the areas that spx can be used in. For more details on the exact usage, please visit the documentation. Please keep in mind that the following components are currently not available as shortcodes.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:list -->\n<ul><li>Navigation</li><li>Group</li><li>Scrollspy</li><li>Snackbar</li></ul>\n<!-- /wp:list -->\n\n<!-- wp:paragraph -->\n<p>Furthermore, it is currently not possible to use helper functions with the following components when used as shortcodes:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:list -->\n<ul><li>Slider</li><li>Slideshow</li><li>Masonry</li></ul>\n<!-- /wp:list -->\n\n<!-- wp:heading -->\n<h2>🧬 Data API</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Although not entirely new, we have given the Data API a structural overhaul and added a documentation entry for it. Located within the plugin root folder, you will find a JSON file for every component which contains valuable information such as the default value, data type, methods, events, and much more. That same dataset is used internally to generate a good portion of the documentation and all of the shortcodes, so the possibilities are endless!</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>💠 Component updates</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Besides a new didLoad event for all components and various bug fixes, following components received some new features:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>Accordion</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Accordions can now be linked together. This means that it is possible to open or close all other accordions with the same id on click.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>Code</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>The code component now supports JSON along with options to display line numbers and a “Copy to clipboard” button. Since providing the best experience for the user is at the forefront of every design decision, we have decided to display both by default. Of course, it is also possible to disable these features.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>3️⃣ Semantic versioning</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>spx is now following the Semver versioning pattern, so breaking changes will be limited to major releases. (3.0.0, 4.0.0 etc.)</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>That’s a wrap! The next steps and new features for spx are already planned out and currently in development. Watch out for some new components, tighter integrations and some other neat surprises.</p>\n<!-- /wp:paragraph -->',
          post_title: '3.0 is here!',
          post_excerpt: '',
          post_status: 'publish',
          comment_status: 'closed',
          ping_status: 'closed',
          post_password: '',
          post_name: '3-0-is-here',
          to_ping: '',
          pinged: '',
          post_modified: '2021-01-04 11:33:38',
          post_modified_gmt: '2021-01-04 11:33:38',
          post_content_filtered: '',
          post_parent: 0,
          guid: 'https://fabrikat.local/spx/?p=1179',
          menu_order: 0,
          post_type: 'post',
          post_mime_type: '',
          comment_count: '0',
          filter: 'raw',
          hrefEdit: 'aHR0cHM6Ly9mYWJyaWthdC5sb2NhbC9zcHgvd3AtYWRtaW4vcG9zdC5waHA/cG9zdD0xMTc5JmFtcDthY3Rpb249ZWRpdA==',
          name: '3.0 is here!',
          siteId: 314,
          sitePath: '/spx/',
        },
      },
      type: 'post',
      siteId: 314,
    },
  ];
  const post = [
    {
      children: {
        '226': {
          ID: 226,
          post_author: '1',
          post_date: '2020-05-29 22:01:43',
          post_date_gmt: '2020-05-29 22:01:43',
          post_content: '',
          post_title: 'Changelog',
          post_excerpt: '',
          post_status: 'publish',
          comment_status: 'closed',
          ping_status: 'closed',
          post_password: '',
          post_name: 'changelog',
          to_ping: '',
          pinged: '',
          post_modified: '2020-05-29 22:03:14',
          post_modified_gmt: '2020-05-29 22:03:14',
          post_content_filtered: '',
          post_parent: 0,
          guid: 'https://spx.dev/?page_id=226',
          menu_order: 0,
          post_type: 'page',
          post_mime_type: '',
          comment_count: '0',
          filter: 'raw',
          hrefEdit: 'aHR0cHM6Ly9mYWJyaWthdC5sb2NhbC9zcHgvd3AtYWRtaW4vcG9zdC5waHA/cG9zdD0yMjYmYW1wO2FjdGlvbj1lZGl0',
          name: 'Changelog',
          siteId: 314,
          sitePath: '/spx/',
        },
        '684': {
          ID: 684,
          post_author: '610',
          post_date: '2020-09-22 07:42:33',
          post_date_gmt: '2020-09-22 07:42:33',
          post_content: '<!-- wp:paragraph -->\n<p>Here at spx, we have been working hard to deliver to you the next cutting edge update for our favourite plugin. That\'s why we are more than excited to present you this brand new version.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>🎨 Brand &amp; Website redesign</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>When we initially brought you spx, the website was laid out in a fixed-width format. Understandably this created issues when viewing the site on larger screens and generally wasn\'t aesthetically pleasing. During the 2.0 incubation stage, we had to rethink the entire design as we felt it wasn\'t as progressive as the plugin itself. Fast forward to now and we are excited to present to you the overhauled identity. Adjusting to any screen responsively in a non-fixed format, the new design showcases the plugin in a more sophisticated and unified light.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>📖 New documentation</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>While we were brainstorming the new features of spx 2.0, there was a constant question: how could we introduce these new features, while simultaneously teaching our customers how to use them? We realised that it was possible to automatically generate <a href="https://fabrikat.local/spx/documentation/" data-type="page" data-id="97">documentation</a> directly from the source files of the plugin, using the common <a rel="noreferrer noopener" href="https://jsdoc.app/index.html" target="_blank">JSDoc</a> format. This technique eliminates room for errors, making the users experience more upfront and \'straight from the source\', no pun intended. 😏</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>🧬 New components</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>At spx, we believe the more components we can create to make your life easier the better. So why not have a plugin that can do it all? We are happy to present you following new elements:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>Slider</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Based on <a rel="noreferrer noopener" href="https://swiperjs.com/" data-type="URL" data-id="https://swiperjs.com/" target="_blank">Swiper.js</a>, the slider feature will help you flawlessly create a completely functional slider without the time and effort of writing the code yourself. With less time and energy spent on the time-consuming part of setting up a slider, you can now direct your time to something else, like baking a cake or going outside.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>Notation</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>A notation is a crafty way to draw emphasis on sections of your content without the permanency of a constant highlight or bracket around what you want to emphasize.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>Slideshow</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>It is now possible to create a customizable and infinite slideshow with full control over the speed parameters. Check the <a href="https://fabrikat.local/spx/" data-type="page" data-id="48">landing page</a> for an example!</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>Code-highlighter</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Using this component you can demonstrate what code would look like as if it was written in a normal code editor, including colour coding and indenting. Perfect for creating examples and showcasing your unique code.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>🔮 New Oxygen integration</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>With our new Oxygen integration, you will now be able to implement components in one master wrapper. This is groundbreaking for us as the developers behind the plugin because it spares us the monotonous task of single-handedly integrating each feature into the Oxygen editor. </p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>Since version 3.5 of Oxygen introduced the ability to add data-attributes to elements, this new way is now perfectly feasible.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>The remaining elements that were introduced before 2.0 will be available until 3.0. However, it is now advised to use the newly introduced master wrapper.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>🧱 New section system</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>We are excited to announce that we have developed a new section system that makes creating beautiful and cohesive websites easier than ever. With our new system, you can now change elements of your website all at once by editing just a fraction of the code. </p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>For example, by editing global variables like colour and spacing you are able to change multiple elements at once, creating cohesion with a simplistic approach. We love it so much we used it to create our new landing page and will continue to use this feature on all of our future pages. As exciting as this new development is, it is currently in BETA mode so we would love for you to try it and send us your feedback.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>All in all, we are extremely excited by what we have achieved with 2.0. We aimed to create a cohesive and appealing design to showcase how our software can be used, specifically our section system while adding new components such as the slider, notation, code-highlighter and slideshow. The future of spx is looking bright and we are happy for everyone that is on this road with us.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>Stay tuned for more exciting news and features!</p>\n<!-- /wp:paragraph -->',
          post_title: 'How to blog correctly',
          post_excerpt: '',
          post_status: 'publish',
          comment_status: 'closed',
          ping_status: 'closed',
          post_password: '',
          post_name: 'how-to-blog-correctly',
          to_ping: '',
          pinged: '',
          post_modified: '2020-12-30 15:09:00',
          post_modified_gmt: '2020-12-30 15:09:00',
          post_content_filtered: '',
          post_parent: 0,
          guid: 'https://fabrikat.local/spx/?p=684',
          menu_order: 0,
          post_type: 'post',
          post_mime_type: '',
          comment_count: '0',
          filter: 'raw',
          hrefEdit: 'aHR0cHM6Ly9mYWJyaWthdC5sb2NhbC9zcHgvd3AtYWRtaW4vcG9zdC5waHA/cG9zdD02ODQmYW1wO2FjdGlvbj1lZGl0',
          name: 'How to blog correctly',
          siteId: 314,
          sitePath: '/spx/',
        },
        '699': {
          ID: 699,
          post_author: '1',
          post_date: '2020-09-28 07:47:54',
          post_date_gmt: '2020-09-28 07:47:54',
          post_content: '',
          post_title: 'Time to log out',
          post_excerpt: '',
          post_status: 'publish',
          comment_status: 'closed',
          ping_status: 'closed',
          post_password: '',
          post_name: 'time-to-log-out',
          to_ping: '',
          pinged: '',
          post_modified: '2020-09-28 07:47:54',
          post_modified_gmt: '2020-09-28 07:47:54',
          post_content_filtered: '',
          post_parent: 0,
          guid: 'https://fabrikat.local/spx/?page_id=699',
          menu_order: 0,
          post_type: 'page',
          post_mime_type: '',
          comment_count: '0',
          filter: 'raw',
          hrefEdit: 'aHR0cHM6Ly9mYWJyaWthdC5sb2NhbC9zcHgvd3AtYWRtaW4vcG9zdC5waHA/cG9zdD02OTkmYW1wO2FjdGlvbj1lZGl0',
          name: 'Time to log out',
          siteId: 314,
          sitePath: '/spx/',
        },
        '1179': {
          ID: 1179,
          post_author: '1',
          post_date: '2020-12-30 14:58:08',
          post_date_gmt: '2020-12-30 14:58:08',
          post_content: '<!-- wp:paragraph -->\n<p>What a year it has been. With 2020 being such a rollercoaster for many of us, we are glad, excited and full of motivation for what 2021 will have in store.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>🎊 The year for spx</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Little over 6 months ago, version 1.0 was released into the wild. It being our first commercial product, we didn’t know what to expect at first. Since spx is such a user-centric product, listening to feedback and suggestions has been crucial and pivotal in moving the plugin forward. In fact, some of the new features in 3.0 are completely inspired by your messages! Let’s dive into all the new features and enhancements.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>🚨 Removal of singular Oxygen elements</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Singular Oxygen elements are being deprecated in favor of the master component. spx is not a page builder centric plugin, but is instead able to adapt to new tools in the WordPress space. If you wanna know more about the reasoning for this, please visit the 2.0 post.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>What this means for your current sites:</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>If you are using any of the singular Oxygen elements on your sites, it is advised to swap them out for the master component before updating to 3.0. If you are already using the master component, you have nothing to worry about.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>🍰 Shortcodes</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>The following components are now also available as shortcodes. This greatly improves the areas that spx can be used in. For more details on the exact usage, please visit the documentation. Please keep in mind that the following components are currently not available as shortcodes.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:list -->\n<ul><li>Navigation</li><li>Group</li><li>Scrollspy</li><li>Snackbar</li></ul>\n<!-- /wp:list -->\n\n<!-- wp:paragraph -->\n<p>Furthermore, it is currently not possible to use helper functions with the following components when used as shortcodes:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:list -->\n<ul><li>Slider</li><li>Slideshow</li><li>Masonry</li></ul>\n<!-- /wp:list -->\n\n<!-- wp:heading -->\n<h2>🧬 Data API</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Although not entirely new, we have given the Data API a structural overhaul and added a documentation entry for it. Located within the plugin root folder, you will find a JSON file for every component which contains valuable information such as the default value, data type, methods, events, and much more. That same dataset is used internally to generate a good portion of the documentation and all of the shortcodes, so the possibilities are endless!</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>💠 Component updates</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Besides a new didLoad event for all components and various bug fixes, following components received some new features:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>Accordion</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>Accordions can now be linked together. This means that it is possible to open or close all other accordions with the same id on click.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>Code</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>The code component now supports JSON along with options to display line numbers and a “Copy to clipboard” button. Since providing the best experience for the user is at the forefront of every design decision, we have decided to display both by default. Of course, it is also possible to disable these features.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>3️⃣ Semantic versioning</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>spx is now following the Semver versioning pattern, so breaking changes will be limited to major releases. (3.0.0, 4.0.0 etc.)</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>That’s a wrap! The next steps and new features for spx are already planned out and currently in development. Watch out for some new components, tighter integrations and some other neat surprises.</p>\n<!-- /wp:paragraph -->',
          post_title: 'Logical thinking for dummies',
          post_excerpt: '',
          post_status: 'publish',
          comment_status: 'closed',
          ping_status: 'closed',
          post_password: '',
          post_name: 'logical-thinking',
          to_ping: '',
          pinged: '',
          post_modified: '2021-01-04 11:33:38',
          post_modified_gmt: '2021-01-04 11:33:38',
          post_content_filtered: '',
          post_parent: 0,
          guid: 'https://fabrikat.local/spx/?p=1179',
          menu_order: 0,
          post_type: 'post',
          post_mime_type: '',
          comment_count: '0',
          filter: 'raw',
          hrefEdit: 'aHR0cHM6Ly9mYWJyaWthdC5sb2NhbC9zcHgvd3AtYWRtaW4vcG9zdC5waHA/cG9zdD0xMTc5JmFtcDthY3Rpb249ZWRpdA==',
          name: 'Logical thinking for dummies',
          siteId: 314,
          sitePath: '/spx/',
        },
      },
      queryValue: 'log',
      type: 'post',
      siteId: 314,
    },
  ];
  state.active = 'menu';
  state$1.entriesMenu = menu;
  state$1.entriesMenuActive = menu;
  state$1.entriesFav = fav;
  state$1.entriesFavActive = fav;
  state$1.entriesPost = post;
  state$1.entriesPostActive = post;
}

const streamlineContainerCss = ":host{display:block;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif}:host *{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;pointer-events:auto}/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);border:0 solid;box-sizing:border-box}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}a{color:inherit;text-decoration:inherit}.visible{visibility:visible}.inline-block{display:inline-block}.h-\\[max-content\\]{height:-webkit-max-content;height:-moz-max-content;height:max-content}.bg-blue-gray-200{--tw-bg-opacity:1;background-color:rgba(226,232,240,var(--tw-bg-opacity))}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.py-1\\.5{padding-bottom:.375rem;padding-top:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.text-blue-gray-500{--tw-text-opacity:1;color:rgba(100,116,139,var(--tw-text-opacity))}.blur{--tw-blur:blur(8px);filter:var(--tw-filter)}/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */";

let StreamlineContainer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.cycle = (mode) => {
            const index = state$1.menus.indexOf(state.active);
            const length = state$1.menus.length;
            if (mode === "up") {
                if (index === 0) {
                    state.active = state$1.menus[length - 1];
                }
                else {
                    state.active = state$1.menus[index - 1];
                }
            }
            if (mode === "down") {
                if (index + 1 === length) {
                    state.active = state$1.menus[0];
                }
                else {
                    state.active = state$1.menus[index + 1];
                }
            }
        };
    }
    connectedCallback() {
        state$1.visible = this.visible || false;
        state$1.entriesSettingsActive = state$1.entriesSettings;
        state$1.entriesSettings[0].children.forEach((item) => {
            item.children.forEach((itemInner) => {
                var _a, _b;
                state$1.entriesSettingsLoad[itemInner.id] = {
                    default: (_b = (_a = JSON.parse(state$1.data.settings)[itemInner.id]) === null || _a === void 0 ? void 0 : _a.default) !== null && _b !== void 0 ? _b : state$1.entriesSettingsLoad[itemInner.id].default,
                };
            });
        });
        state$1.entriesSettingsSave = state$1.entriesSettingsLoad;
        if (state$1.test) {
            setTestData();
        }
        document.addEventListener("keydown", (e) => {
            if (e.key === "k" && (e.metaKey || e.shiftKey)) {
                e.preventDefault();
                state$1.visible = !state$1.visible;
            }
            if (state$1.visible) {
                if (e.key === "Escape" &&
                    state$1.entriesSettingsLoad.keyExit.default) {
                    e.preventDefault();
                    state$1.visible = false;
                }
                if (e.key === "ArrowUp" &&
                    state$1.entriesSettingsLoad.keyNavigation.default) {
                    e.preventDefault();
                    this.cycle("up");
                }
                if (e.key === "ArrowDown" &&
                    state$1.entriesSettingsLoad.keyNavigation.default) {
                    e.preventDefault();
                    this.cycle("down");
                }
            }
        });
    }
    componentDidLoad() {
        setSearchPlaceholder();
    }
    async toggle() {
        state$1.visible = !state$1.visible;
    }
    async toggleTest() {
        state$1.testFull = !state$1.testFull;
    }
    render() {
        return (h(Host, null, state$1.visible && (h("div", { class: "fixed top-0 left-0 w-full h-full z-[9999999999999999]" }, h("div", { tabIndex: -1, class: `fixed top-0 left-0 w-full h-full bg-black/90 ${state$1.entriesSettingsLoad.appearanceBlur.default
                ? "backdrop-blur-sm"
                : ""}`, onClick: () => (state$1.visible = false) }), h("streamline-box", null)))));
    }
};
StreamlineContainer.style = streamlineContainerCss + '/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,:after,:before{--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-backdrop-blur:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-invert:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-opacity:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);border:0 solid;box-sizing:border-box}.visible{visibility:visible}.fixed{position:fixed}.top-0{top:0}.left-0{left:0}.z-\\[9999999999999999\\]{z-index:10000000000000000}.h-full{height:100%}.w-full{width:100%}.bg-black\\/90{background-color:rgba(0,0,0,.9)}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.backdrop-blur-sm{--tw-backdrop-blur:blur(4px);-webkit-backdrop-filter:var(--tw-backdrop-filter);backdrop-filter:var(--tw-backdrop-filter)}';

export { StreamlineContainer as streamline_container };
