const readMore = document.querySelector(".read-more")
const ccContent = document.querySelector(".cc-container")
// console.log(readMore)
// readMore && readMore.addEventListener('click', () => {})

//TopColdCOntent
readMore?.addEventListener('click', () => {
  const isExpanded = ccContent?.classList.toggle('expanded');
  readMore.innerHTML = isExpanded ? 'Read Less' : 'Read More';
})
//Burger Logic
const burgerBtn = document.querySelector('.burger-btn')
const navMenu = document.querySelector('nav')
const body = document.body;
const overlay = document.querySelector('.overlay');
const closeBurgerBtn = document.querySelector('.close-burger')
burgerBtn.addEventListener('click', () => {
  navMenu.classList.add('js-nav')
  overlay.classList.add('js-overlay')
  body.style.overflow = 'hidden'
})

function CloseBurger() {
  navMenu.classList.remove('js-nav')
  overlay.classList.remove('js-overlay')
  body.style.overflow = 'auto'
}
overlay.addEventListener('click', CloseBurger)
closeBurgerBtn.addEventListener('click', CloseBurger)


//Filters Logic
function FiltersLogic() {
  const filters = document.querySelector('.filters')
  const allFilters = document.querySelector('.view-all-filters')
  const allFiltersTitle = document.querySelector('.all-filters')
  const filtersList = document.querySelector('.filters-container')
  const initalFilters = filtersList.querySelectorAll('.filter-box')
  const filterTitle = filtersList.querySelectorAll('.filters-title')
  const filtersBtn = document.querySelector('.filters-top')
  const closeFiltersBtn = document.querySelector('.close-mobile-filters')
  const allFIBtns = document.querySelectorAll('.view-all-FI')
  //Number of items per filter to show
  const itemsToShow = 5;
  //Number of filters to show
  // let filtersToShow = 4;
  // if (window.innerWidth < 1024) {
  //   filtersToShow = 20;
  // }
  let filtersToShow = window.innerWidth < 1024 ? Infinity : 4;

  const filterBox = document.querySelectorAll('.filter-box');
  // Close/Open Filter Box

  const isMobile = window.innerWidth < 1024;

  function toggleFilterState(container, close = false) {
    const title = container.querySelector('.filters-title');
    const list = container.querySelector('.filters-list');
    const viewMore = container.querySelector('.view-all-FI');

    if (close) {
      container.classList.remove('js-filter-box');
      title?.classList.add('js-filters-title');
      list?.classList.add('js-filters-list');
      viewMore?.classList.add('js-none');
    } else {
      title?.classList.toggle('js-filters-title');
      list?.classList.toggle('js-filters-list');
      viewMore?.classList.toggle('js-none');
    }
  }

  // Handle click on filter title
  filterTitle?.forEach((el) => {
    el.addEventListener('click', (e) => {
      const container = el.closest('.filter-box');
      if (container) toggleFilterState(container);
    });
  });

  // Auto-close filters on mobile
  if (isMobile) {
    filterBox?.forEach((box) => toggleFilterState(box, true));
  }

  function HideAditionalFilters() {
    for (let i = filtersToShow; i < filterBox.length; i++) {
      filterBox[i].classList.add('js-none');
    }
  }
  function HideAditionalItems(filter) {
    let items = filter.querySelectorAll('.filters-item');
    if (items.length <= itemsToShow) {
      let moreItems = filter.querySelector('.all-FI');
      moreItems?.classList.add('js-none');
    }
    for (let i = itemsToShow; i < items.length; i++) {
      items[i].classList.add('js-none')
    }
  }
  HideAditionalFilters();
  for (let i = 0; i < filterBox.length; i++) {
    HideAditionalItems(filterBox[i]);
  }

  // View more/less filters
  if (filtersToShow >= initalFilters.length) {
    allFilters.classList.add('js-none')
  }

  allFilters && allFilters.addEventListener('click', () => {
    if (allFiltersTitle.innerHTML == "View All Filters") {

      for (let i = filtersToShow; i < initalFilters.length; i++) {
        initalFilters[i].classList.remove('js-none')

      }
      allFiltersTitle.innerHTML = "View Less Filters"
    } else {
      HideAditionalFilters();

      allFiltersTitle.innerHTML = "View All Filters"
    }
  })

  // Show more filter items
  let moreItems = document.querySelectorAll('.view-all-FI');
  for (let i = 0; i < moreItems.length; i++) {
    moreItems[i].addEventListener('click', (e) => {
      // console.log(e.target)
      const items = moreItems[i].parentNode.querySelectorAll('.filters-item');
      if (items.length > itemsToShow && !items[itemsToShow].classList.contains('js-none')) {
        HideAditionalItems(moreItems[i].parentNode);
        moreItems[i].querySelector('.all-FI').innerHTML = 'View More';
      } else {
        let options = moreItems[i].parentNode.querySelectorAll('.filters-item');
        for (let i = 0; i < options.length; i++) {
          options[i].classList.remove('js-none');
        }
        moreItems[i].querySelector('.all-FI').innerHTML = 'View Less';
      }
    })
  }

  if (window.innerWidth < 768) {
    filtersBtn && filtersBtn.addEventListener('click', () => {
      filtersList.classList.add('js-mobile-filters')
      filters.classList.add('js-filters')
      overlay.classList.add('js-overlay')
      body.style.overflow = 'hidden'
    })
    function CloseMobileFilters() {
      filtersList.classList.remove('js-mobile-filters')
      filters.classList.remove('js-filters')
      overlay.classList.remove('js-overlay')
      body.style.overflow = 'auto'
    }
    overlay && overlay.addEventListener('click', CloseMobileFilters)
    closeFiltersBtn && closeFiltersBtn.addEventListener('click', CloseMobileFilters)
  }
}
FiltersLogic();


