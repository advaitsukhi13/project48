var bg,bgImg;
var player,playerImg;
var npc1,npc1Img;
var npc2,npc2Img;
var chitauriGroup;
var heart1,heartImg;
var heart2,heart3;
var gameState = "fight";
//var END = 0;
var playerShooting;
var repulsor , repulsorImg;
var repulsorGroup ;
var life = 3;
var score = 0;

function preload() {
  bgImg=loadImage("assets/bg.jpg");

  playerImg=loadImage("assets/ironman.png");

  npc1Img=loadImage("assets/npc1.png");

  npc2Img=loadImage("assets/npc2.png");

  heartImg=loadImage("assets/heart.png");

  playerShooting=loadImage("assets/blast.png");

  repulsorImg = loadImage("assets/repulsor.png");

}


function setup() {
  createCanvas(windowWidth,windowHeight);
  bg=createSprite(displayWidth/2 , displayHeight/2 , 100, 100);
  bg.addImage(bgImg);
  bg.scale=1;

  player=createSprite(displayWidth-1000 , displayHeight-500 , 40, 40);
  player.addImage(playerImg);
  player.scale=0.35;

  chitauriGroup=new Group();

  repulsorGroup=new Group();

  npc2=createSprite(displayWidth-100,displayHeight-500,50,50);
  npc2.addImage(npc2Img);
  npc2.scale=0.35;
  npc2.velocityX=-3;
  npc2.setCollider("rectangle", 50, 50, 700, 700 , -45); 
  npc2.debug=true;
  npc2.setCollider.visible = false;
  

  heart1=createSprite(windowWidth-200 , windowHeight-500,50,50);
  heart1.addImage(heartImg);
  heart1.scale=0.25;
  
  heart2=createSprite(windowWidth-270 , windowHeight-500,50,50);
  heart2.addImage(heartImg);
  heart2.scale=0.25;

  heart3=createSprite(windowWidth-340 , windowHeight-500,50,50);
  heart3.addImage(heartImg);
  heart3.scale=0.25;

  

}

function draw() {
  background("white"); 

  if(gameState === "fight") {

  
  if(keyDown("UP_ARROW")){
     player.y=player.y-20;
  }
  if(keyDown("DOWN_ARROW")){
    player.y=player.y+20;
 }
  if(keyDown("RIGHT_ARROW")){
  player.x=player.x+20;
 }
  if(keyDown("LEFT_ARROW")){
  player.x=player.x-20;
 }
  if(keyDown("SPACE")){

    repulsor=createSprite(player.x-18 , player.y-18 , 50 , 50);
    repulsor.velocityX = +3;
    repulsor.addImage(repulsorImg);
    repulsor.scale=0.5;
        
    player.addImage(playerShooting);

    repulsorGroup.add(repulsor);  

   
    
  }
  else if(keyWentUp("SPACE")){

    player.addImage(playerImg);

  }
  if(life === 3){
    heart3.visible = true;
    heart2.visible = true;
    heart1.visible = true;
  }
  if(life === 2){
    heart3.visible = false;
    heart2.visible = true;
    heart1.visible = true;
  } 
  if(life === 1){
    heart3.visible = false;
    heart2.visible = false;
    heart1.visible = true;
  }
   if(life === 0){
    heart3.visible = false;
    heart2.visible = false;
    heart1.visible = false;
    gameState = "END";
  }

 

}else 
  if(gameState === "END"){
  textSize(60);
  fill("red");
  text("GAME OVER" , displayWidth/2 -50 , displayHeight/2 -50);
  chitauriGroup.destroyEach();
  player.destroy();
  
}else
if(gameState === "won"){
  textSize(60);
  fill("yellow");
  text("YOU WON" , displayWidth/2 -50 , displayHeight/2 -50);
  chitauriGroup.destroyEach();
  player.destroy();
  
}

if(chitauriGroup.isTouching(player))
{
 for(var i=0;i<chitauriGroup.length;i++)
 {
    if(chitauriGroup[i].isTouching(player))
    { 
      chitauriGroup[i].destroy()
      npc2.destroy()
      life = life-1;
      
      }
}
}
if(chitauriGroup.isTouching(repulsorGroup)){
  for(var i=0;i<chitauriGroup.length;i++){
    if(chitauriGroup[i].isTouching(repulsorGroup)){
      score = score+2 ;
      chitauriGroup[i].destroy() ;
      repulsorGroup.destroyEach() ;
    }
  }
}
  
  drawSprites();

textSize(25);  
fill("white");  
text("Score = "+score , displayWidth/2 -500 , displayHeight/2 - 300);
text("life = "+life , displayWidth/2 -500 , displayHeight/2 - 330);  

  enemy();
}

  
  


function enemy(){
  if(frameCount%90===0) {
    npc1=createSprite(random(800,1200),random(150,550),50,50);
    npc1.addImage(npc1Img);
    npc1.scale=0.35;
    npc1.velocityX=-3;
    if(chitauriGroup&npc2.isTouching(player)){
      
    }

   
    chitauriGroup.add(npc1);
  }
}



