var utils = {};

// requestAnimationFrame for every brownser
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000/60);
        });
}

window.requestAnimationFrame = function (callback) {
    return window.setTimeout(callback, 1000/60);
};

utils.captureMouse = function (element) {
    var mouse = {x: 0, y: 0};
    
    element.addEventListener('mousemove', function (event) {
        var x, y;
        if (event.pageX || event.pageY) {
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        x -= element.offsetLeft;
        y -= element.offsetTop;

        mouse.x = x;
        mouse.y = y;
    }, false);

    return mouse;
};

// colorToRGB utils.colorToRGB(0xFFFF00, 0.6) to rgba(255,255,0,0.5)
utils.colorToRGB = function (color, alpha) {
    // if string format, convert to number
    if (typeof color === 'string' && color[0] === '#') {
        color = window.parseInt(color.slice(1), 16);
    }
    alpha = (alpha === undefined) ? 1 : alpha;
    // extract component values
    var r = color >> 16 & 0xff,
        g = color >> 8 & 0xff,
        b = color & oxff,
        a = (alpha < 0) ? 0 : ((alpha >1) ? 1 : alpha);

    // use 'rgba' if needed
    if (a === 1) {
        return "rgb("+ r + ","+ g+","+ b+")";
    } else {
        return "rgba("+ r +","+ g+","+ b +","+ a +")";
    }
};

// parseColor utils.parseColor(0xFFFF00) to #ffff00
utils.parseColor = function (color, toNumber) {
    if (toNumber === true) {
        if (typeof color === 'number') {
            return (color | 0); // chop off decimal
        }
        if (typeof color === 'string' && color[0] === '#') {
            color = color.slice(1);
        }

        return window.parseInt(color, 16);
    } else {
        if (typeof color === 'number') {
            // make sure our hexadecimal number ispadded out
            color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
        }
        return color;
    }
}

utils.preloadImage = function(imgUrl) {
    var image = new Image();
    image.src = 'images/tank/images/entity/' + imgUrl;
    return image;
}
