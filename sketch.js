 var obstacle, obstacleImage, obstacleGroup;
  var banana, bananaImage, bananaGroup;
  var monkey, monkey_running;
  var backgroundy, backgroundImage;
  var score= 0;
  var ground;

function preload(){
 
    backgroundImage= loadImage("jungle.jpg");
  
 
  monkey_running= loadAnimation ("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  

    bananaImage= loadImage("banana.png");
    obstacleImage= loadImage("stone.png");
}

function setup() {
 
    createCanvas(400,400);
  

    backgroundy= createSprite (200,200);
    backgroundy.addImage ("backgroundimage", backgroundImage);
    backgroundy.x = backgroundy.width/2;
    backgroundy.velocityX= -2;
    

    monkey= createSprite (50,340,10,10);
    monkey.addAnimation ("monkeyrunning", monkey_running);
    monkey.scale= 0.1;
  
  
    ground= createSprite (0,390,800,10);
    ground.visible= false;
  

    bananaGroup= new Group ();
    obstacleGroup= new Group ();
}

function draw() {

    background("white");

  
    console.log(monkey.y);
  

    if (backgroundy.x<150) {
      backgroundy.x= 200
    }   
  

    if (keyDown ("space")&& monkey.y>=355) {
      monkey.velocityY= -20;  
    }    
    
  
    monkey.velocityY= monkey.velocityY + 0.8;
  
 
    monkey.collide (ground);
  
  if(backgroundy.x<0){
  backgroundy.x=backgroundy.width/2;

  }
  

    if (bananaGroup.isTouching(monkey)) {
      score= score+2;
      bananaGroup.destroyEach();
    }
  
    switch (score) {
      case 1: monkey.scale= 0.15;
      break;
      case 2: monkey.scale= 0.20;
      break;
      case 3: monkey.scale= 0.25;
      break;
      case 4: monkey.scale= 0.30;
      break;
      case 5: monkey.scale= 0.35;
      break;
      default: break;
    }
  
    if (obstacleGroup.isTouching(monkey)) {
      score= score-1;
      obstacleGroup.destroyEach();
      monkey.scale= 0.1;
    }
  
   

    spawnBananas();
    spawnObstacles();
 
    drawSprites();
  
  //displaying score
    stroke ("white");
    textSize (15);
    text ("Score: "+score,190,70);  
}

function spawnBananas () {
  if (frameCount%100===0) {
    banana= createSprite (360,120,10,10);  
    banana.addImage ("bananaimage", bananaImage);
    banana.scale= 0.06;
    banana.velocityX= -3;
    
    //adding lifetime to bananas
      banana.lifetime= 150;
    
    //adding banana to banana group
      bananaGroup.add(banana);
  }
}


function spawnObstacles () {
  if (frameCount%90===0) {
    obstacle= createSprite (400,370,10,10);
    obstacle.addImage ("obstacleimage", obstacleImage);
    obstacle.scale= 0.2;
    obstacle.velocityX= -4;
    
    //adding obstacle to obstacle group
      obstacleGroup.add(obstacle);
  }
}