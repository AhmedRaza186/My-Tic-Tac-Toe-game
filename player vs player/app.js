let turnAudio = new Audio("ting.mp3")
// let gameoverAudio = new Audio("gameovermp3")
let turn = "X"
let gameover = false

const changeTurn = () => {
    return turn === "X" ? "0" : "X"
}

const checkWin = () => {
    let boxtext = document.getElementsByClassName('box-text')
let wins = [
    [0, 1, 2], 
    [3, 4, 5],   
    [6, 7, 8],   
    [0, 3, 6], 
    [1, 4, 7],  
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6], 
]

    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText && (boxtext[e[2]].innerText === boxtext[e[0]].innerText)) && (boxtext[e[0]].innerText !== '')) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + ' Won'
            gameover = true
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '200px'

        }
    })
}

let boxes = document.getElementsByClassName("box")
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".box-text")
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !gameover) {
            boxtext.innerText = turn
            turn = changeTurn()
            turnAudio.play()
            checkWin()
            if (!gameover) {
                document.getElementsByClassName('info')[0].innerText = "Turn for " + turn
            }
        }
    })
})

reset.addEventListener('click', () => {
    let boxtext = document.querySelectorAll('.box-text')
    Array.from(boxtext).forEach(element => {
        element.innerText = ''

    })
    turn = 'X'
    gameover = false
    document.getElementsByClassName('info')[0].innerText = "Turn for " + turn
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '0px'
   
})