import { state } from '../../store/internal';

export default function getM({ url, name }) {
  const menu = [];

  const isAdmin = document.querySelector('#adminmenuwrap');

  function get(doc) {
    doc.querySelectorAll('.menu-top > a').forEach((item) => {
      const nameMenu = (item as HTMLElement).innerText.replace(
        /(\r\n|\n|\r)/gm,
        ''
      );

      const subMenu = item.closest('li.menu-top');
      const subArr = [];

      if (subMenu) {
        const subSubMenu = subMenu.querySelectorAll('a');
        subSubMenu.forEach((itemSub, indexSub) => {
          if (
            (indexSub !== 0 && subSubMenu.length >= 2) ||
            (indexSub === 0 && subSubMenu.length === 1)
          ) {
            const nameText = [...itemSub.childNodes]
              .find((child) => child.nodeType === Node.TEXT_NODE)
              ?.textContent.trim();
            const nameSub = itemSub.querySelector('.update-count')
              ? nameText +
                ` (${itemSub.querySelector('.update-count').innerHTML})`
              : itemSub.innerText.replace(/(\r\n|\n|\r)/gm, '');
            const hrefSub = itemSub.getAttribute('href');

            subArr.push({
              href: url + hrefSub,
              name: nameSub,
            });
          }
        });
      }

      menu.push({
        name: nameMenu,
        children: subArr,
      });
    });

    return [
      {
        name,
        children: menu,
      },
    ];
  }

  if (isAdmin) {
    return get(document);
  } else {
    state.isLoading = true;
    fetch(url)
      .then((response) => response.text && response.text())
      .then((data) => {
        const parser = new DOMParser();
        const html = parser.parseFromString(data, 'text/html');
        return get(html);
      })
      .catch(() => {})
      .finally(() => (state.isLoading = false));
  }
}
