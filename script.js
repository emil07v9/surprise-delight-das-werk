window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");
    document.querySelector("#heks_container").classList.add("hop");
    document.querySelector("#heks_container").addEventListener("click", klikHeksHandler);
    document.querySelector("#zombie_container").addEventListener("click", klikZombieHandler);
}

function klikHeksHandler() {
    console.log("klikHeksHandler");
    document.querySelector("#heks_container").classList.add("pause");
    document.querySelector("#heks_sprite").classList.add("roter");
    document.querySelector("#heks_sprite").classList.add("forsvind");
}

function klikZombieHandler() {
    console.log("klikZombieHandler");
    document.querySelector("#zombie_sprite1").classList.add("zoom_ud");
    document.querySelector("#zombie_sprite1").classList.add("forsvind");
}
