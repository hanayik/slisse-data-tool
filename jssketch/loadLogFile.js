//load Log file
// awesome reference for the future: http://regexr.com/
const fs = require('fs');
//import fs from 'fs'
logFile = '/Users/thanayik/SlisseTxDataConversion/RMW8416_tx_2017_Jun_26_1704.log'
dat = fs.readFileSync(logFile, {encoding: 'utf8'})
//console.log(dat)
//u'CorrAns': 1
//phrase.match(/phrase=(.*)/)[1]
//corrAns = dat.match(/(?!'CorrAns': )[1-2](?=L)/g)
//keyPress = dat.match(/(?!Keypress: )[1-2](?=\n)/g)
//console.log(keyPress)
badTrials = dat.match(/bad/g)
goodTrials = dat.match(/good/g)
console.log("Number of wrong answers: ", badTrials.length)
console.log("Number of correct answers: ", goodTrials.length)
totalNumTrials = badTrials.length + goodTrials.length
console.log("Accuracy: ", Math.round(((goodTrials.length/totalNumTrials) * 100) * 100) / 100)
