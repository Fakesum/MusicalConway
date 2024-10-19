import { useEffect, useState } from 'react';
import './App.css';

import GameBoard from './gameboard';
import * as Tone from 'tone'

export default function (){
  const collumns = 16;
  const rows = 16;
  const size = (rows*collumns);

  
  const [delay, setDelay] = useState(200);
  
  function mod(n, m) {
    return ((n % m) + m) % m;
  }
  
  const [interval, setinterval] = useState(null);

  const step = () => {
    var cells = document.querySelectorAll('.game-tile');
    var changes = [];
    cells.forEach((value, index) => {
      var surrounding_cells = [];
      var lives = 0;
      var dead = 0;

      const get_row_start = (i) => {
        return i - mod(i, collumns);
      }

      var row_start = get_row_start(index);
      
      surrounding_cells.push(cells[row_start + mod((index - 1), collumns)])
      surrounding_cells.push(cells[row_start + mod((index + 1), collumns)])
      
      var bottom_addr = mod((index + collumns), size);
      var bottom_row_start = get_row_start(bottom_addr);
      
      surrounding_cells.push(cells[bottom_addr])
      surrounding_cells.push(cells[bottom_row_start + mod((bottom_addr - 1), collumns)])
      surrounding_cells.push(cells[bottom_row_start + mod((bottom_addr + 1), collumns)])

      var top_addr = mod((index - collumns), size);
      var top_row_start = get_row_start(top_addr);

      surrounding_cells.push(cells[top_addr]);
      surrounding_cells.push(cells[top_row_start + mod((top_addr - 1), collumns)]);
      surrounding_cells.push(cells[top_row_start + mod((top_addr + 1), collumns)]);

      surrounding_cells.forEach((_value, index) => {
        if (_value.style.background == "white"){
          lives += 1;
        } else {
          dead += 1;
        }
      });

      if ((value.style.background == "white") && (((lives < 2) || (lives > 3)))){
          changes.push("transparent");
      } else if ((value.style.background == "transparent") && (lives == 3)){
          changes.push("white");
      } else {
        changes.push(value.style.background);
      }
    });
    cells.forEach((value, index) => {
      value.style.background = changes[index];
    });
  };

  return (
    <div className="Panel">
      <div className="game-board">
        {
          GameBoard(size).map((r)=>{return r})
        }
      </div>
      <input onChange={(event)=>{setDelay(event.currentTarget.value)}}></input>
      <button onClick={() => {
        if (interval != null){
          clearInterval(interval);
          setinterval(null);
        }
        setinterval(setInterval(step, delay));
      }}>Play</button>
      <button onClick={()=>{
        if (interval != null){
          clearInterval(interval);
          setinterval(null);
        }
      }
    }>Pause</button>
      <button onClick={()=>{step()}}>Step</button>
    </div>
  )
}