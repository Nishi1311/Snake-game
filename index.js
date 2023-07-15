// Game Constants & Variables
let dir = {x: 0, y: 0}; 
const eatmusic=new Audio('eat.mp3')
const gamepausemusic=new Audio('gamepause.mp3');
let Score=0;
let HighScore=0;
let gameover=false;
document.querySelector('.scorediv').textContent= Score;
document.querySelector('.highscorediv').textContent= HighScore;
let playbtn=document.querySelector('.btn1')
let playagainbtn=document.querySelector('.btn')
playagainbtn.classList.add('hidden');
let snake = [
    {x: 13, y: 15}
];
food = {x: 6, y: 7};
//code starts
        function keypress(){
            playbtn.classList.add('hidden');
            document.addEventListener("keyup", changeDirection);}
            playbtn.addEventListener('click',keypress);  
            setInterval(gameEngine, 1000/5); 

function changeDirection(e){
   dir = {x: 0, y: 1}
    
    switch (e.key) {
        case "ArrowUp":
            
            dir.x = 0;
            dir.y = -1;
            
            break;

        case "ArrowDown":
            
            dir.x = 0;
            dir.y = 1;
           
            break;

        case "ArrowLeft":
            
            dir.x = -1;
            dir.y = 0;
            
            break;

        case "ArrowRight":
            
            dir.x = 1;
            dir.y = 0;
            
            break;
        default:
            break;

          
    }

}
function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}
function gameEngine(){
    if(gameover){
        document.removeEventListener("keyup", changeDirection);
        gameover=false;
        playagainbtn.addEventListener('click',function(){
            Score=0
            document.querySelector('.scorediv').textContent= Score;
            document.querySelector('.msg').textContent='Start the Game...';
            playagainbtn.classList.add('hidden');
            playbtn.classList.add('hidden');
            document.addEventListener("keyup", changeDirection);
            setInterval(gameEngine, 2000)           
                })
        
    }
  
    

    // If you have eaten the food, increment the score and regenerate the food
    if(snake[0].y === food.y && snake[0].x ===food.x){
        eatmusic.play();
        Score=Score+1;
        document.querySelector('.scorediv').textContent= Score;

        
        snake.unshift({x: snake[0].x + dir.x, y: snake[0].y + dir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }
     // Part 1: Updating the snake array & Food
     if(isCollide(snake)){
            gameover=true;
            playagainbtn.classList.remove('hidden');
            playbtn.classList.add('hidden');
            if(Score>HighScore){
                HighScore=Score
                document.querySelector('.highscorediv').textContent= HighScore;
            }
            dir =  {x: 0, y: 0}; 
        document.querySelector('.msg').textContent='oops!Game Over.';
        
        snake = [{x: 13, y: 15}];  
    }

    // Moving the snake
    for (let i = snake.length - 2; i>=0; i--) { 
        snake[i+1] = {...snake[i]};
    }

    snake[0].x += dir.x;
    snake[0].y += dir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    document.getElementById("gamediv").innerHTML = "";
    snake.forEach((e, index)=>{
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake');
        
        document.getElementById("gamediv").appendChild(snakeElement);
    });
    // Display the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    
    document.getElementById("gamediv").appendChild(foodElement);


}
