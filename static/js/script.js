// script.js

// This function is called when the user clicks on the "Upload" button
document.addEventListener('DOMContentLoaded', function() {
    var fileInput = document.getElementById('fileInput');
    var imageContainer = document.getElementById('imageContainer');
    var imageActions = document.getElementById('imageActions');
    var deleteButton = document.getElementById('deleteButton');
    var retakeButton = document.getElementById('retakeButton');

    fileInput.addEventListener('change', function() {
        loadImage(fileInput.files[0]);
    });

    function loadImage(file) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var img = new Image();
            img.src = e.target.result;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            img.style.borderRadius = '20px';
            imageContainer.innerHTML = '';
            imageContainer.appendChild(img);
            imageActions.style.display = 'flex';
        }

        reader.readAsDataURL(file);
    }

    deleteButton.addEventListener('click', function() {
        imageContainer.innerHTML = '<button onclick="document.getElementById(\'fileInput\').click();" id="imagePrompt">📸</button>';
        imageActions.style.display = 'none';
    });

    retakeButton.addEventListener('click', function() {
        fileInput.click();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var whodrinksButton = document.getElementById('whodrinksButton');
    var imageContainer = document.getElementById('imageContainer');

    whodrinksButton.addEventListener('click', function() {
        var formData = new FormData();
        var imageFile = document.querySelector('#fileInput').files[0];
        formData.append('image', imageFile);

        fetch('https://pascalsq.pythonanywhere.com/classify', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // Save the data to local storage
                localStorage.setItem('imageResults', JSON.stringify(data));
                // Redirect to the whodrinks.html page
                window.location.href = 'whodrinks.html';
            })
            .catch((error) => {
                console.error('Error:', error);
                imageContainer.textContent = 'An error occurred while processing the image.';
            });
    });
});


