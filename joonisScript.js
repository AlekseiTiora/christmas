function elka() {
    var t = document.getElementById("tahvel").getContext("2d")

    t.fillStyle = "#8B4513";
    t.fillRect(200, 440, 55, 60);

    t.fillStyle="Green";
    t.beginPath();
    t.moveTo(420,440);
    t.lineTo(225,305);
    t.lineTo(40,440);

    t.moveTo(380,340);
    t.lineTo(222,230);
    t.lineTo(80,340);

    t.moveTo(320,255);
    t.lineTo(222,130);
    t.lineTo(130,255);
    t.fill();
}

function joonista() {
    var t = document.getElementById("tahvel").getContext("2d");

    t.strokeStyle="red";
    t.beginPath();
    t.moveTo(275, 200);
    t.lineTo(160, 250);
    t.stroke();

    t.strokeStyle="yellow";
    t.beginPath();
    t.moveTo(355, 320);
    t.lineTo(160, 250);
    t.stroke();

    t.strokeStyle="#00FA9A";
    t.beginPath();
    t.moveTo(355, 320);
    t.lineTo(100, 400);
    t.stroke();

    t.strokeStyle="#00ff20";
    t.beginPath();
    t.moveTo(355, 440);
    t.lineTo(100, 400);
    t.stroke();


    t.beginPath();
    t.fillStyle = "red";
    t.arc(105,400,10,0, 2*Math.PI, true);
    t.fill();
    t.beginPath();
    t.fillStyle="yellow";
    t.arc(135,300,10,0, 2*Math.PI, true);
    t.fill();
    t.beginPath();
    t.fillStyle="#00FFFF";
    t.arc(290,400,10,0, 2*Math.PI, true);
    t.fill();
    t.beginPath();
    t.fillStyle="#7FFF00";
    t.arc(290,250,10,0, 2*Math.PI, true);
    t.fill();
    t.beginPath();
    t.fillStyle="#FF8C00";
    t.arc(220,340,10,0, 2*Math.PI, true);
    t.fill();
    t.beginPath();
    t.fillStyle="#e406ff";
    t.arc(290,310,10,0, 2*Math.PI, true);
    t.fill();
    t.beginPath();
    t.fillStyle="#0627ff";
    t.arc(170,250,10,0, 2*Math.PI, true);
    t.fill();
    t.beginPath();
    t.fillStyle="#7606ff";
    t.arc(200,200,10,0, 2*Math.PI, true);
    t.fill();

}
//star
function zvezda(){
    var t = document.getElementById("tahvel").getContext("2d");
    t.fillStyle="yellow";
    t.beginPath();
    t.moveTo(224,50);
    t.lineTo(240.5,85);
    t.lineTo(279,89.15);
    t.lineTo(251,115.5);
    t.lineTo(257.5,152.5);
    t.lineTo(224,137.5);
    t.lineTo(190.6,152.5);
    t.lineTo(197.5,115.5);
    t.lineTo(170.5,89);
    t.lineTo(207.5,84);
    t.lineTo(224,50);
    t.closePath();
    t.fill();

}
function sneg() {
    var t = document.getElementById("tahvel").getContext("2d");
    t.beginPath();
    t.fillStyle = "white";
    t.arc(230, 550, 40, 0, 2 * Math.PI, true); //x, y, R , arc-duga

    t.arc(440, 550, 75, 0, 2 * Math.PI, true); //x, y, R , arc-duga
    t.arc(278, 550, 20, 0, 2 * Math.PI, true); //x, y, R , arc-duga
    t.arc(500, 550, 70, 0, 2 * Math.PI, true); //x, y, R , arc-duga
    t.arc(180, 550, 50, 0, 2 * Math.PI, true); //x, y, R , arc-duga
    t.arc(100, 550, 80, 0, 2 * Math.PI, true); //x, y, R , arc-duga
    t.arc(50, 550, 70, 0, 2 * Math.PI, true); //x, y, R , arc-duga
    t.fill();
}


window.onload = function(){
    //canvas init
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    //canvas dimensions
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    //snowflake particles
    var mp = 100; //max particles
    var particles = [];
    for(var i = 0; i < mp; i++)
    {
        particles.push({
            x: Math.random()*W, //x-coordinate
            y: Math.random()*H, //y-coordinate
            r: Math.random()*4+1, //radius
            d: Math.random()*mp //density
        })
    }

    //Lets draw the flakes
    function draw()
    {
        ctx.clearRect(0, 0, W, H);

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        for(var i = 0; i < mp; i++)
        {
            var p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
        }
        ctx.fill();
        update();
    }

    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    var angle = 0;
    function update()
    {
        angle += 0.01;
        for(var i = 0; i < mp; i++)
        {
            var p = particles[i];
            //Updating X and Y coordinates
            //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
            //Every particle has its own density which can be used to make the downward movement different for each flake
            //Lets make it more random by adding in the radius
            p.y += Math.cos(angle+p.d) + 1 + p.r/2;
            p.x += Math.sin(angle) * 2;

            //Sending flakes back from the top when it exits
            //Lets make it a bit more organic and let flakes enter from the left and right also.
            if(p.x > W+5 || p.x < -5 || p.y > H)
            {
                if(i%3 > 0) //66.67% of the flakes
                {
                    particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
                }
                else
                {
                    //If the flake is exitting from the right
                    if(Math.sin(angle) > 0)
                    {
                        //Enter from the left
                        particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
                    }
                    else
                    {
                        //Enter from the right
                        particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
                    }
                }
            }
        }
    }

    //animation loop
    setInterval(draw, 33);
}

const canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext("2d");

canvas.width = (window.innerWidth * 90) / 100;
canvas.height = (window.innerHeight * 90) / 100;

ctx.fillRect(0, 0, canvas.width, canvas.height);