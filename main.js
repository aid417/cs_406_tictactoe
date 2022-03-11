$(() => {
  const tictactoebox = document.getElementsByClassName("box");
  let xo_val = true;
  let x_values = [];
  let o_values = [];
  let game_won = false;
  let game_winner = null;
  let taken_squares = [];

  var turnCount = 0;  
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
      turnCount++;
      console.log(turnCount)
      x_values.push(parseInt(event.target.id));
      taken_squares.push(parseInt(event.target.id))
      const squareDiv = document.getElementById(event.target.id);
      squareDiv.classList.add("XO");
      squareDiv.appendChild(newXO);
      remove_square(parseInt(event.target.id))
      setTimeout(() => { check_winners(x_values, "X") }, 500);
      // check_winners(x_values, "X")
      if(game_won == false){
        setTimeout(() => { computerTurn() }, 500);
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
      computerTurn()
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
      
        if(available_squares.length == 0 && game_won == false){
          announce_tie()
        }
    
  }
  function announce_tie(){
    if(!alert('The game was tied!')){window.location.reload();}
  }
  function announce_winner(winner){
    if(!alert(`${winner} won this round!`)){window.location.reload();}
    

  }
  // function random_move(){
  //   arr_index = Math.floor(Math.random() * available_squares.length);
  //   const newXO = document.createElement("span");
  //   newXO.innerHTML = "O";
  //   o_values.push(available_squares[arr_index]);
  //   const squareDiv = document.getElementById(available_squares[arr_index]);
  //   squareDiv.classList.add("XO");
  //   squareDiv.appendChild(newXO);
  //   remove_square(available_squares[arr_index])
  //   setTimeout(() => { check_winners(o_values, "O") }, 500);
  //   // xo_val = !xo_val;
  // }
  function computer_square(square_id){
    const newXO = document.createElement("span");
      newXO.innerHTML = "O";
      o_values.push(square_id);
      const squareDiv = document.getElementById(square_id);
      squareDiv.classList.add("XO");
      squareDiv.appendChild(newXO);
      
      remove_square(square_id)
      taken_squares.push(square_id)
     
      setTimeout(() => { check_winners(o_values, "O") }, 500);
  }
  function computerTurn(){
    let next_move = null

    if(turnCount == 1){
      next_move = computeFirstMove();
      console.log(next_move)
    }
    if (next_move == null){
      next_move = computeFinishingMove();
    }

    if (next_move == null) {
      next_move = computeSavingMove();
      console.log(next_move)
    }
    if (next_move == null)
      next_move = predictTrappingMove();
    
    if (next_move == null) {
      next_move = computeRandomMove();
    }

   
    computer_square(next_move)
  }
  function computeFirstMove(){
    
    var playedMove = taken_squares[0]
    
    var edgeMoves = [1, 3, 5, 7];
    var cornerMoves = [0, 2, 6, 8];
    var centerMove = [4];
  
    corner_move = (cornerMoves.find(m => m == playedMove))
    
    if(edgeMoves.find(m => m == playedMove)){
    
      return edgeMoveResponse(playedMove);
    }
      
   if(corner_move == playedMove){
      
      move = 4
      return move;
    }
     
    if(centerMove.find(m => m == playedMove)){
      return cornerMoves[Math.floor(Math.random()*cornerMoves.length)];
    }

      
  }

  function edgeMoveResponse(playedMove){
  
    if(playedMove == 1) 
        return 0;
    else if (playedMove == 3) 
        return 6;
    else if (playedMove == 5) 
        return 2;
    else if(playedMove == 7) 
        return 6;
}
function check_possible_win(squares_taken){
  
    for(const combination of winning_combos){
        let winner = 0;
       for(let i = 0; i < combination.length; i++){
            for(let j = 0; j < squares_taken.length; j++){
                if(combination[i] == squares_taken[j]){
                    winner += 1;
                    if(winner == 3){
                      return true;
                      
                    }
                }
            }
       }
    }
  

}
function computeFinishingMove(){
    remainingMoves = available_squares
   

    if(o_values.length >= 2){
        for(square in available_squares){
          o_values.push(square)
          winning_move = check_possible_win(o_values)
          if(winning_move == true){
              o_values.pop()
              return square
          }
          else{
            o_values.pop()
          }
        }
        return null;
    }
    else{
        return null;
    }
}
function computeSavingMove(){
  remainingMoves = available_squares
  console.log(available_squares)
    if(x_values.length >= 2){
        for(let i = 0; i < available_squares.length; i ++){
          square = available_squares[i]
        
          x_values.push(parseInt(square))
          winning_move = check_possible_win(x_values)
    
          if(winning_move == true){
              x_values.pop()
           
              return square
          }
          else{
            x_values.pop()
       
          }
        }
        return null;
    }
    else{
        return null;
    }
}
});
