//  Assignment Code
const generateBtn = document.querySelector("#generate");

// things user can choose to have in their password
const lowercase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y", "z"]
const uppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const special = ["!", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "`", "{", "|", "}", "~"]
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
const resultsArray = []; // results array needs data from modifiers
const outputArray = []; // output array needs data from results array


function passwordChoices(){ // here are the menu options the user can decide upon
  const passwordLength = prompt("Choose a password length. (8-128 characters)")
  if (passwordLength < 8 || passwordLength > 128){
    alert("Must be between 8 and 128 characters.")  // demands an input length between 8 and 128 characters
    return
  }
  const incSpecial = confirm("Include Special Characters?")  // confirmation boolean for special characters array
  const incNumbers = confirm("Include Numbers?")  // confirmation boolean for numbers array
  const incUppercase = confirm("Include uppercase letters?")  // confirmation boolean for uppercase array
  const incLowercase = confirm("Include lowercase letters?") // confirmation boolean for lowercase array
  
  if(incLowercase === false && incNumbers === false && incUppercase === false && incSpecial === false){
    alert ("You must choose at least one modifier.") // this loop tells the user to pick at least one modifier.
    return
  }
  
  const result = {   // consolidates results of prompts/confirms to easier to digest data
    passwordLength: passwordLength,
    haveSpecial: incSpecial,
    haveNumbers: incNumbers,
    haveUpper: incUppercase,
    haveLower: incLowercase
  }
  return result;  // reports the result constiable as the result of this function
}

function generatePassword() {
  const result = passwordChoices();  // calls for the result of the passwordChoices function, turns it into a constiable to apply to this function's logic
  // concat is incredibly useful here to turn all wanted modifier arrays into one super array
  if(result.haveNumbers){ // if the user wants numbers, it will account for numbers in the final output
    resultsArray = resultsArray.concat(numbers);
  }
  if(result.haveUpper){  // if the user wants uppercase, it will account for uppercase in the final output
    resultsArray = resultsArray.concat(uppercase);
  }
  if(result.haveLower){ //  if the user wants lowercase, it will account for lowercase in the final output
    resultsArray = resultsArray.concat(lowercase);
  }
  if(result.haveSpecial){  //  if the user wants specials, it will account for specials in the final output
    resultsArray = resultsArray.concat(special);
  }
  console.log(resultsArray) // logs all possible characters into one giant  results array
  for (const i = 0; i < result.passwordLength; i++) {     
    outputArray.push(resultsArray[Math.floor(Math.random() * resultsArray.length)]); // pulls random indexes from results array, uses them to formulate password in relation to desired length.
    }
    return outputArray.join(''); // takes the output array and turns it into a string that gets printed in the password box.
  }

// Write password to the #password input
function writePassword() {
  clearPassword();  // originally i had a function to reset the password field on mouse hover, decided i could just redefined outputArray to prevent the generator from adding additional characters to the end of the previous password.
  const password = generatePassword();
  const passwordText = document.querySelector("#password");
  outputArray = [];
  passwordText.value = password;
}
function clearPassword() { // resets the password field and output array constiable
  const passwordText = document.querySelector("#password");
  passwordText.value = null;
  outputArray = [];
  resultsArray = [];
}
//  Add event listener to generate button, on click it performs function writePassword
generateBtn.addEventListener("mouseover",clearPassword); // resets password field and output array constiable on mouseover

generateBtn.addEventListener("click", writePassword);
