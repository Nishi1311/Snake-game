// Game Constants & Variables
let dir = {x: 0, y: 0}; 
const eatmusic=new Audio('eat.mp3')
const gamepausemusic=new Audio('gamepause.mp3');
let speed = 5;
let PaintTime = 0;
let Score=0;
let HighScore=0;
let Play=false;
document.querySelector('.scorediv').textContent= Score;
document.querySelector('.highscorediv').textContent= HighScore;
let playbtn=document.querySelector('.btn')
let snake = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};

// Game Functions
function main(time) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((time - PaintTime)/1000 < 1/speed){
        return;
    }
    PaintTime = time;
    gameEngine();
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
        gamepausemusic.play();
        if(Score>HighScore){
            HighScore=Score
            document.querySelector('.highscorediv').textContent= HighScore;
        }
        dir =  {x: 0, y: 0}; 
        document.querySelector('.msg').textContent='oops!Game Over.';
        
        snake = [{x: 13, y: 15}];
        play=true
       
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
    //bodydiv.appendChild(foodElement);
    document.getElementById("gamediv").appendChild(foodElement);


}


// Main logic starts here


window.requestAnimationFrame(main);

/*window.addEventListener('keydown', e =>{
    dir = {x: 0, y: 1} // Start the game
    
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

});*/
//play again
playbtn.addEventListener('click',function(){
Score=0
document.querySelector('.scorediv').textContent= Score;
document.querySelector('.msg').textContent='Start the Game...';

window.addEventListener('keydown', e =>{
    dir = {x: 0, y: 1} // Start the game
    
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

});

})