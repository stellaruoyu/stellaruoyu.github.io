async function fetchBookCover(title, author) {
    const query = encodeURIComponent(`${title} ${author}`);
    const url = `https://openlibrary.org/search.json?q=${query}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.docs && data.docs.length > 0) {
            const book = data.docs[0];
            if (book.cover_i) {
                return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
            }
        }
        return null;
    } catch (error) {
        console.error('Error fetching book cover:', error);
        return null;
    }
}

function loadBookCovers() {
    const bookCards = document.querySelectorAll('.book-card');
    
    bookCards.forEach(async (card) => {
        const title = card.querySelector('.book-title').textContent;
        const author = card.querySelector('.book-author').textContent;
        const coverImg = card.querySelector('.book-cover');
        
        const coverUrl = await fetchBookCover(title, author);
        if (coverUrl) {
            coverImg.src = coverUrl;
            coverImg.classList.remove('placeholder');
        }
    });
}

document.addEventListener('DOMContentLoaded', loadBookCovers);