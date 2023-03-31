//export var codAtivacao = Math.floor(Date.now().toPrecision * Math.random()).toString(36);
export default function geraCodigo(){

var codGerado = "";
var part1 = "";
var part2 = "";

var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var numbers = "0123456789";
var charactersLength = characters.length;
var numbersLength = numbers.length;

for (var i = 0; i < 5; i++) {
 part1 += characters.charAt(Math.floor(Math.random() * charactersLength));
}

for (var i = 0; i < 3; i++) {
 part2 += numbers.charAt(Math.floor(Math.random() * numbersLength));
}

codGerado = part1 + part2;

return  codGerado;
}