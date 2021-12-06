magic = ""
kissu = ""
magic1_status = ""
kissu2_status = ""
lwristX = 0
rwristX = 0
lwristY = 0
rwristY = 0
lwristScore = 0
rwristScore = 0

function preload() {
magic = loadSound("Magic- 1d.mp3")
kissu = loadSound("Kiss You- 1d.mp3")
}

function setup() {
canvas = createCanvas(350, 250)
canvas.position(1000, 30)

video = createCapture(VIDEO)
video.hide()

posenet = ml5.poseNet(video, modelLoaded)
posenet.on('pose', gotPoses)
}

function gotPoses(results) {
if (results.length > 0) {
console.log(results)
lwristX = results[0].pose.leftWrist.x;
lwristY = results[0].pose.leftWrist.y;
rwristX = results[0].pose.rightWrist.x;
rwristY = results[0].pose.rightWrist.y;
rwristScore = results[0].pose.keypoints[10].score;
lwristScore = results[0].pose.keypoints[9].score;
}
}



function modelLoaded() {
console.log("Model has been loaded!")
}

function draw() {
push();
translate(width, 0);
scale(-1, 1);
image(video, 0, 0, 450, 350)
pop()
//wrist positions
magic1_status = magic.isPlaying();
kissu2_status = kissu.isPlaying();
fill("red")
stroke("red")
if (rwristScore > 0.2) {
circle(rwristX, rwristY, 10);

kissu.stop();

if (magic1_status == false) {
magic.play();
document.getElementById("magic").innerHTML = "Playing- Magic"
document.getElementById("kiss").innerHTML = "Kiss You"
}
}

if (lwristScore > 0.2) {
circle(lwristX, lwristY, 10);

magic.stop();

if (kissu2_status == false) {
kissu.play();
document.getElementById("kiss").innerHTML = "Playing- Kiss You"
document.getElementById("magic").innerHTML = "Magic"
}
}

}