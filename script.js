var elementFlecha;
var elementBala;
var elementSiA1;
var elementSiA2;
var elementNoA1;
var elementNoA2;
var elementspNO;
var elementspSI;
var elementtextM;

var valorLeftSI = 20;
var valorLeftNO = 60;
var valorBala = 90;
var disparoXinicial;
var posicX;

var bucleAnimacion;
var buclePos;
var bucleDisparo;
var bucleAnimacionFin;
var vfG = false;
var vfDisparo = false;

var valorAzar;
var finalAzar;

const keyframesAnimacion = [
    { top: "5%", offset: 0 },
    { top: "8%", offset: .5 },
    { top: "5%", offset: 1 }
];
const options = {
    duration: 1000,
    easing: "linear",
};
const keyframesAnimacion2 = [
    { top: "13%", offset: 0 },
    { top: "16%", offset: .5 },
    { top: "13%", offset: 1 }
];
const options2 = {
    duration: 1000,
    easing: "linear",
};

const keyframesAnimacionFin = [
    { scale: "1", background: "crimson", offset: 0 },
    { scale: "1.05 ", background: "red", offset: 0.50 },
    { scale: "1", background: "crimson", offset: 1 },
];
const optionFin = {
    duration: 1000,
    easing: "linear",
};

function iniciar() {
    elementFlecha = document.querySelector(".flecha");
    elementBala = document.querySelector(".bala");
    elementSiA1 = document.querySelector(".psiA1");
    elementSiA2 = document.querySelector(".psiA2");
    elementNoA1 = document.querySelector(".pnoA1");
    elementNoA2 = document.querySelector(".pnoA2");
    elementspNO = document.querySelector(".spNO");
    elementspSI = document.querySelector(".spSI");
    elementtextM = document.querySelector(".textM");

    elementSiA1.style.top = 5 + "%";
    elementNoA1.style.top = 5 + "%";
    elementSiA2.style.top = 5 + "%";
    elementNoA2.style.top = 5 + "%";
    elementSiA1.style.left = valorLeftSI + "%";
    elementNoA1.style.left = valorLeftNO + "%";

    document.addEventListener("mousemove", moverFlecha);
    document.addEventListener("click", disparo);

    bucleAnimacion = setInterval(() => {
        elementSiA1.animate(keyframesAnimacion, options);
        elementSiA2.animate(keyframesAnimacion, options);
        elementNoA1.animate(keyframesAnimacion, options);
        elementNoA2.animate(keyframesAnimacion, options);
        elementspNO.animate(keyframesAnimacion2, options2);
        elementspSI.animate(keyframesAnimacion2, options2);
    }, 1000)

}



function validarPos() {

    if (posicX >= 51) {
        valorAzar = Math.random() * (41 - 1) + 1;
        finalAzar = Math.floor(valorAzar);
    } else if (posicX <= 50 || finalAzar < 51) {
        valorAzar = Math.random() * (85 - 61) + 61;
        finalAzar = Math.floor(valorAzar);
    }
    
    buclePos = setInterval(() => {
        if (valorBala == 25 && posicX >= valorLeftSI && posicX <= valorLeftSI + 19 && vfG == false && disparoXinicial >= 20 && disparoXinicial <= 39) {
            clearInterval(buclePos);
            clearInterval(bucleAnimacion);
            var audioExplosion = new Audio("explosion.mp3");
            audioExplosion.play();
            elementSiA1.style.visibility = "hidden";
            elementSiA2.style.visibility = "hidden";
            elementspSI.style.visibility = "hidden";
            elementtextM.style.visibility = "hidden";
            elementFlecha.style.visibility="hidden";
            elementBala.style.visibility="hidden";

            if (elementSiA1.style.visibility == "hidden") {
                document.removeEventListener("click", disparo);
                document.removeEventListener("mousemove", moverFlecha);
                var audioExplosion = new Audio("corazon.mp3");
                audioExplosion.play();
                audioExplosion.volume=.2;
                elementNoA1.style.background = "crimson";
                elementNoA2.style.background = "crimson";
                elementNoA1.style.left = "40%";
                elementNoA2.style.left = "47.3%";
                elementNoA1.style.top = "30%";
                elementNoA2.style.top = "30%";
                elementspNO.style.top = "25%";
                elementspNO.style.left = "12.5%";
                elementspNO.style.font = "normal 26px Script MT, sans-serif";
                elementspNO.textContent = "Eres la estrella que alumbra mi ser, yo sin tu amor no soy nada... You are the star that illuminates my being, without your love I am nothing...";
                clearInterval(buclePos);
                bucleAnimacionFin = setInterval(() => {
                    elementNoA1.animate(keyframesAnimacionFin, optionFin);
                    elementNoA2.animate(keyframesAnimacionFin, optionFin);
                }, 1000)

            } else {
                clearInterval(buclePos);
            }
        }
        if (posicX >= valorLeftNO && posicX <= valorLeftNO + 19) {
            vfG = true;
            clearInterval(buclePos);
            elementNoA1.style.left = finalAzar + "%";
            elementNoA2.style.left = finalAzar + 7.3 + "%";
            elementspNO.style.left = finalAzar + 8 + "%";
            valorLeftNO = finalAzar;

        }

    }, 5);
}



function disparo() {
    if (vfDisparo == false) {
        var audioFlecha = new Audio("flecha.mp3");
        audioFlecha.play();
        vfDisparo = true;
        clearInterval(buclePos);
        disparoXinicial = posicX;
        validarPos();

        elementBala.style.left = posicX - 1 + "%";

        bucleDisparo = setInterval(() => {
            if (valorBala != 0) {
                elementBala.style.top = valorBala + "%";
                valorBala--;
            } else {
                clearInterval(bucleDisparo);
                elementBala.style.top = 90 + "%";
                elementBala.style.left = posicX - .5 + "%";

                valorBala = 90;
                vfDisparo = false;
                vfG = false;
            }


        }, 5);

    }
}


function moverFlecha(evento) {

    posicX = evento.pageX / (window.innerWidth / 100);

    elementFlecha.style.left = posicX - 5 + "%";
    if (vfDisparo == false) {
        elementBala.style.left = posicX - 1 + "%";

    }

}


window.addEventListener("load", iniciar, false);