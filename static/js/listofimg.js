// Script for whodrinks.html
document.addEventListener('DOMContentLoaded', function() {
    const imageResults = JSON.parse(localStorage.getItem('imageResults'));
    const profilesContainer = document.querySelector('.profiles-container');

    // Ensure there are results
    if (imageResults && imageResults.length > 0) {
        // Clear local storage
        localStorage.removeItem('imageResults');

        // Use the results to create profile cards
        imageResults.forEach((item, index) => {
            const imgSrc = `data:image/jpeg;base64,${item.image_base64}`;
            const profileCard = `
                <div class="profile">
                    <div class="card" onclick="this.classList.toggle('flipped');">
                    <div class="front">
                        <img src="${imgSrc}" alt="Person ${index + 1}" class="profile-pic">
                        <p>${item.emotion}</p>
                    </div>
                    <div class="back">
                        <div class="face">
                        <img src="${imgSrc}" alt="Person ${index + 1}" class="profile-pic">
                        <h1>=</h1>
                        <span class="emoji" role="img" aria-label="Beer">🍺</span>
                        <p>Biére</p>
                        </div>
                    </div>
                    </div>
                </div>
            `;
            profilesContainer.insertAdjacentHTML('beforeend', profileCard);
        });
    } else {
        // Handle the case where there are no results
        profilesContainer.textContent = 'No results to display. Please try uploading an image again.';
    }
});
