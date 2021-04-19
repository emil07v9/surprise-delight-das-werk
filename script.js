window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");
    document.querySelector("#heks_container").classList.add("hop");
    document.querySelector("#zombie_container1").classList.add("hop");
    document.querySelector("#heks_container").addEventListener("click", clickHeksHandler);
    document.querySelector("#zombie_container1").addEventListener("click", clickZombie1Handler);
}

function clickHeksHandler() {
    console.log("clickHeksHandler");
    document.querySelector("#heks_container").classList.add("pause");
    document.querySelector("#heks_sprite").classList.add("roter_forsvind");
}

function clickZombie1Handler() {
    console.log("clickZombie1Handler");
    document.querySelector("#zombie_container1").classList.add("pause");
    document.querySelector("#zombie_sprite1").classList.add("zoom_forsvind");
}
