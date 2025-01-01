document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const items = document.querySelectorAll('.item');
    const loadMoreBtn = document.querySelector('.load-more-btn');

    // Initial display
    items.forEach((item, index) => {
      if (index < 5) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });

    // Load more function
    loadMoreBtn.addEventListener('click', () => {
      items.forEach((item, index) => {
        if (index >= 5) {
          item.style.display = 'block';
        }
      });
      loadMoreBtn.style.display = 'none';
    });

    // Filter function
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        items.forEach(item => {
          if (item.classList.contains(filter)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.transform = 'scale(0)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 500);
          }
        });

        // Update active class
        filterBtns.forEach(btn => {
          btn.classList.remove('active');
        });
        btn.classList.add('active');
      });
    });

    // Search function
    const performSearch = () => {
      const searchText = searchInput.value.toLowerCase();

      items.forEach(item => {
        const itemText = item.textContent.toLowerCase();

        if (itemText.includes(searchText)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.transform = 'scale(0)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 500);
        }
      });

      // Clear active filter
      filterBtns.forEach(btn => {
        btn.classList.remove('active');
      });
    };

    // Search on Enter key press
    searchInput.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission behavior
        performSearch();
      }
    });

    // Search on button click
    searchBtn.addEventListener('click', () => {
      performSearch();
    });

    // Set default filter
    const defaultFilterBtn = document.querySelector('.filter-btn.city');
    defaultFilterBtn.click();
  });
