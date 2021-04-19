window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");
    document.querySelector("#heks_container").classList.add("hop_op_ned");
    document.querySelector("#heks_container").addEventListener("mousedown", klikHeksHandler);
}

function klikHeksHandler() {
    console.log("klikHeksHandler");
    document.querySelector("#heks_container").classList.add("pause");
    document.querySelector("#heks_sprite").classList.add("roter");
    document.querySelector("#heks_sprite").classList.add("zoom_ud");
    document.querySelector("#heks_sprite").classList.add("forsvind");
}
