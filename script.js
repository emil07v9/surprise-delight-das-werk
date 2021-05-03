let points;
let liv;
const timer = document.querySelector("#time_board_container");
const scoreBoard = document.querySelector("#score_board");
const hekscontainer = document.querySelector("#heks_container");
const knivmandcontainer = document.querySelector("#knivmand_container");
const spoegelsecontainer = document.querySelector("#spoegelse_container");
const zombiecontainer1 = document.querySelector("#zombie_container1");
const zombiecontainer2 = document.querySelector("#zombie_container2");
// Skærme, knapper, point
const startScreen = document.querySelector("#start");
const startKnap = document.querySelector("#start_knap");
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


window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");

    //    Skjul skærmene
    gameScreen.classList.add("skjul");
    lvlComScreen.classList.add("skjul");
    gameOverScreen.classList.add("skjul");

    //    Lyt efter klik på startknap
    startKnap.addEventListener("click", startSpillet);
}

function startSpillet() {
    console.log("startSpillet")

    //Ryd op
    gameOverKnap.removeEventListener("click", startSpillet);
    lvlComKnap.removeEventListener("click", startSpillet);

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

    // Vis startskærm
    gameScreen.classList.remove("skjul");

    //Udskriv points
    scoreBoard.innerHTML = points;

    //start en timer-animation
    timer.firstElementChild.classList.add("time");

    timer.addEventListener("animationend", stopSpillet);


    //Giv container en position, start hop-animation og start delay + speed
    hekscontainer.classList.add("pos1", "hop", "delay1", "speed1");
    knivmandcontainer.classList.add("pos3", "hop", "delay2", "speed2");
    spoegelsecontainer.classList.add("pos5", "hop", "delay3", "speed3");
    zombiecontainer1.classList.add("pos2", "hop", "delay1", "speed1");
    zombiecontainer2.classList.add("pos6", "hop", "delay3", "speed3");

    //Lyt efter hop-animationer færdig
    hekscontainer.addEventListener("animationiteration", badReset);
    knivmandcontainer.addEventListener("animationiteration", badReset);
    spoegelsecontainer.addEventListener("animationiteration", badReset);
    zombiecontainer1.addEventListener("animationiteration", goodReset);
    zombiecontainer2.addEventListener("animationiteration", goodReset);

    //Lyt efter klik på alle elementer
    hekscontainer.addEventListener("mousedown", klikBadHandler);
    knivmandcontainer.addEventListener("mousedown", klikBadHandler);
    spoegelsecontainer.addEventListener("mousedown", klikBadHandler);
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

    //ryd op, fjern alt er på container og sprite
    this.classList = "";
    this.firstElementChild.classList = "";

    //For at kunne genstarte hop animationen, da vi fjener og tilføjer den i samme function
    this.offsetHeight;

    myRand = Math.floor(Math.random() * 8) + 1;
    console.log(myRand);

    //Giv en position til container og start hop-animation
    this.classList.add("pos" + myRand, "hop");

    myRand = Math.floor(Math.random() * 3) + 1;
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

    //Start forsvind-animationer på sprite element
    this.firstElementChild.classList.add("zoom_forsvind");

    //Point - spil
    points = points + 5;
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

    //ryd op, fjern alt er på container og sprite
    this.classList = "";
    this.firstElementChild.classList = "";

    //For at kunne genstarte hop animationen, da vi fjener og tilføjer den i samme function
    this.offsetHeight;

    myRand = Math.floor(Math.random() * 8) + 1;
    console.log(myRand);
    //Giv en position til container og start hop-animation
    this.classList.add("pos" + myRand, "hop");

    myRand = Math.floor(Math.random() * 3) + 1;
    console.log(myRand);
    //Start random speed
    this.classList.add("speed" + myRand);

    //Lyt efter klik på element
    this.addEventListener("mousedown", klikGoodHandler);
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
    document.querySelector("#spoegelse_container").classList = "";
    document.querySelector("#spoegelse_sprite").classList = "";

    document.querySelector("#time_board_container").removeEventListener("animationend", stopSpillet);

    document.querySelector("#heks_container").removeEventListener("animationiteration", badReset);
    document.querySelector("#knivmand_container").removeEventListener("animationiteration", badReset);
    document.querySelector("#spoegelse_container").removeEventListener("animationiteration", badReset);
    document.querySelector("#zombie_container1").removeEventListener("animationiteration", goodReset);
    document.querySelector("#zombie_container2").removeEventListener("animationiteration", goodReset);

    document.querySelector("#heks_container").removeEventListener("animationend", badReset);
    document.querySelector("#knivmand_container").removeEventListener("animationend", badReset);
    document.querySelector("#spoegelse_container").removeEventListener("animationend", badReset);
    document.querySelector("#zombie_sprite1").removeEventListener("animationend", goodReset);
    document.querySelector("#zombie_sprite2").removeEventListener("animationend", goodReset);

    document.querySelector("#heks_container").removeEventListener("mousedown", klikBadHandler);
    document.querySelector("#knivmand_container").removeEventListener("mousedown", klikBadHandler);
    document.querySelector("#spoegelse_container").removeEventListener("mousedown", klikBadHandler);
    document.querySelector("#zombie_container1").removeEventListener("mousedown", klikGoodHandler);
    document.querySelector("#zombie_container2").removeEventListener("mousedown", klikGoodHandler);

    if (liv <= 0) {
        gameover();
    } else if (points >= 20) {
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
