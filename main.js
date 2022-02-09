$(() => {
    // console.log("hello world")
    // prompt("Do you want to be X or O? (type answer")
    const tictactoebox = document.getElementsByClassName("box");
function addX (event){
    
  
    const newX = document.createElement("span");
    newX.innerHTML = "X";
    const squareDiv =  document.getElementById(event.target.id)
   squareDiv.classList.add("X");
   squareDiv.appendChild(newX);
}
function tictacbox (){
    for(let i = 0; i < tictactoebox.length; i++){
        tictactoebox[i].addEventListener("click", addX);
    }
}
tictacbox();

});
