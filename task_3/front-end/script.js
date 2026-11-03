
const API_URL = 'http://localhost:3000/api/products';

const fetchBtn = document.getElementById('fetch-btn');
const dataContainer = document.getElementById('data-container');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error-msg');

async function fetchApiData() {
   
    loadingEl.classList.remove('hidden');
    errorEl.classList.add('hidden');
    dataContainer.innerHTML = '';

   try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    
    loadingEl.classList.add('hidden');

    const itemsArray = result.data || [];

    renderData(itemsArray.slice(0, 8)); 

} catch (error) {
    console.error('Failed to fetch data:', error);
    loadingEl.classList.add('hidden');
    errorEl.textContent = `Could not load data from the server: ${error.message}`;
    errorEl.classList.remove('hidden');
}
}


function renderData(items) {
    if (items.length === 0) {
        dataContainer.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">No products found.</p>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <h3>${escapeHTML(item.name || 'Unnamed Product')}</h3>
            <p><strong>Category:</strong> ${escapeHTML(item.category || 'General')}</p>
            <p style="color: var(--primary); font-weight: 600; margin-top: 0.5rem;">$${item.price !== undefined ? item.price : '0.00'}</p>
        `;

        dataContainer.appendChild(card);
    });
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

fetchBtn.addEventListener('click', fetchApiData);

document.addEventListener('DOMContentLoaded', fetchApiData);