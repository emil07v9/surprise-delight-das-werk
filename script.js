let points;
let liv;
// Array med alle positioner
let posArray = ["pos1", "pos2", "pos3", "pos4", "pos5", "pos6", "pos7", "pos8"];
//Timer, score og elementer
const timer = document.querySelector("#time_board_container");
const scoreBoard = document.querySelector("#score_board");
const hekscontainer = document.querySelector("#heks_container");
const knivmandcontainer = document.querySelector("#knivmand_container");
const zombiecontainer1 = document.querySelector("#zombie_container1");
const zombiecontainer2 = document.querySelector("#zombie_container2");
// Skærme, knapper, point
const startScreen = document.querySelector("#start");
const startKnap = document.querySelector("#start_knap");
const regelKnap = document.querySelector("#regelknap");
const regelScreen = document.querySelector("#regler");
const startKnap2 = document.querySelector("#start_knap2");
const gameScreen = document.querySelector("#game");
const lvlComScreen = document.querySelector("#level_complete");
const lvlComKnap = document.querySelector("#genstart2");
const lvlComPoints = document.querySelector("#level_complete_points");
const gameOverScreen = document.querySelector("#game_over");
const gameOverKnap = document.querySelector("#genstart1");
const gameOverPoints = document.querySelector("#game_over_points");
const liv1 = document.querySelector("#liv1");
const liv2 = document.querySelector("#liv2");
const liv3 = document.querySelector("#liv3");
//Lyde
const creepySound = document.querySelector("#creepy");
const klingSound = document.querySelector("#kling");
const plingSound = document.querySelector("#pling");
const buzzSound = document.querySelector("#buzz");


window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");

    //    Skjul skærmene
    gameScreen.classList.add("skjul");
    lvlComScreen.classList.add("skjul");
    gameOverScreen.classList.add("skjul");
    regelScreen.classList.add("skjul");

    //    Lyt efter klik på knapper
    regelKnap.addEventListener("click", regelSiden);
    startKnap.addEventListener("click", startSpillet);
}

function regelSiden() {
    console.log("regelSiden");

    //Ryd op
    regelKnap.removeEventListener("click", regelSiden);

    //    Skjul skærmene
    gameScreen.classList.add("skjul");
    lvlComScreen.classList.add("skjul");
    gameOverScreen.classList.add("skjul");
    startScreen.classList.add("skjul");

    //Vis skærm
    regelScreen.classList.remove("skjul");

    //Lyt efter start
    startKnap2.addEventListener("click", startSpillet);
}

function startSpillet() {
    console.log("startSpillet");

    //Ryd op
    startKnap.removeEventListener("click", startSpillet);
    startKnap2.removeEventListener("click", startSpillet);
    gameOverKnap.removeEventListener("click", startSpillet);
    lvlComKnap.removeEventListener("click", startSpillet);

    //Baggrunds musik
    creepySound.currentTime = 0;
    creepySound.volume = 0.2;
    creepySound.play();

    //Nulstil point + liv
    points = 0;
    liv = 3;
    liv1.classList.remove("skjul");
    liv2.classList.remove("skjul");
    liv3.classList.remove("skjul");

    //    Skjul skærmene
    lvlComScreen.classList.add("skjul");
    gameOverScreen.classList.add("skjul");
    startScreen.classList.add("skjul");
    regelScreen.classList.add("skjul");

    // Vis startskærm
    gameScreen.classList.remove("skjul");

    //Udskriv points
    scoreBoard.innerHTML = points;

    //start en timer-animation
    timer.firstElementChild.classList.add("time");

    timer.addEventListener("animationend", stopSpillet);

    posArray = ["pos1", "pos2", "pos3", "pos4", "pos5", "pos6", "pos7", "pos8"];
    //Blander posArray en funktion i bunden
    shuffle(posArray);

    myRand = Math.floor(Math.random() * 5) + 1;
    console.log(myRand);
    //Giv container en position, start hop-animation og start delay + speed
    hekscontainer.classList.add(posArray.shift(), "hop", "delay1", "speed" + myRand);
    knivmandcontainer.classList.add(posArray.shift(), "hop", "delay2", "speed" + myRand);
    zombiecontainer1.classList.add(posArray.shift(), "hop", "delay1", "speed" + myRand);
    zombiecontainer2.classList.add(posArray.shift(), "hop", "delay3", "speed" + myRand);

    //Lyt efter hop-animationer færdig
    hekscontainer.addEventListener("animationiteration", badReset);
    knivmandcontainer.addEventListener("animationiteration", badReset);
    zombiecontainer1.addEventListener("animationiteration", goodReset);
    zombiecontainer2.addEventListener("animationiteration", goodReset);

    //Lyt efter klik på alle elementer
    hekscontainer.addEventListener("mousedown", klikBadHandler);
    knivmandcontainer.addEventListener("mousedown", klikBadHandler);
    zombiecontainer1.addEventListener("mousedown", klikGoodHandler);
    zombiecontainer2.addEventListener("mousedown", klikGoodHandler);

    //Lytter efter om tiden er gået
    timer.firstElementChild.addEventListener("animationend", stopSpillet);
}

