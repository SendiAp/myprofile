document.addEventListener("DOMContentLoaded", function() {
    const likeButton = document.querySelector(".like-button");
    const unlikeButton = document.querySelector(".unlike-button");
    const giftButton = document.querySelector(".gift-button");

    let isLiked = false; // Status like

    likeButton.addEventListener("click", function() {
        if (!isLiked) {
            isLiked = true;
            likeButton.style.display = "none"; // Sembunyikan tombol like
            unlikeButton.style.display = "inline"; // Tampilkan tombol unlike
            console.log("Liked!");
        }
    });

    unlikeButton.addEventListener("click", function() {
        if (isLiked) {
            isLiked = false;
            unlikeButton.style.display = "none"; // Sembunyikan tombol unlike
            likeButton.style.display = "inline"; // Tampilkan tombol like
            console.log("Unliked!");
        }
    });

    giftButton.addEventListener("click", function() {
        // Fungsi untuk gift
        console.log("Gift button clicked!");
    });
});
