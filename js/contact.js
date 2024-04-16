document.addEventListener("DOMContentLoaded", function() {
    var header = document.querySelector('.header');
    var bricksContainer = document.querySelector('.bricks');
    var numBricks = 10;
    var bricks = [];

    for (var i = 0; i < numBricks; i++) {
        var brick = document.createElement('div');
        brick.classList.add('brick');
        bricksContainer.appendChild(brick);
        bricks.push(brick);
    }

    positionBricks();

    setInterval(function() {
        var fadeBricks = selectRandomBricks(4, bricks.length);

        fadeBricks.forEach(function(brick) {
            brick.style.opacity = 0;
        });

        setTimeout(function() {
            fadeBricks.forEach(function(brick) {
                randomizeBrickPosition(brick);
                brick.style.opacity = 1;
                toggleRandomColor(brick);
            });
        }, 1000);
    }, 3000);

    function randomizeBrickPosition(brick) {
        var headerWidth = header.clientWidth;
        var headerHeight = header.clientHeight;
        var brickWidth = brick.offsetWidth;
        var brickHeight = brick.offsetHeight;

        var minDistance = 20; // Minimum distance between bricks

        var randomLeft, randomTop;
        do {
            randomLeft = Math.random() * (headerWidth - brickWidth);
            randomTop = Math.random() * (headerHeight - brickHeight);
        } while (isOverlapping(randomLeft, randomTop, brickWidth, brickHeight, bricks));

        brick.style.left = randomLeft + 'px';
        brick.style.top = randomTop + 'px';
    }

    function positionBricks() {
        bricks.forEach(function(brick) {
            randomizeBrickPosition(brick);
            toggleRandomColor(brick);
        });
    }

    function selectRandomBricks(count, total) {
        var indices = [];
        while (indices.length < count) {
            var index = Math.floor(Math.random() * total);
            if (!indices.includes(index)) {
                indices.push(index);
            }
        }
        return indices.map(function(index) {
            return bricks[index];
        });
    }

    function toggleRandomColor(brick) {
        if (Math.random() < 0.5) {
            brick.classList.remove('light-sakura');
            brick.classList.add('dark-sakura');
        } else {
            brick.classList.remove('dark-sakura');
            brick.classList.add('light-sakura');
        }
    }

    function isOverlapping(x, y, width, height, bricksArray) {
        for (var i = 0; i < bricksArray.length; i++) {
            var brick = bricksArray[i];
            var rect = brick.getBoundingClientRect();
            if (x < rect.right && x + width > rect.left && y < rect.bottom && y + height > rect.top) {
                return true; // Overlapping
            }
        }
        return false; // Not overlapping
    }
});
