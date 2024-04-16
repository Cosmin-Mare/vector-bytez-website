document.addEventListener('DOMContentLoaded', function () {
    const carouselContainer = document.getElementById('carouselContainer');
    let isHovering = false;
    let scrollInterval;

    carouselContainer.addEventListener('mouseover', () => {
        isHovering = true;
        stopScrolling();
    });

    carouselContainer.addEventListener('mouseout', () => {
        isHovering = false;
        startScrolling();
    });

    function startScrolling() {
        if (!isHovering) {
            scrollInterval = setInterval(() => {
                carouselContainer.scrollBy({ left: 10, behavior: 'smooth' });
            }, 70);
        }
    }

    function stopScrolling() {
        clearInterval(scrollInterval);
    }

    startScrolling();
});
