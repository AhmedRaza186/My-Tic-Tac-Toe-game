let turnAudio = new Audio("ting.mp3")
let turn = "X"
let gameover = false

const changeTurn = () => {
    return turn === "X" ? "0" : "X"
};

const checkWin = () => {
    let boxtext = document.getElementsByClassName("box-text");
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    wins.forEach((e) => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[2]].innerText === boxtext[e[0]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector(".info").innerText =
                boxtext[e[0]].innerText + " Won!"
                
            gameover = true;
              document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '200px'
              showPopup(boxtext[e[0]].innerText + " Won!")

        }
    });
};

function computerMove() {
    if (gameover) return

    let box = document.querySelectorAll(".box-text")
    let emptyBoxes = []

    box.forEach((b, i) => {
        if (b.innerText === "") {
            emptyBoxes.push(i)
        }
    })

   
    if (emptyBoxes.length === 0) {
        document.querySelector(".info").innerText = "Draw!"
        gameover = true
        showPopup("It's a Draw!")

        return
    }

    let randomIndex =
        emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)]
    box[randomIndex].innerText = "0" 
    turnAudio.play()
    checkWin()

    if (!gameover) {
        turn = "X"
        document.querySelector(".info").innerText = "Turn for " + turn
    }
}

let boxes = document.getElementsByClassName("box")
Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".box-text")
    element.addEventListener("click", () => {
        if (boxtext.innerText === "" && !gameover && turn === "X") {
            boxtext.innerText = "X"
            checkWin()

            if (!gameover) {
                turn = "0" 
                document.querySelector(".info").innerText = "Computer thinking..."
                setTimeout(computerMove, 300); 
            }
        }
    })
})

reset.addEventListener("click", () => {
    let boxtext = document.querySelectorAll(".box-text")
    Array.from(boxtext).forEach((element) => {
        element.innerText = ""
    })
    turn = "X"
    gameover = false
    document.querySelector(".info").innerText = "Turn for " + turn
      document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '0px'
})

const popup = document.getElementById("popup")
const popupMsg = document.getElementById("popup-message")
const popupOk = document.getElementById("popup-ok")

function showPopup(message) {
    popupMsg.innerText = message
    popup.style.display = "flex"
}

popupOk.addEventListener("click", () => {
    popup.style.display = "none"
})
