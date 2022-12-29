let img = "";
let btn = document.querySelector('.home');
let status = "";
objects = [];
let status1 = document.querySelector('.status').innerHTML;



btn.addEventListener('click', function() {
        //Test to see if working
        console.log("Button clicked");
        window.location = "index.html";
    });

    function preload() {
        img = loadImage("pexels-jean-van-der-meulen-1454806.jpg");
    }

        function setup() {
        canvas = createCanvas(500, 500);
        canvas.center();
        objectDetector = ml5.objectDetector('cocossd', modelLoaded);
        document.querySelector('.status').innerHTML = "Detecting Objects";
    }


        function modelLoaded() {
            console.log("Model Loaded!");
            status = true;
        }

            window.setTimeout(draw, 1000);

        function gotResult(error, results) {
            if(error) {
                console.error(error);
            }
                else if(results) {
                    console.log(results);
                    objects = results;
                }
            }


            function draw() {

                
                if(status != "") {
                    objectDetector.detect(img, gotResult);
                    r = random(250);    
                    g = random(250);
                    b = random(250);
                        
                    image(img, 0, 0, 500, 500);                

                        for(i = 0; i < objects.length; i++) {
                        document.querySelector(".status").innerHTML = "Status : Object Detected.";
                        fill(r,g,b);
                        percent = floor(objects[i].confidence * 100);
                        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                        noFill();
                        stroke(r,g,b);
                        rect(objects[i].x, objects[i].y, objects[i].width + 15, objects[i].height + 15);
                        
                        if(objects.length == 1) {
                    document.querySelector("#noOfObjects").innerHTML = "There is " + objects.length + " object";
                        }                    
                            else if(objects.length > 1) {
                    document.querySelector("#noOfObjects").innerHTML = "There are " + objects.length + " objects";
                    document.querySelector(".status").innerHTML = "Status: Objects Found!";
                            }
                        // fill(r,g,b);
                        // percent = floor(objects[i].confidence * 100);
                        // text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                        // noFill();
                        // stroke(r,g,b);
                        // rect(objects[i].x, objects[i].y, objects[i].width + 15, objects[i].height + 15);
                    }
                }
            }