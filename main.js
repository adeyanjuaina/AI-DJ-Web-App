song="";
leftWristx=0;
leftWristy=0;
rigthWristx=0;
rigthWristy=0;
scoreleftWrist=0;
scorerightWrist=0;

function preload() {
    song=loadSound("music.mp3")
}


function setup() {
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide()

    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on('pose',gotposes);

}

function draw() {
    image(video,0,0,600,500);

    fill("#7f32a8");
    stroke("#7f32a8");
   
    if(scorerightWrist>0.2) {
        circle(rightWristx,rightWristy,20);

        if(rightWristy>0 && rightWristy<=100) {
            song.rate(0.5);
            document.getElementById("speed").innerHTML="Speed : 0.5x";
        }

        else if(rightWristy>100 && rightWristy<=200) {
            song.rate(1);
            document.getElementById("speed").innerHTML="Speed : 1x";
        }

        else if(rightWristy>200 && rightWristy<=300) {
            song.rate(1.5);
            document.getElementById("speed").innerHTML="Speed : 1.5x";
        }

       else if(rightWristy>300 && rightWristy<=400) {
            song.rate(2);
            document.getElementById("speed").innerHTML="Speed : 2x";
        }

       else if(rightWristy>400 && rightWristy<=500) {
            song.rate(2.5);
            document.getElementById("speed").innerHTML="Speed : 2.5x";
        }
    }

    if(scoreleftWrist>0.2) {
        circle(leftWristx,leftWristy,20);
        numberleftWristy=Number(leftWristy);
        remove_decimals=floor(numberleftWristy);
        volume=remove_decimals/500;
        song.setVolume(volume);
        document.getElementById("volume").innerHTML="Volume - "+volume;
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);

}
function modelLoaded() {
    console.log("poseNet has started")
}

function gotposes(results) {
    if(results.length>0){
        console.log(results);

        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;

       
       
        scoreleftWrist=results[0].pose.keypoints[9].score;
        scorerightWrist=results[0].pose.keypoints[10].score;

        console.log("leftWristx= "+leftWristx+" ,leftWristy= "+leftWristy);
        console.log("rightWristx= "+rightWristx+" ,rightWristy= "+rightWristy);
    }
}