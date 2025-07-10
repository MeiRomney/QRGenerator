const textInput = document.querySelector(".search input");
const ok = document.querySelector(".ok");
const download = document.querySelector(".dow");
const save = document.querySelector(".sav");
const qrImg = document.getElementById("qr");
const clear = document.querySelector(".clear");

const apiUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";


function generateQR(text) {
    if(text.trim() == '') {
        alert("You must enter URL");
        return;
    }

    const qrUrl = apiUrl + encodeURIComponent(text);
    qrImg.src = qrUrl;

    // Update download/save button actions
    download.onclick = () => {
        const link = document.createElement("a");
        link.href = qrImg.src;
        link.download = "qr-code.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    save.onclick = () => {
        localStorage.setItem("savedQR", qrImg.src);
        alert("QR code saved!");
    };

    textInput.value = "";
}

window.addEventListener("DOMContentLoaded", () => {
    const savedQR = localStorage.getItem("savedQR");
    if(savedQR) {
        qrImg.src = savedQR;
    }
});

clear.addEventListener("click", () => {
    localStorage.removeItem("savedQR");
    alert("Saved QR Code cleared!");
})

ok.addEventListener("click", ()=>{
    generateQR(textInput.value);
});

// Press "Enter" to trigger generation
textInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        generateQR(textInput.value);
    }
});