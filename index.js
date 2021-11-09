;(function () {

  'use strict'

  const nodes = {
    experimentRoot: document.getElementById('experimentRoot'),
    experimentHeader: document.getElementById('experimentHeader')
  }

  let mouseX = 0
  let mouseY = 0

  let elementX = 0
  let elementY = 0

  let translateX = 0
  let translateY = 0

  let startTime = 0
  let endTime = 0

  function init () {
    initEvents()
  }

  function initEvents () {
    nodes.experimentHeader.addEventListener('pointerdown', onPointerDown)    
    nodes.experimentHeader.addEventListener('pointerup', onPointerUp)

    document.addEventListener('dragover', event => event.preventDefault())
  }

  function onPointerDown (event) {
    mouseX = event.clientX
    mouseY = event.clientY
    startTime = Date.now()

    nodes.experimentHeader.setPointerCapture(event.pointerId)
    nodes.experimentHeader.addEventListener('pointermove', onPointerMove)
  }

  function onPointerMove (event) {
    const deltaX = event.clientX - mouseX
    const deltaY = event.clientY - mouseY
    translateX = elementX + deltaX
    translateY = elementY + deltaY

    requestAnimationFrame(move)
  }

  function onPointerUp (event) {
    elementX = translateX
    elementY = translateY
    endTime = Date.now()

    requestAnimationFrame(easing)

    nodes.experimentHeader.releasePointerCapture(event.pointerId)
    nodes.experimentHeader.removeEventListener('pointermove', onPointerMove)
  }

  function easing () {
    const timeElapsed = Date.now() - endTime
    console.log(timeElapsed)
  }

  function move () {
    nodes.experimentRoot.style.transform = `translate(${translateX}px, ${translateY}px)`
  }

  init()
})()