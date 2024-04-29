let img;
let lineWidth = 3;
let lineColor = '#000000';
let mirrors = { vertical: true, horizontal: true, diagonal1: true, diagonal2: true };

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block'); // Remove any default margins
    background(255);
    img = createGraphics(windowWidth, windowHeight);
    img.strokeWeight(lineWidth);
    img.stroke(lineColor);

    // Setup event handlers as before
    document.getElementById('btnVertical').onclick = () => mirrors.vertical = !mirrors.vertical;
    document.getElementById('btnHorizontal').onclick = () => mirrors.horizontal = !mirrors.horizontal;
    document.getElementById('btnDiagonal1').onclick = () => mirrors.diagonal1 = !mirrors.diagonal1;
    document.getElementById('btnDiagonal2').onclick = () => mirrors.diagonal2 = !mirrors.diagonal2;
    document.getElementById('colorPicker').onchange = (e) => img.stroke(e.target.value);
    document.getElementById('lineWeight').oninput = (e) => img.strokeWeight(parseInt(e.target.value));
    document.getElementById('btnClear').onclick = clearCanvas;
}

function draw() {
    background(255);
    image(img, 0, 0);
    drawMirroredLines();

    // Custom cursor indicator
    fill(0); // Change color to lineColor for dynamic color, or to a fixed color like black
    noStroke();
    ellipse(mouseX, mouseY, lineWidth + 2, lineWidth + 2);
    stroke(0, 50);
    noFill();
    ellipse(mouseX, mouseY, lineWidth + 1, lineWidth + 1);
}

function mouseDragged() {
    let x = mouseX, y = mouseY, px = pmouseX, py = pmouseY;
    if (mouseButton === LEFT) {
        drawLine(x, y, px, py);
    }
}

function drawLine(x, y, px, py) {
    img.line(x, y, px, py); // Original line
    if (mirrors.vertical) img.line(width - x, y, width - px, py); // Vertical mirror
    if (mirrors.horizontal) img.line(x, height - y, px, height - py); // Horizontal mirror
    if (mirrors.diagonal1) img.line(width - x, height - y, width - px, height - py); // Diagonal 1 mirror
    //if (mirrors.diagonal2) img.line(y, x, py, px); // Diagonal 2 mirror
}

function clearCanvas() {
    img.clear();
}

function drawMirroredLines() {
    stroke(0, 50);
    if (mirrors.vertical) line(width / 2, 0, width / 2, height);
    if (mirrors.horizontal) line(0, height / 2, width, height / 2);
    if (mirrors.diagonal1) line(0, 0, width, height);
    if (mirrors.diagonal2) line(width, 0, 0, height);
}
