window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");
    document.querySelector("#heks_container").classList.add("animation_heks");
    document.querySelector("#heks_container").addEventListener("mousedown", klikHeksHandler);
}

function klikHeksHandler() {
    console.log("klikBox1Handler");
    document.querySelector("#heks_container").classList.add("roter_forsvind");
    document.querySelector("#heks_sprites").classList.add("roter_forsvind");
}