function klikBadHandler() {
    console.log("klikBadHandler");

    //ryd op, så man ikke kan kilkke på den samme flere gange
    this.removeEventListener("mousedown", klikBadHandler);

    //frys (pause), hop-animationen
    this.classList.add("pause");

    //Afspil lyd
    buzzSound.currentTime = 0;
    buzzSound.volume = 0.1;
    buzzSound.play();

    //Start forsvind-animationer på sprite element
    this.firstElementChild.classList.add("roter_forsvind");

    //Liv
    document.querySelector("#liv" + liv).classList.add("skjul");
    liv--;

    //Lyt efter hop-animationer færdig
    this.addEventListener("animationend", badReset);

    if (liv <= 0) {
        console.log("liv <= 0")
        stopSpillet();
    }
}

function badReset() {
    console.log("badReset");

    //Lyt efter animationend færdig
    this.removeEventListener("animationend", badReset);

    //Laver classList om til en string (bogstaver)
    let test = String(this.classList);

    //Gemmer den class der har pos og et tal efter f.eks. pos8 og laver det om til en string
    let matches = String(test.match(/pos\d+/));

    //Sætter den positioner der var på elemetet tilbage i arrayet
    posArray.push(matches);

    //ryd op, fjern alt er på container og sprite
    this.classList = "";
    this.firstElementChild.classList = "";

    //For at kunne genstarte hop animationen, da vi fjener og tilføjer den i samme function
    this.offsetHeight;

    //Blander posArray en funtion i bunden igen
    shuffle(posArray);

    //Giv en position til container og start hop-animation
    this.classList.add(posArray.shift(), "hop");

    myRand = Math.floor(Math.random() * 5) + 1;
    console.log(myRand);

    //Start random speed
    this.classList.add("speed" + myRand);

    //Lyt efter klik på element
    this.addEventListener("mousedown", klikBadHandler);
}

function klikGoodHandler() {
    console.log("klikGoodHandler");

    //ryd op, så man ikke kan kilkke på den samme flere gange
    this.removeEventListener("mousedown", klikGoodHandler);

    //frys (pause), hop-animationen
    this.classList.add("pause");

    //Spil lyd
    let ran = Math.random();
    if (ran < 0.3) {
        klingSound.currentTime = 0;
        klingSound.volume = 0.1;
        klingSound.play();
    } else {
        plingSound.currentTime = 0;
        plingSound.volume = 0.1;
        plingSound.play();
    }

    //Start forsvind-animationer på sprite element
    this.firstElementChild.classList.add("zoom_forsvind");

    //Point - spil
    points = points + 1;
    scoreBoard.textContent = points;

    //Lyt efter hop-animation færdig
    this.addEventListener("animationend", goodReset);

    if (points >= 20) {
        console.log("points >= 20");
    } else if (points >= 20) {
        console.log("points >= 20");
    } else {
        console.log("else");
    }
}

