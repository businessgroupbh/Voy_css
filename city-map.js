    const markers = [];


// Store the currently selected marker
let selectedMarker = null;

// Function to resize the selected marker
function resizeMarker(markerElement, size) {
    markerElement.style.width = size;
    markerElement.style.height = size;
}

// Function to add markers to the map    
function addMarkers() {
    document.querySelectorAll('.place-card').forEach(card => {
        const [lng, lat] = card.dataset.coordinates.split(',').map(Number);
        const category = card.dataset.category;

        const marker = new mapboxgl.Marker({ 
            element: createCustomMarker(category) 
        })
            .setLngLat([lng, lat])
            .addTo(map);

// Add marker click event
marker.getElement().addEventListener('click', () => {
    // Reset the size of the previously selected marker
    if (selectedMarker) {
        resizeMarker(selectedMarker, '25px'); // Default size
    }

    // Update the size of the clicked marker
    selectedMarker = marker.getElement();
    resizeMarker(selectedMarker, '30px'); // Larger size for selected marker

    map.flyTo({ 
        center: [lng, lat], 
        zoom: 16, 
      	pitch: 10,
        offset: [0, -150] 
    });
    openCard(card);
});
      
      

// Add card click event
card.addEventListener('click', () => {
    // Reset the size of the previously selected marker
    if (selectedMarker) {
        resizeMarker(selectedMarker, '25px'); // Default size
    }

// Find and update the size of the corresponding marker
    selectedMarker = marker.getElement();
    resizeMarker(selectedMarker, '30px'); // Larger size for selected marker

    map.flyTo({ 
        center: [lng, lat], 
        zoom: 16,
      	pitch: 10,
        offset: [0, -150] 
    });
    openCard(card);
});

        markers.push({ marker, card });
    });
}

// Create a custom marker element with a category-specific class
function createCustomMarker(category) {
    const markerElement = document.createElement('div');
    markerElement.className = `custom-marker marker-${category}`;
    return markerElement;
}

// Switch tab
function switchTab(category) {
    document.querySelectorAll('.tab-section').forEach(section => section.classList.remove('visible'));
    document.querySelectorAll(`#${category}-section`).forEach(section => section.classList.add('visible'));

    document.querySelectorAll('.category').forEach(c => c.classList.remove('active'));
    document.querySelector(`.category[data-category="${category}"]`).classList.add('active');
}

// Open card
function openCard(card) {
    const category = card.dataset.category;
    switchTab(category);

    document.querySelectorAll('.place-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    card.scrollIntoView({ behavior: 'smooth', inline: 'center' });
}

// Toggle bookmark
function toggleBookmark(cardId) {
    const card = document.getElementById(cardId);
    const bookmarkButton = card.querySelector('.bookmark-btn');

    let savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    if (savedBookmarks.includes(cardId)) {
        savedBookmarks = savedBookmarks.filter(id => id !== cardId);
        bookmarkButton.classList.remove('bookmarked');
        card.classList.remove('bookmarked'); // Remove bookmarked style
        card.style.backgroundColor = ''; // Reset card color
    } else {
        savedBookmarks.push(cardId);
        bookmarkButton.classList.add('bookmarked');
        card.classList.add('bookmarked'); // Add bookmarked style

    }

    // Save updated bookmarks to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(savedBookmarks));
}

// Restore bookmarks from localStorage
function restoreBookmarks() {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    savedBookmarks.forEach(cardId => {
        const card = document.getElementById(cardId);
        if (card) {
            const bookmarkButton = card.querySelector('.bookmark-btn');
            bookmarkButton.classList.add('bookmarked');
            card.classList.add('bookmarked');
            
        }
    });
}

// Initialize map and components
map.on('load', function() {
    addMarkers();

    // Restore bookmarks from localStorage
    restoreBookmarks();

    // Add event listeners for bookmark buttons
    document.querySelectorAll('.bookmark-btn').forEach(button => {
        button.addEventListener('click', () => {
            const cardId = button.dataset.placeId;
            toggleBookmark(cardId);
        });
    });
});

// Event listeners for category tabs
document.querySelectorAll('.category').forEach(category => {
    category.addEventListener('click', () => {
        const categoryName = category.dataset.category;
        switchTab(categoryName);
    });
});








 // ?///////////////// LAZY IMAGE

document.addEventListener("DOMContentLoaded", () => {
    // Default placeholder image
    const placeholderImage = "https://assets-v2.lottiefiles.com/a/28fd8178-116b-11ee-b8ef-9385bb9cd4a3/yBmIbzTali.gif";

    // Select all images in the cards
    const lazyImages = document.querySelectorAll("img");

    // Replace the real image with the placeholder initially
    lazyImages.forEach(image => {
        image.dataset.src = image.src; // Store the real image URL in a data attribute
        image.src = placeholderImage; // Set the placeholder image as the initial src
    });

    // Function to handle image load errors
    const handleImageError = (img) => {
        img.src = placeholderImage; // Replace with the placeholder image
    };

    // IntersectionObserver to load images when they come into view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; // Replace the placeholder with the real image

                // Add error handling
                img.onerror = () => handleImageError(img);

                img.onload = () => img.removeAttribute("data-src"); // Remove the data-src attribute after loading
                observer.unobserve(img); // Stop observing once the image is loaded
            }
        });
    });

    // Observe all lazy images
    lazyImages.forEach(image => observer.observe(image));
});







 // ?/////////////////TAB SCRIPT

document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from tabs and contents
        document.querySelectorAll('.tab, .content-container').forEach(el => el.classList.remove('active'));

        // Activate the selected tab and corresponding content
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
      });
});

