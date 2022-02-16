$(() => {
//   import GameWinners from "./gamewinners";
  // console.log("hello world")
  // prompt("Do you want to be X or O? (type answer")
  const tictactoebox = document.getElementsByClassName("box");
  let xo_val = true;
  let x_values = [];
  let o_values = [];
  let game_won = false;
  let game_winner = null;
  const winning_combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let available_squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  function remove_square(elem){
    for (let i = 0; i < available_squares.length; i++){
      if (available_squares[i] == elem){
        available_squares.splice(i, 1);
      }
    }
    console.log(available_squares);
  }
  // function to add either an x or an o depending on what is going on
  function addXO(event) {
    // console.log(event)
    const newXO = document.createElement("span");
    if (xo_val == true) {
      newXO.innerHTML = "X";
      x_values.push(parseInt(event.target.id));
      const squareDiv = document.getElementById(event.target.id);
      squareDiv.classList.add("XO");
      squareDiv.appendChild(newXO);
      remove_square(parseInt(event.target.id))
      setTimeout(() => { check_winners(x_values, "X") }, 500);
      // check_winners(x_values, "X")
      if(game_won == false){
        setTimeout(() => { random_move() }, 500);
      }
     
      
      // xo_val = !xo_val;
     
    } else {
      newXO.innerHTML = "O";
      o_values.push(parseInt(event.target.id));
      const squareDiv = document.getElementById(event.target.id);
      squareDiv.classList.add("XO");
      squareDiv.appendChild(newXO);
      remove_square(parseInt(event.target.id))
      check_winners(o_values, "O")
      random_move()
      xo_val = !xo_val;
     
    }
   
  }
  function tictacbox() {
    for (let i = 0; i < tictactoebox.length; i++) {
      tictactoebox[i].addEventListener("click", addXO);
    }
  }
  tictacbox();
  function check_winners(xo_arr, turn){
      if(xo_arr.length >= 3){
        for(const combination of winning_combos){
            let winner = 0;
           for(let i = 0; i < combination.length; i++){
                for(let j = 0; j < xo_arr.length; j++){
                    if(combination[i] == xo_arr[j]){
                        winner += 1;
                        if(winner == 3){
                            game_won = true;
                            game_winner = turn;
                            announce_winner(turn);
                            break;
                        }
                    }
                }
           }
        }
      }
    
  }
  function announce_winner(winner){
    if(!alert(`${winner} won this round!`)){window.location.reload();}
    

  }
  function random_move(){
    arr_index = Math.floor(Math.random() * available_squares.length);
    const newXO = document.createElement("span");
    newXO.innerHTML = "O";
    o_values.push(available_squares[arr_index]);
    const squareDiv = document.getElementById(available_squares[arr_index]);
    squareDiv.classList.add("XO");
    squareDiv.appendChild(newXO);
    remove_square(available_squares[arr_index])
    setTimeout(() => { check_winners(o_values, "O") }, 500);
    // xo_val = !xo_val;
  }
});
