video="";
stat="";
objects=[];

function preload(){

    video=createVideo("video.mp4");
    video.hide();

}

function setup(){

    canvas=createCanvas(500,400);
    canvas.center();

}

function draw(){

    image(video,0,0,500,400);
    if(stat!=""){

        ObjectDetector.detect(video,gotResults);

        for(i=0; i<objects.length; i++){

            document.getElementById("status").innerHTML="Status : Object(s) detected successfully";
            document.getElementById("ObjectsDetected").innerHTML="Number of objects = "+objects.length;

            fill("#8b0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            stroke("#8b0000");
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        }
        
    
    }

}

function start(){

    ObjectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status : Object(s) are being detected";

}

function modelLoaded(){

    console.log("Model loaded");
    stat=true;
    video.loop();
    video.speed(1);
    video.volume(0);

}

function gotResults(error,results){

    if(error){

        console.log(error);

    }
    else{

        console.log(results);
        objects=results;

    }

}