function goodReset() {
    console.log("goodReset");

    //Lyt efter animationend færdig
    this.removeEventListener("animationend", goodReset);

    //Laver classList om til en string (bogstaver)
    let test = String(this.classList);

    //Gemmer den class der har pos og et tal efter f.eks. pos8 og laver det om til en string
    let matches = String(test.match(/pos\d+/));

    //Sætter den positioner der var på elemetet tilbage i arrayet
    posArray.push(matches);

    //ryd op, fjern alt er på container og sprite
    this.classList = "";
    this.firstElementChild.classList = "";

    //For at kunne genstarte hop animationen, da vi fjener og tilføjer den i samme function
    this.offsetHeight;

    //Blander posArray en funtion i bunden igen
    shuffle(posArray);

    //Giv en position til container og start hop-animation
    this.classList.add(posArray.shift(), "hop");

    myRand = Math.floor(Math.random() * 5) + 1;
    console.log(myRand);
    //Start random speed
    this.classList.add("speed" + myRand);

    //Lyt efter klik på element
    this.addEventListener("mousedown", klikGoodHandler);
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function stopSpillet() {
    console.log("stopSpillet");
    //fjern alt på alle container og sprite
    document.querySelector("#zombie_container1").classList = "";
    document.querySelector("#zombie_sprite1").classList = "";
    document.querySelector("#zombie_container2").classList = "";
    document.querySelector("#zombie_sprite2").classList = "";
    document.querySelector("#heks_container").classList = "";
    document.querySelector("#heks_sprite").classList = "";
    document.querySelector("#knivmand_container").classList = "";
    document.querySelector("#knivmand_sprite").classList = "";

    document.querySelector("#time_board_container").classList = "";
    document.querySelector("#time_board_sprite").classList = "";
    document.querySelector("#time_board_container").removeEventListener("animationend", stopSpillet);

    document.querySelector("#heks_container").removeEventListener("animationiteration", badReset);
    document.querySelector("#knivmand_container").removeEventListener("animationiteration", badReset);
    document.querySelector("#zombie_container1").removeEventListener("animationiteration", goodReset);
    document.querySelector("#zombie_container2").removeEventListener("animationiteration", goodReset);

    document.querySelector("#heks_container").removeEventListener("animationend", badReset);
    document.querySelector("#knivmand_container").removeEventListener("animationend", badReset);
    document.querySelector("#zombie_sprite1").removeEventListener("animationend", goodReset);
    document.querySelector("#zombie_sprite2").removeEventListener("animationend", goodReset);

    document.querySelector("#heks_container").removeEventListener("mousedown", klikBadHandler);
    document.querySelector("#knivmand_container").removeEventListener("mousedown", klikBadHandler);
    document.querySelector("#zombie_container1").removeEventListener("mousedown", klikGoodHandler);
    document.querySelector("#zombie_container2").removeEventListener("mousedown", klikGoodHandler);

    if (liv <= 0) {
        gameover();
    } else if (points >= 15) {
        levelComplete();
    } else {
        gameover();
    }

}

function gameover() {
    console.log("gameover");

    gameOverPoints.textContent = points;

    //    Vis gameover skærm
    gameOverScreen.classList.remove("skjul");

    //Lyt efter game_over
    gameOverKnap.addEventListener("click", startSpillet);
}

function levelComplete() {
    console.log("levelComplete");
    lvlComPoints.textContent = points;

    //    Vis lvlcom skærm
    lvlComScreen.classList.remove("skjul");

    //Lyt efter lvlcom knap
    lvlComKnap.addEventListener("click", startSpillet);
}
