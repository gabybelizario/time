import Sounds from "./sounds.js"

export default function Timer({
  minutesDisplay, 
  secondsDisplay,  
  resetControls,
  sound
}) {
  let timerTimeOut
  let minutes = Number(minutesDisplay.textContent)

  function updateDisplay(newMinutes, seconds) {
    newMinutes = newMinutes === undefined ? minutes : newMinutes // caso seja verdadeira essa espressao coloca minutes caso nao newMinutes
    seconds = seconds === undefined ? 0 : seconds
    minutesDisplay.textContent = String(newMinutes).padStart(2, "0")
    secondsDisplay.textContent = String(seconds).padStart(2,"0")
  }

  function reset() {
    updateDisplay(minutes, 0) // pra colocar a funçao com os minutos registrados
    clearTimeout(timerTimeOut)
  }

  function countDown() {
  timerTimeOut = setTimeout (function() {
    let seconds = Number(secondsDisplay.textContent) // posso mudar o conteudo de uma tag pelo textContent
    let minutes = Number(minutesDisplay.textContent) 
    let isFinished = minutes <= 0 && seconds <= 0

    updateDisplay(minutes, 0)

    if (isFinished) {
      resetControls()
      updateDisplay()
      Sounds().timeEnd()
      return // colocando somente assim a funçao quando chegar em zero ela vai parar
    }
    
    if (seconds <= 0) {
      seconds = 60
      --minutes
    }
    updateDisplay(minutes, String(seconds -  1))
    //secondsDisplay.textContent = String(seconds - 1).padStart(2, "0") // Aqui eu transformei em uma string para ter acesso a esse padStar para fazerr o prenchimento o primeiro e numero de prenchimento e depois com oq eu vou preencher
    countDown()
  }, 1000)

  }

  function updateMinutes(newMinutes) {
    minutes = newMinutes
  }

  function hold(){
    clearTimeout(timerTimeOut)
  }

  return {
    countDown, 
    reset,
    updateDisplay,
    updateMinutes,
    hold
  }
}