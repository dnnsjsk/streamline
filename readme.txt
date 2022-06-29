=== spx ===
Contributors: dnnsjsk
Requires at least: 5.0
Tested up to: 6.0.0
Requires PHP: 7.0
Stable tag: 2.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Do things faster.

== Description ==

Do things faster.

== Changelog ==

= 1.2.1 =
* Fix: post query not working on single sites
* Fix: NaN showing in bottom bar

= 1.2.0 =
* Enhancement: UI fixes
* Enhancement: don't load assets if user is not allowed to use app
* Enhancement: prevent sticky header covering up focussed elements
* Enhancement: render less initial markup
* Enhancement: replace all AJAX queries with REST calls
* Enhancement: turn on background blur by default
* Fix: enable pagination for sites
* Fix: license activation not working for PHP 8+
* New: default mode that removes the sidebar and brings productivity focused enhancements
* New: enhanced look with less visual noise
* New: micro animations (can be turned off in the settings)

= 1.1.5 =
* Fix: JS errors caused by missing sorting state

= 1.1.4 =
* Fix: potential JS error when opening app
* New: add possibility to reset Streamline to factory settings through Admin Bar

= 1.1.3 =
* Fix: pagination button resetting color after clearing sort

= 1.1.2 =
* Fix: prevent input being cut off in drawer
* New: possibility to sort post/site queries

= 1.1.1 =
* Enhancement: add set line-height to container
* Enhancement: use WP_Query for Rest call
* Enhancement: use same loading state for all operations
* Fix: minor UI bugs
* Fix: show the correct search history order
* New: pagination for posts
* New: setting for maximum number of displayed posts per page

= 1.1.0 =
* Enhancement: add &lt;streamline-dropdown> component
* Enhancement: apply original styles to body after closing app
* Enhancement: better color contrast throughout
* Enhancement: don't use transforms to center container
* Enhancement: prevent test data from ending up in JS bundles
* Enhancement: reduce JSON data being sent back from servers for sites and posts
* Enhancement: remove &lt;streamline-box> component
* Enhancement: remove &lt;streamline-button> component
* Enhancement: remove &lt;streamline-post> component
* Enhancement: remove body-scroll-lock library and replace with custom code
* Enhancement: show sidebar at bottom on smaller screen size
* Fix: 'Enter' button not showing after switching tabs (post/site)
* Fix: correct context menu positioning on lower screen sizes
* Fix: correct search placeholder depending on context
* Fix: don't allow empty search queries
* Fix: favourites not working correctly when post names are the same on multisite
* Fix: minor UI bugs
* Fix: show correct post edit link after adding to favourites
* New: default tab setting
* New: reset search query button for sites and posts
* New: show history of searches for sites and posts
* New: show post status for posts
* New: unified UI for all data types

= 1.0.24 =
* Enhancement: show plugin updates count in network and menu tab in brackets
* Enhancement: show shortcut keys in settings
* Enhancement: swap out menu icon
* Enhancement: use meta key + arrow keys to cycle through menu items
* Fix: cross browser styling inconsistencies
* Fix: normalize focus behaviour across browsers
* Fix: revert from :focus-visible to :focus for Safari support
* Fix: some icons not showing on Safari
* Fix: switch to pixel based sizing to prevent changes in root font-size obscuring the UI
* New: use arrow keys to cycle through entries

= 1.0.23 =
* Fix: PHP 8 warnings

= 1.0.22 =
* Enhancement: UI fixes
* Enhancement: switch to :focus-visible for all focusing inside the app
* Fix: don't make "Save" button clickable if settings haven't changed
* Fix: save post button not showing
* New: context menu

= 1.0.21 =
* Enhancement: remove previous implementation of network menu
* Fix: scrollbar being too short
* New: add 'Network' tab for network admin menu
* New: add 'Site' tab to find sites in multisite network
* New: add site information footer when multisite is active

= 1.0.20 =
* Enhancement: sidebar spacing
* Fix: menu not being loaded when using keyboard navigation on frontends

= 1.0.19 =
* Enhancement: remove entrance animation
* Enhancement: preload app
* Fix: automatically disable autofocus on touch devices to prevent keyboard popping up after switching modes
* Fix: minor UI bugs on mobile
* New: simplified and enhanced sidebar design

= 1.0.18 =
* Fix: always load menu if in admin but in a different mode
* New: add admin bar icon
* New: setting to turn off automatic focussing of search bar

= 1.0.17 =
* Enhancement: add icons to headers in favourite mode
* Enhancement: always keep favourites up to date
* Enhancement: make header text smaller
* Enhancement: minor spacing fixes
* New: post quick edit

= 1.0.16 =
* Fix: use 'CTRL' + 'K' to open app on Windows

= 1.0.15 =
* Fix: bundle assets correctly

= 1.0.14 =
* Fix: posts not being added to favourites when post_content contains certain characters

= 1.0.13 =
* Enhancement: adjust focus styles
* Enhancement: make backdrop not blurry by default
* Enhancement: replace WordPress logo with loading indicator when updating user meta
* Enhancement: switch post and site queries to REST
* Fix: always show subsite when filtering posts
* Fix: minor UI enhancements
* New: setting to activate/deactivate arrow key navigation
* New: setting to activate/deactivate backdrop blur
* New: setting to activate/deactivate escape key to exit
* New: setting to activate/deactivate search input reset when switching modes
* New: settings panel

= 1.0.12 =
* Fix: update not available

= 1.0.11 =
* Enhancement: change notice if no post query has been made yet
* Fix: counts not showing for network menus

= 1.0.10 =
* Enhancement: add counters to favourite mode
* Enhancement: count actual menu items and not parent items
* Enhancement: show post slugs when in post mode
* Fix: don't use flex-gap for menu entries
* Fix: entries not scrollable on mobile
* Fix: minor UI enhancements
* Fix: prevent console errors

= 1.0.9 =
* Fix: don't prevent all key presses

= 1.0.8 =
* Fix: prevent default behaviour when using the key combination

= 1.0.7 =
* Fix: make cross browser styling more cohesive

= 1.0.6 =
* New: add capability settings

= 1.0.0 =
* New: initial release
