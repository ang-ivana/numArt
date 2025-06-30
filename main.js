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
  const allFilters = document.querySelector('.view-all-filters')
  const allFiltersTitle = document.querySelector('.all-filters')
  const filtersList = document.querySelector('.filters-container')
  const initalFilters = filtersList.querySelectorAll('.filter-box')
  const filterTitle = filtersList.querySelectorAll('.filters-title')
  const filtersBtn = document.querySelector('.filters-top')
  const closeFiltersBtn = document.querySelector('.close-mobile-filters')
  //Number of items per filter to show
  const itemsToShow = 5;
  //Number of filters to show
  const filtersToShow = 4;
  const filterBox = document.querySelectorAll('.filter-box');
  // Close/Open Filter Box

  filterTitle && filterTitle.forEach((el) => {
    el.addEventListener('click', (e) => {
      let filterItem = e.target.parentElement;
      let filterContainer = e.target.parentElement.parentElement;
      let filterList = filterContainer.querySelector('.filters-list');
      filterBox.forEach((el) => {
        // console.log(filterItem)
        if (el == filterContainer) {
          filterItem.classList.toggle('js-filters-title');
          filterList.classList.toggle('js-filters-list')
        }
      });
    });

    if (window.innerWidth < 1024) {
      filterBox.forEach((el) => {
        el.classList.remove('js-filter-box');
      });
    }
  });
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
      overlay.classList.add('js-overlay')
      body.style.overflow = 'hidden'
    })
    function CloseMobileFilters() {
      filtersList.classList.remove('js-mobile-filters')
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
const linksTitle = document.querySelectorAll('.links-title');
const linksList = document.querySelectorAll('.links-list');

linksTitle.forEach((title, i) => {
  title.addEventListener('click', () => {
    const isOpen = linksList[i].classList.contains('js-links-list');

    // Close all first
    linksList.forEach(list => list.classList.remove('js-links-list'));
    linksTitle.forEach(t => t.classList.remove('js-links-title'));

    if (!isOpen) {
      // If it was closed, open it
      linksList[i].classList.add('js-links-list');
      linksTitle[i].classList.add('js-links-title');
    }
    // If it was open, clicking again leaves all closed
  });
});
