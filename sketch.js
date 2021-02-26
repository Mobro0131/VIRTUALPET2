//Create variables here
var dog,dogImage,happyDog,happyDogImage, dataBase, foodS, foodStock,readStock,lastFed;
 

function preload()
{
  //load images here
  dogImage=loadImage("images/dogImg.png")
  happyDogImage=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog=createSprite(250,250,20,20)
  dog.addImage(dogImage)
  dog.scale=0.2

  foodStock=database.ref('Food');
  foodStock.on("value",readStock)

  feed=createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

  foodObj= new Food();

}


function draw() {  
background(46, 139, 87)
drawSprites();
  //add styles here
  textSize(15)
  fill('black')
//  text("food remaining "+foodS,90,100)

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
})
  if(lastFed>=12){
    text("Last Feed : "+lastFed%12+" PM",350,30)
  }else if (lastFed==0){
    text("Last Feed : 12 AM",350,30)
  }else{
    text("Last Feed : "+ lastFed+ " AM", 350,30)
  }

}



function readStock(data){
  foodS=data.val()
  foodObj.updateFoodStock(FoodS)
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()

  }
)

}

function addFoods(){
  
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}
