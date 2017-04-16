const x = 10;
const y = 10;

function cellClicked(e) {
    var $src = $(e.target);
    if($src.hasClass('clicked')){
    $src.removeClass('clicked');
  } else {
    $src.addClass('clicked');
  }
  let y = e.target.parentNode.rowIndex;
  let x = e.target.cellIndex;
}

function getCell(q, w) {
    return $("#cell_" + q + "_" + w);
}

function getNeighbors(q, w) {
    // x-1,y-1   x,y-1   x+1,y-1
    // x-1,y     x,y     x+1,y
    // x-1,y+1   x,y+1   x+1, y+1
    let y = w;
    let x = q;

    let xe = x-1;
    let xw = x+1;
    let yn = y-1;
    let ys = y+1;

    let $ne = getCell(xe, yn);
    let $n  = getCell(x,  yn);
    let $nw = getCell(xw, yn);
    let $e  = getCell(xe,  y);
    let $w  = getCell(xw,  y);
    let $se = getCell(xe, ys);
    let $s  = getCell(x,  ys);
    let $sw = getCell(xw, ys);

    return [$ne,$n,$nw,$e,$w,$se,$s,$sw];
}

function countNeighboringLives(q, w) {
    let count = 0;
    let neighbors = getNeighbors(q, w);
    for (let w = 0; w < neighbors.length; w++) {
        if(neighbors[w].hasClass('clicked')) {
            count++;
        }
    }
    return count;
}

function buildGameBoard(x, y) {
    let $board = $('<table>');
    for (let w = 0; w < y; w++) {
        let $row = $('<tr>');

        $board.append($row);
        for(let q = 0; q < x; q++) {
            let $cell = $('<td>');

            $row.append($cell);
            $cell.attr('id', 'cell_' + q + '_' + w);
            $cell.on('click', cellClicked);
        }
    }
    $('#gameBoard').append($board);
}

function checkCells(x, y){
  for(var w = 0; w < y; w++){
    for(var q = 0; q < x; q++){
      let $cell = getCell(q, w);
      let neighbors = countNeighboringLives(q, w);
      if($cell.hasClass('clicked')){
        if(neighbors < 2 || neighbors > 3){
          $cell.addClass('dead_pending')
        }
      } else {
        if(neighbors === 3){
          $cell.addClass('live_pending')
        }
      }
    }
  }
}

function updateCells(){
  checkCells(x, y);
  for(var w = 0; w < y; w++){
    for(var q = 0; q < x; q++){
      let $cell = getCell(q, w);
      if($cell.hasClass('dead_pending')){
        $cell.removeClass('clicked');
        $cell.removeClass('dead_pending')
      } if($cell.hasClass('live_pending')){
        $cell.addClass('clicked');
        $cell.removeClass('live_pending');
      }
    }
  }
}


function runGame(x, y) {
  setInterval(updateCells, 500);
}

buildGameBoard(x, y);
