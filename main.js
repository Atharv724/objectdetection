img = "";
s = "";
objects = [];
function preload(){
    img = loadImage("dog_cat.jpg");
}

function setup(){
    canvas = createCanvas(650, 400);
    canvas.center();
    webcam = createCapture(VIDEO);
    webcam.hide();
    objectDetector = ml5.objectDetector('cocossd', ModelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    
}

function ModelLoaded(){
 console.log("model has been loaded");
 s = true;

}

function gotResult(error, result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        objects = result;
    }
}

function draw(){
    image(webcam, 0, 0, 650, 400);
    

    if(s==true){
        objectDetector.detect(webcam, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("numberofobjects").innerHTML = "Number of Objects Detected: " + objects.length;
            fill("red");
            percent = Math.floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        
    }
}