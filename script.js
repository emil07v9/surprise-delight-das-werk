let points;
let liv;

window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");

    //Nulstil point + liv
    points = 0;
    liv = 3;

    //Klik play
    startSpillet();
}

function startSpillet() {
    console.log("startSpillet")

    //Udskriv points
    document.querySelector("#score_board").innerHTML = points;

    myRand = Math.floor(Math.random() * 8) + 1;
    console.log(myRand);

    //start en timer-animation
    document.querySelector("#time_board_sprite").classList.add("time");

    //Giv container en position, start hop-animation og start delay + speed
    document.querySelector("#heks_container").classList.add("pos" + myRand, "hop", "delay1", "speed1");


    document.querySelector("#zombie_container1").classList.add("pos" + myRand, "hop", "delay2", "speed2");

    //Lyt efter hop-animationer færdig
    document.querySelector("#heks_container").addEventListener("animationiteration", heksReset);
    document.querySelector("#zombie_container1").addEventListener("animationiteration", zombie1Reset);

    //Lyt efter klik på alle elementer
    document.querySelector("#heks_container").addEventListener("mousedown", klikHeksHandler);
    document.querySelector("#zombie_container1").addEventListener("mousedown", klikZombie1Handler);

    //Lytter efter om tiden er gået
    document.querySelector("#time_sprite").addEventListener("animationend", stopSpillet);
}

function klikHeksHandler() {
    console.log("klikHeksHandler");

    //ryd op, så man ikke kan kilkke på den samme flere gange
    document.querySelector("#heks_container").removeEventListener("mousedown", klikHeksHandler);

    //frys (pause), hop-animationen
    document.querySelector("#heks_container").classList.add("pause");

    //Start forsvind-animationer på sprite element
    document.querySelector("#heks_sprite").classList.add("roter_forsvind");

    //Liv
    document.querySelector("#liv" + liv).classList.add("skjul");
    liv--;

    //Lyt efter hop-animationer færdig
    document.querySelector("#heks_container").addEventListener("animationend", heksReset);
}

function heksReset() {
    console.log("heksReset");

    //Lyt efter animationend færdig
    document.querySelector("#heks_container").removeEventListener("animationend", heksReset);

    //ryd op, fjern alt er på container og sprite
    document.querySelector("#heks_container").classList = "";
    document.querySelector("#heks_sprite").classList = "";

    //For at kunne genstarte hop animationen, da vi fjener og tilføjer den i samme function
    document.querySelector("#heks_container").offsetHeight;

    myRand = Math.floor(Math.random() * 8) + 1;
    console.log(myRand);
    //Giv en position til container og start hop-animation
    document.querySelector("#heks_container").classList.add("pos" + myRand, "hop");

    myRand = Math.floor(Math.random() * 3) + 1;
    console.log(myRand);

    //Start random speed
    document.querySelector("#heks_container").classList.add("speed" + myRand);

    //Lyt efter klik på element
    document.querySelector("#heks_container").addEventListener("mousedown", klikHeksHandler);
}

function klikZombie1Handler() {
    console.log("klikZombie1Handler");

    //ryd op, så man ikke kan kilkke på den samme flere gange
    document.querySelector("#zombie_container1").removeEventListener("mousedown", klikZombie1Handler);

    //frys (pause), hop-animationen
    document.querySelector("#zombie_container1").classList.add("pause");

    //Start forsvind-animationer på sprite element
    document.querySelector("#zombie_sprite1").classList.add("zoom_forsvind");

    //Point - spil
    points = points + 5;
    document.querySelector("#score_board").textContent = points;

    //Lyt efter hop-animation færdig
    document.querySelector("#zombie_sprite1").addEventListener("animationend", zombie1Reset);
}

function zombie1Reset() {
    console.log("zombie1Reset");

    //Lyt efter animationend færdig
    document.querySelector("#zombie_container1").removeEventListener("animationend", zombie1Reset);

    //ryd op, fjern alt er på container og sprite
    document.querySelector("#zombie_container1").classList = "";
    document.querySelector("#zombie_sprite1").classList = "";

    //For at kunne genstarte hop animationen, da vi fjener og tilføjer den i samme function
    document.querySelector("#zombie_container1").offsetHeight;

    myRand = Math.floor(Math.random() * 8) + 1;
    console.log(myRand);
    //Giv en position til container og start hop-animation
    document.querySelector("#zombie_container1").classList.add("pos" + myRand, "hop");

    myRand = Math.floor(Math.random() * 3) + 1;
    console.log(myRand);
    //Start random speed
    document.querySelector("#zombie_container1").classList.add("speed" + myRand);

    //Lyt efter klik på element
    document.querySelector("#zombie_container1").addEventListener("mousedown", klikZombie1Handler);
}

function stopSpillet() {
    console.log("tiden er gået, du har fået" + point + "point!");
}
