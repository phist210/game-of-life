function cell_clicked(e) {
    var $src = $(e.target);
    $src.toggleClass("clicked");
    console.log($src);
    let neighbors = getNeighbors(e.target);
    let count = countNeighboringLives(neighbors);
    console.log(count);
}

function runGame() {
    console.log("hi");
}

function getCell(x, y) {
    return $("#cell_" + x + "_" + y);
}

function getNeighbors(currentCell) {
    // x-1,y-1   x,y-1   x+1,y-1
    // x-1,y     x,y     x+1,y
    // x-1,y+1   x,y+1   x+1, y+1
    let y = currentCell.parentNode.rowIndex;
    let x = currentCell.cellIndex;

    let xe = x-1;
    let xw = x+1;
    let yn = y-1;
    let ys = y+1;

    let ne = getCell(xe, yn);
    let n  = getCell(x,  yn);
    let nw = getCell(xw, yn);
    let e  = getCell(xe,  y);
    let w  = getCell(xw,  y);
    let se = getCell(xe, ys);
    let s  = getCell(x,  ys);
    let sw = getCell(xw, ys);

    return [ne,n,nw,e,w,se,s,sw];
}

function countNeighboringLives(neighbors) {
    let count = 0;
    for (let i = 0; i < neighbors.length; i++) {
        if(neighbors[i].hasClass('clicked')) {
            count++;
        }
    }
    return count;
}

function buildGameBoard(x, y) {
    let $board = $('<table>');
    for (let i = 0; i < y; i++) {
        let $row = $('<tr>');

        $board.append($row);
        for(let j = 0; j < x; j++) {
            let $cell = $('<td>');

            $row.append($cell);
            $cell.attr('id', 'cell_' + j + '_' + i);
            $cell.on('click', cell_clicked);
        }
    }
    $('#gameBoard').append($board);
}

buildGameBoard(10, 10)
