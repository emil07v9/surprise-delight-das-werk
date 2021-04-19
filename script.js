window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");
    document.querySelector("#heks_container").classList.add("hop");
    document.querySelector("#zombie_container1").classList.add("hop");
    document.querySelector("#heks_container").addEventListener("mousedown", klikHeksHandler);
    document.querySelector("#zombie_container1").addEventListener("mousedown", klikZombie1Handler);
}

function klikHeksHandler() {
    console.log("klikHeksHandler");
    document.querySelector("#heks_container").removeEventListener("mousedown", klikHeksHandler);
    document.querySelector("#heks_container").classList.add("pause");
    document.querySelector("#heks_sprite").classList.add("roter_forsvind");
}

function klikZombie1Handler() {
    console.log("klikZombie1Handler");
    document.querySelector("#zombie_container1").removeEventListener("mousedown", klikZombie1Handler);
    document.querySelector("#zombie_container1").classList.add("pause");
    document.querySelector("#zombie_sprite1").classList.add("zoom_forsvind");
}
