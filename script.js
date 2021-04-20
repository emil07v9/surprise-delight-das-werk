window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");
    document.querySelector("#heks_container").classList.add("pos1", "hop");
    document.querySelector("#zombie_container1").classList.add("pos3", "hop");
    document.querySelector("#heks_container").addEventListener("mousedown", klikHeksHandler);
    document.querySelector("#zombie_container1").addEventListener("mousedown", klikZombie1Handler);
}

function klikHeksHandler() {
    console.log("klikHeksHandler");
    document.querySelector("#heks_container").removeEventListener("mousedown", klikHeksHandler);
    document.querySelector("#heks_container").classList.add("pause");
    document.querySelector("#heks_sprite").classList.add("roter_forsvind");
    document.querySelector("#heks_container").addEventListener("animationend", heksReset);
}

function heksReset() {
    console.log("heksReset");
    document.querySelector("#heks_container").classList = "";
    document.querySelector("#heks_sprite").classList = "";
    document.querySelector("#heks_container").removeEventListener("animationend", heksReset);
    document.querySelector("#heks_container").offsetHeight;
    document.querySelector("#heks_container").classList.add("pos2", "hop");
    document.querySelector("#heks_container").addEventListener("mousedown", klikHeksHandler);
}

function klikZombie1Handler() {
    console.log("klikZombie1Handler");
    document.querySelector("#zombie_container1").removeEventListener("mousedown", klikZombie1Handler);
    document.querySelector("#zombie_container1").classList.add("pause");
    document.querySelector("#zombie_sprite1").classList.add("zoom_forsvind");
    document.querySelector("#zombie_sprite1").addEventListener("animationend", zombie1Reset);
}

function zombie1Reset() {
    console.log("zombie1Reset");
    document.querySelector("#zombie_container1").classList = "";
    document.querySelector("#zombie_sprite1").classList = "";
    document.querySelector("#zombie_container1").removeEventListener("animationend", zombie1Reset);
    document.querySelector("#zombie_container1").offsetHeight;
    document.querySelector("#zombie_container1").classList.add("pos4", "hop");
    document.querySelector("#zombie_container1").addEventListener("mousedown", klikZombie1Handler);
}
