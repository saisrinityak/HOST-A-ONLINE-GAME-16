var PLAY = 1;
var END = 0;
var gameState = 1;


var fruitGroup,enemyGroup;
var sword,swordImage;  
var monster,monsterImage;
var fruit1,fruit1Image;
var fruit2,fruit2Image;
var fruit3,fruit3Image;
var fruit4,fruit4Image;
var gameover,gameoverImage;
var score;
var knifeSwooshSound,gameoverSound;
var position;

function preload(){
  
  monsterImage = loadAnimation("alien1.png","alien2.png")
 
  
  fruit1Image = loadImage("fruit1.png")
  fruit2Image = loadImage("fruit2.png")
  fruit3Image = loadImage("fruit3.png")
  fruit4Image = loadImage("fruit4.png")
  
  
  gameoverImage = loadImage("gameover.png")
  
  
 swordImage = loadImage("sword.png")
  
  gameoverSound = loadSound("gameover.mp3")
 knifeSwooshSound = loadSound("knifeSwooshSound.mp3")
  
}

function setup(){
createCanvas(600,400)

  sword = createSprite(40,200,20,20)
  sword.addImage(swordImage)
  sword.scale = 0.7

   sword.setCollider("rectangle",0,0,40,40);
  
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  score = 0
  
}

function draw(){
background("lightblue")
  
  
  
  
  if(gameState === PLAY){
   
  fruits();
  Enemy();
  sword.y = World.mouseY;
  sword.x = World.mouseX;
  
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach()
    
    knifeSwooshSound.play();
    score = score + 1
    
    
    
  }else
  {

  
  

    
    
  if(enemyGroup.isTouching(sword)){
    gameState  = END
    
    gameoverSound.play();
    fruitGroup.destroyEach() 
     enemyGroup.destroyEach() 
    
    fruitGroup.setVelocityXEach(0)
    enemyGroup.setVelocityXEach(0)
    sword.addImage(gameoverImage)
    sword.x = 200;
    sword.y = 200;
  }
  } 
    
  }
  
  
  
   text("Score: "+ score, 500,50);
  
  
 
  
  
 drawSprites();  
}

function fruits(){

if(World.frameCount%80===0){
  position = Math.round(random(1,2))
  fruit = createSprite(400,200,20,20)
  
  if(position==1){
  fruit.x = 400
  fruit.velocityX = -(7+(score/4))
  }
  else{
    if(position==2){
      fruit.x = 0
    fruit.velocityX = +(7+(score/4))
  }
  }
    
  fruit.scale = 0.2
  
  r = Math.round(random(1,4))
  if(r == 1){
  fruit.addImage(fruit1Image)
  }else if (r == 2){
  fruit.addImage(fruit2Image)
  }else if (r == 3){
  fruit.addImage(fruit3Image)
  }else{
  fruit.addImage(fruit4Image)
  }
  fruit.y = Math.round(random(50,340))
  
    
    fruit.setlifetime = 100
    
    fruitGroup.add(fruit);

  
  
}
}

function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}
