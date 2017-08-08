const {remote} = require('electron')
const fs = require('fs');
const path = require('path')
container = document.createElement('div')
container.id = 'container'
container.className = 'container'
document.body.appendChild(container)
appendDropIcon()


document.ondragover = document.ondrop = (ev) => {
  ev.preventDefault()
}

function appendDropIcon() {
  dropIcon = document.createElement('img')
  dropIcon.src = './file.png'
  dropIcon.className = 'dropicon'
  container.appendChild(dropIcon)
}

container.ondrop = (ev) => {
  clearContainer()
  appendDropIcon()
  loadDroppedFile(ev)
  //console.log(ev.dataTransfer.files[0].path)
  ev.preventDefault()
}

function clearContainer() {
  container.innerHTML = ''
}


function loadDroppedFile (event) {
  file = event.dataTransfer.files[0]
  fullFilePath = file.path
  ext = path.extname(fullFilePath)
  console.log("file path is: ", fullFilePath)
  if (ext !== '.log') {
    alert("File must end in '.log'")
    return
  }
  text = fs.readFileSync(fullFilePath, {encoding: 'utf8'})
  results = parseResponses(text)
  displayResults(results)
}

function displayResults (res) {
  accText = 'Total accuracy: ' + res.acc.toString() + '%'
  totTrialsText = 'Number of trials: ' + res.totalNumTrials.toString()
  numWrongTrialsText = 'Number of wrong trials: ' + res.numWrong.toString()
  numCorrectTrialsText = 'Number of correct trials: ' + res.numCorrect.toString()
  makeNewItem(accText)
  makeNewItem(totTrialsText)
  makeNewItem(numWrongTrialsText)
  makeNewItem(numCorrectTrialsText)
}

function makeNewItem (itemText) {
  item = document.createElement('div')
  item.className = 'item'
  item.id = 'item-' + new Date().getTime()
  item.innerHTML = itemText
  container.appendChild(item)
}

function parseResponses (rawText) {
  wrongTrials = rawText.match(/bad/g)
  correctTrials = rawText.match(/good/g)
  console.log("Number of wrong answers: ", wrongTrials.length)
  console.log("Number of correct answers: ", correctTrials.length)
  totalNumTrials = wrongTrials.length + correctTrials.length
  acc = roundIntToHundreths((correctTrials.length/totalNumTrials))
  console.log("Accuracy: ", acc)
  var results = {
    numWrong : wrongTrials.length,
    numCorrect : correctTrials.length,
    totalNumTrials : totalNumTrials,
    acc : acc
  }
  //alert("Accuracy is: " + acc.toString());
  //document.body.innerHTML = "Accuracy is: " + acc.toString()
  return results
}

function roundIntToHundreths (inputNum) {
  return Math.round(((inputNum) * 100) * 100) / 100
}
