const xlsx = require('xlsx')
const file = xlsx.readFile('list.xlsx')

function k(json, index){
    const array = []
    json.forEach((a)=>array.push(a[index]))
    array.shift()
    return array
}

const json = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]], {header:1})
json.shift()
module.exports = json