let audio = new Audio('tick.mp3');
let wheelPower = 0;
let wheelSpinning = false;
let theWheel = new Winwheel({
    'innerRadius': 70,
    'textFontSize': 13,
    'animation':
    {
        'type': 'spinToStop',
        'duration': 10,
        'spins': Math.floor(Math.random() * 20) + 8,
        'callbackFinished': alertPrize,
        'callbackSound': playSound,
        'soundTrigger': 'pin'
    },
    'pins':
    {
        'number': 1
    }
});

function addSegment(el) {
    var pins = parseInt(theWheel.pins.number) + 1;
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    var colorRandom = "#" + randomColor;
    theWheel.pins.number = pins
    theWheel.addSegment({
        'text': el,
        'fillStyle': "#f7bfd8"
    }, 1);
    theWheel.draw();
}

function deleteSegment() {
    var pins = parseInt(theWheel.pins.number) - 1;
    theWheel.pins.number = pins
    theWheel.deleteSegment();

    theWheel.draw();
}

function playSound() {
    audio.pause();
    audio.currentTime = 0;

    audio.play();
}

function alertPrize(indicatedSegment) {
    document.getElementById("participant").innerText = indicatedSegment.text
    $('.modal').modal('show');
    var audio = new Audio('Victoria.mp3');
    audio.play();

}


function powerSelected(powerLevel) {
    if (powerLevel >= 1) {
        document.getElementById('pw1').className = "pw1";
        document.getElementById("verde").style.backgroundColor = "#DAF7A6"
        document.getElementById("amarillo").style.backgroundColor = "gray"
        document.getElementById("rojo").style.backgroundColor = "gray"
    }

    if (powerLevel >= 2) {
        document.getElementById('pw2').className = "pw2";
        document.getElementById("amarillo").style.backgroundColor = "#FFC300"
        document.getElementById("verde").style.backgroundColor = "#DAF7A6"
        document.getElementById("rojo").style.backgroundColor = "gray"
    }

    if (powerLevel >= 3) {
        document.getElementById('pw3').className = "pw3";
        document.getElementById("amarillo").style.backgroundColor = "#FFC300"
        document.getElementById("verde").style.backgroundColor = "#DAF7A6"
        document.getElementById("rojo").style.backgroundColor = "#FF5733"
    }


    wheelPower = powerLevel;
    document.getElementById('spin_button').src = "spin_on.png";
}


function startSpin() {
    if (wheelSpinning == false) {
        if (wheelPower == 1) {
            theWheel.animation.spins = 3;
        } else if (wheelPower == 2) {
            theWheel.animation.spins = 8;
        } else if (wheelPower == 3) {
            theWheel.animation.spins = 15;
        }

        theWheel.startAnimation();

        wheelSpinning = true;
    }
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function resetWheel() {

    theWheel.stopAnimation(false);
    theWheel = new Winwheel({
        'innerRadius': 70,
        'textFontSize': 13,
        'animation':
        {
            'type': 'spinToStop',
            'duration': 10,
            'spins': Math.floor(Math.random() * 20) + 8,
            'callbackFinished': alertPrize,
            'callbackSound': playSound,
            'soundTrigger': 'pin'
        },
        'pins':
        {
            'number': 1
        }
    });
    theWheel.rotationAngle = 0;
    theWheel.draw();

    document.getElementById('pw1').className = "";
    document.getElementById('pw2').className = "";
    document.getElementById('pw3').className = "";

    document.getElementById("amarillo").style.backgroundColor = "gray"
    document.getElementById("verde").style.backgroundColor = "gray"
    document.getElementById("rojo").style.backgroundColor = "gray"

    document.getElementById("total").innerHTML = " : " + 0;
    document.getElementById("participantesText").value = "";

    wheelSpinning = false;
}

function cargarParticipantes() {
    var lista = document.getElementById("participantesText");
    var listaArray = (lista.value).split(" ");
    shuffleArray(listaArray);
    listaArray.forEach(el => {
        addSegment(el);
    })

    document.getElementById("total").innerHTML = " : " + listaArray.length;

}