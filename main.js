$(() => {
  const tictactoebox = document.getElementsByClassName("box");
  let xo_val = true;
  let x_values = [];
  let o_values = [];
  let game_won = false;
  let game_winner = null;
  let taken_squares = [];

  let turnCount = 0;  
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
    // console.log(available_squares);
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
      console.log(available_squares, 'x turn')
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
    console.log(square_id)
    const newXO = document.createElement("span");
      newXO.innerHTML = "O";
      o_values.push(square_id);
      const squareDiv = document.getElementById(square_id);
      squareDiv.classList.add("XO");
      squareDiv.appendChild(newXO);
      
      remove_square(square_id)
      console.log(available_squares, 'o, comp turn')
      taken_squares.push(square_id)
     
      setTimeout(() => { check_winners(o_values, "O") }, 500);
  }
  function computerTurn(){
    let next_move = 'false'
    // console.log(turnCount)
    if(turnCount == 1){
      next_move = computeFirstMove();
   
    
    }
    if(next_move == 'false'){
      next_move = computeFinishingMove()
      console.log(available_squares)
    }

    if (next_move == 'false') {
    
      next_move = computeSavingMove(o_values);
      console.log(available_squares)
    
    }
    if (next_move == 'false'){
      
      next_move = predictTrappingMove();
      console.log(next_move, 'trapping')
    }
     
    
    if (next_move == 'false') {
      console.log('random')
      next_move = computeRandomMove();
      console.log(next_move, 'random')
    }

   console.log(next_move)
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
    let remainingMoves = available_squares
   

    if(o_values.length >= 2){
        for(i = 0; i < remainingMoves.length; i++){
          square = remainingMoves[i]
          o_values.push(square)
          remove_square(square)
          winning_move = check_possible_win(o_values)
          if(winning_move == true){
              o_values.pop()
              available_squares.push(square)
              available_squares = remainingMoves
              return square
          }
          else{
            available_squares.push(square)
            available_squares = remainingMoves
            o_values.pop()
          }
        }
        available_squares = remainingMoves
        return 'false' ;
    }
    else{
      available_squares = remainingMoves
      return 'false';
    }
}
function computeSavingMove(player_vals){
  // console.log(available_squares, 'saving move')
  remainingMoves = available_squares
  // console.log(available_squares)
    if(player_vals.length >= 2){
        for(let i = 0; i < available_squares.length; i ++){
          square = remainingMoves[i]
        
          player_vals.push(parseInt(square))
          remove_square(square)
          winning_move = check_possible_win(player_vals)
    
          if(winning_move == true){
              player_vals.pop()
              // console.log('true')
              return square
          }
          else{
            player_vals.pop()
       
          }
        }
        return 'false' ;
    }
    else{
        return 'false';
    }
}
function predictTrappingMove(){

  let backup = available_squares

  var nextMove;
  var moveFound;
  // check to see if the opponent needs to play a saving move
  for(i = 0; i < available_squares.length; i++){
      o_values.push(backup[i])
      curr_move = backup[i]
      remove_square(backup[i])
      
      saving_move = computeSavingMove(x_values)
      if(saving_move != 'false'){
          x_values.push(saving_move)
          if(checkTrap() == true){
            x_values.pop()
            available_squares.push(curr_move)
            nextMove = curr_move;
            break;
          }
          x_values.pop()
          available_squares.push(curr_move)
      
          continue;
      }
  
      // if there is no saving move needed
      // current player is computer
     else{
       console.log(available_squares)
       console.log(backup)
       for(j = 0; j < backup.length; j++){
         moveFound = true// now current move is player
         x_values.push(backup[j])
         curr_move = backup[j]
         remove_square(available_squares[j])
         if(checkTrap() == true){
           moveFound = false
           x_values.pop()
           available_squares.push(curr_move)
           break;
         }
         x_values.pop()
          available_squares.push(curr_move)
         

       }
     }
     if(moveFound){
       nextMove = backup[i];
       break
     }
  }
  available_squares = backup
  // console.log(nextMove)
  return nextMove
}
function checkTrap(){
  let winningMoveCount = 0;
  for(i = 0; i < available_squares.length; i++){
    x_values.push(available_squares[i])
    poss_win = check_possible_win(x_values)
    if(poss_win == true){
      winningMoveCount++;
      x_values.pop()
    }
  }
  if(winningMoveCount > 1){
    return true
  }
  else{
    return false
  }
}

function computeRandomMove() {
  // console.log('true')
  move = available_squares[Math.floor(Math.random()*available_squares.length)]
  return move
}
});
