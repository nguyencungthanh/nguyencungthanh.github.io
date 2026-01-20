(function () {
    const searchForm = document.getElementById('search-form');
    const searchInput = searchForm.querySelector('input[name="q"]') || searchForm.querySelector('input[name="query"]');
    const searchResults = document.getElementById('search-results');
    const searchStatus = document.getElementById('search-status');

    if (!searchForm || !searchResults) return;

    // Get query from URL
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q') || params.get('query');

    if (query && searchInput) {
        searchInput.value = query;
        executeSearch(query);
    } else {
        if (searchStatus) searchStatus.innerHTML = "<div class='box'><p>ℹ️ You haven't searched for anything yet!</p></div>";
    }

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newQuery = searchInput.value;
        const url = new URL(window.location);
        url.searchParams.set('q', newQuery);
        window.history.pushState({}, '', url);
        executeSearch(newQuery);
    });

    async function executeSearch(query) {
        if (!query) return;

        if (searchStatus) searchStatus.innerHTML = "<div class='box'><p>Searching...</p></div>";
        searchResults.innerHTML = '';

        try {
            const response = await fetch('/search.json');
            if (!response.ok) throw new Error('Failed to load search index');

            const data = await response.json();
            const options = {
                shouldSort: true,
                threshold: 0.6,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: [
                    "title",
                    "content",
                    "tags",
                    "summary"
                ]
            };

            // Basic search implementation (can be replaced with Fuse.js if available/added)
            // For now, simple case-insensitive includes
            const lowerQuery = query.toLowerCase();
            const results = data.filter(item => {
                const titleMatch = item.title && item.title.toLowerCase().includes(lowerQuery);
                const contentMatch = item.content && item.content.toLowerCase().includes(lowerQuery);
                const summaryMatch = item.summary && item.summary.toLowerCase().includes(lowerQuery);
                return titleMatch || contentMatch || summaryMatch;
            });

            renderResults(results);

        } catch (error) {
            console.error(error);
            if (searchStatus) searchStatus.innerHTML = "<div class='box'><p>❌ An error occurred while searching</p></div>";
        }
    }

    function renderResults(results) {
        if (results.length === 0) {
            if (searchStatus) searchStatus.innerHTML = "<div class='box'><p>👀 Searched and searched, but nothing could be found!</p></div>";
            return;
        }

        if (searchStatus) searchStatus.innerHTML = "";

        // Using a fragment to minimize reflows
        const fragment = document.createDocumentFragment();

        results.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';

            const header = document.createElement('header');
            const link = document.createElement('a');
            link.className = 'nl';
            link.href = item.permalink;

            const h2 = document.createElement('h2');
            h2.textContent = item.title;
            // h2.className = 'smaller'; // Optional based on original CSS

            link.appendChild(h2);
            header.appendChild(link);

            if (item.date && !item.date.includes('0001')) {
                const pDate = document.createElement('p');
                pDate.className = 'lg small';
                pDate.innerHTML = `Published on ${item.date}`;
                header.appendChild(pDate);
            }

            const copy = document.createElement('div');
            copy.className = 'copy';
            const pSummary = document.createElement('p');
            pSummary.textContent = item.summary || item.content.substring(0, 200) + '...';
            copy.appendChild(pSummary);

            const readMore = document.createElement('a');
            readMore.href = item.permalink;
            readMore.className = 'button small';
            readMore.textContent = 'Read More →';

            card.appendChild(header);
            card.appendChild(copy);
            card.appendChild(readMore);

            fragment.appendChild(card);
        });

        searchResults.appendChild(fragment);
    }

})();
