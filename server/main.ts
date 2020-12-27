
//robimy obiekt xlsx
//var xlsx = require("xlsx");
import * as xlsx from "xlsx"
console.log("im here");
//wczytujemy arkusz
var wb = xlsx.readFile("./files/Zeszyt1.xlsx");
//robimy uchwyt do wybranego arkusza
var ws = wb.Sheets["Arkusz1"];
//konwertujemy na json
var data = xlsx.utils.sheet_to_json(ws);

//kasujemy jakis rekord bo mamy juz tablice json
var newData = data.map((record) => {
    delete record['two ']
    return record;
})

console.log(newData);
//toworzymy nowa zeszyt
var newWB = xlsx.utils.book_new();
//zamieniamy zmienione dane na arkusz
var newWs = xlsx.utils.json_to_sheet(newData);
//do nowego zeszytu dajemy nasz nowy arkusz 
xlsx.utils.book_append_sheet(newWB, newWs, "New Data");
//zapisujemy jako nowy plik
xlsx.writeFile(newWB, "./files/NewData.xlsx");