//Scroll to top

const scrollButton = document.getElementById("scrollButton");
window.addEventListener("scroll", (e) => {
  let scroll = this.scrollY;

  if (scroll > 64) {
    scrollButton.classList.add('js-scroll-btn')
  } else {
    scrollButton.classList.remove('js-scroll-btn')
  }
})

// Back to top button
scrollButton.onclick = () => window.scrollTo({
  top: 0,
  behavior: "smooth"
});

// Load menu JSON, build HTML, then initialize behavior
document.addEventListener('DOMContentLoaded', function () {
  fetch('header-menu.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      buildMenu(data);
      initMenuBehavior();
    })
    .catch(error => {
      console.error('Error loading menu:', error);
    });
});


// Build menu DOM structure from JSON (Populating Header Menu)
function buildMenu(data) {
  const navContainer = document.querySelector('.nav-container');
  navContainer.innerHTML = ''; // Clear existing

  data.menu.forEach(menuItem => {
    const lvl0 = document.createElement('div');
    lvl0.className = 'menu-item-lvl0';

    const titleLink = document.createElement('a');
    titleLink.href = menuItem.link;
    titleLink.className = 'menu-lvl0-title';
    titleLink.textContent = menuItem.title;
    lvl0.appendChild(titleLink);

    const submenuContainer = document.createElement('div');
    submenuContainer.className = 'submenu-container';

    menuItem.subcategories.forEach((subcategory, index) => {
      const lvl1 = document.createElement('div');
      lvl1.className = 'submenu-item-lvl1';

      const subLink = document.createElement('a');
      subLink.href = subcategory.link;
      subLink.textContent = subcategory.title;
      lvl1.appendChild(subLink);

      const lvl2 = document.createElement('div');
      lvl2.className = 'submenu-item-lvl2';

      // Add 'active' to the first lvl2 of each menu group
      if (index === 0) lvl2.classList.add('active');

      subcategory.children.forEach(child => {
        const childLink = document.createElement('a');
        childLink.href = child.link;
        childLink.textContent = child.title;
        lvl2.appendChild(childLink);
      });

      lvl1.appendChild(lvl2);
      submenuContainer.appendChild(lvl1);
    });

    lvl0.appendChild(submenuContainer);
    navContainer.appendChild(lvl0);
  });
}

// Attach interactivity after DOM is populated
function initMenuBehavior() {
  const menuTitles = document.querySelectorAll('.menu-lvl0-title');

  menuTitles.forEach(title => {
    const parentItem = title.closest('.menu-item-lvl0');
    const submenu = parentItem.querySelector('.submenu-container');

    let openTimeout, closeTimeout;

    // Open submenu with delay
    title.addEventListener('mouseenter', () => {
      clearTimeout(closeTimeout);

      // Close others immediately
      document.querySelectorAll('.submenu-container.active').forEach(sc => {
        if (sc !== submenu) sc.classList.remove('active');
      });

      openTimeout = setTimeout(() => {
        submenu.classList.add('active');
      }, 300); // adjust delay here
    });

    // Close submenu with delay on mouseleave
    parentItem.addEventListener('mouseleave', () => {
      clearTimeout(openTimeout);
      closeTimeout = setTimeout(() => {
        submenu.classList.remove('active');
      }, 350); // adjust delay here
    });

    parentItem.addEventListener('mouseenter', () => {
      clearTimeout(closeTimeout);
    });
  });

  // Handle submenu-item-lvl1 clicks
  document.querySelectorAll('.submenu-item-lvl1 > a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const lvl1 = this.closest('.submenu-item-lvl1');
      const submenuLvl2 = lvl1.querySelector('.submenu-item-lvl2');
      if (!submenuLvl2) return;

      const container = lvl1.closest('.submenu-container');
      if (!container) return;

      container.querySelectorAll('.submenu-item-lvl2').forEach(el => {
        el.classList.remove('active');
      });

      submenuLvl2.classList.add('active');
    });
  });
}



//Footer Mobile
// const linksTitle = document.querySelectorAll('.links-title');
// const linksList = document.querySelectorAll('.links-list');

// for (const [i] of linksTitle.entries()) {
//   linksTitle[i].addEventListener('click', (e) => {
//     linksList.forEach((list) => list.classList.remove('js-links-list'));
//     linksList[i].classList.add('js-links-list');
//     linksTitle.forEach((title) => title.classList.remove('js-links-title'));
//     linksTitle[i].classList.add('js-links-title');
//   })
// }

