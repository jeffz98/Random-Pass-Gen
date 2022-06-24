// Assignment code here


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

function getPasswordLength() {
  do {
    var pwdLen = Number(prompt("How many characters would you like your password to contain?"));
    if (isNaN(pwdLen) || pwdLen == null) {
      alert("Please enter a number between 8-128 characters.");
    } else if(pwdLen < 8)  {
      alert("Password length must be at least 8 characters.");
    } else if(pwdLen > 128) {
      alert("Password length must be less than 129 characters.");
    } 

  } while(pwdLen == null || pwdLen < 8 || pwdLen >= 129 || isNaN(pwdLen));
  return pwdLen;
}

function getCharChoices() {
  var hasSpecChars = false, hasNumChars = false, hasLowerChars = false, hasUpperChars = false;
  alert("Please choose at least one character type.");
  hasSpecChars = confirm("Click OK to confirm including special characters.");
  hasNumChars = confirm("Click OK to confirm including numeric characters.");
  hasLowerChars = confirm("Click OK to confirm including lowercase characters.");
  hasUpperChars = confirm("Click OK to confirm including uppercase characters.");

  return {
    specChars: hasSpecChars,
    numChars: hasNumChars,
    lowerChars: hasLowerChars,
    upperChars: hasUpperChars
  }

}

function generatePassword() {
  var passLen = getPasswordLength();
  var charChoices = getCharChoices();

  while (!Object.values(charChoices).includes(true)) {
    charChoices = getCharChoices();
  }
  
}
// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
