import { useReducer, useState } from "react";

const KEYS = ["B", "C", "D", "E", "F", "G", "A"];

export default function GameBoard(number_of_tiles){
    var indents = [];
    for (var i = 0; i < number_of_tiles; i++){
        indents.push(<div className="game-tile" key={`game-tile-${i}`} onClick={(r,) => {
            r.target.style.background = (r.target.style.background == "white") ? "transparent" : "white";
        }} style={{background: "transparent"}}>{KEYS[i % KEYS.length]}</div>);
    }

    return indents;
}