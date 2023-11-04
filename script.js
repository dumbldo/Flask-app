// script.js

// This function is called when the user clicks on the "Upload" button

// script.js
// script.js
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
