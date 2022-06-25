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

  var specialChars = "!@#$%^&*()<>[]{}-_=+`~;:";
  var nums = "0123456789";
  var lowerCharacters = "abcdefghijklmnopqrstuvwxyz";
  var upperCharacters = lowerCharacters.toUpperCase();

  var charTypeCount = 0;
  for(const choices in charChoices) {
    if(charChoices[choices] === true) {
      charTypeCount++;
    }
  }

  var tempPwd = "";
  var rand  = 0;

  for (var i = 0; i < passLen/charTypeCount; i++) {
    if (charChoices.specChars) {
      rand = Math.floor(Math.random() * specialChars.length);
      tempPwd += specialChars.substring(rand, rand + 1);
    }
    if (charChoices.numChars) {
      rand = Math.floor(Math.random() * nums.length);
      tempPwd += nums.substring(rand, rand + 1);
    }
    if (charChoices.lowerChars) {
      rand = Math.floor(Math.random() * lowerCharacters.length);
      tempPwd += lowerCharacters.substring(rand, rand + 1);
    }
    if (charChoices.upperChars) {
      rand = Math.floor(Math.random() * upperCharacters.length);
      tempPwd += upperCharacters.substring(rand, rand + 1);
    }
    
   
  }
  var newPwd = shuffle(tempPwd, passLen);
  return newPwd;

  
}

function shuffle(array, len) {
  var r = array.length, temp, index;
  while (r) {
   
    index = Math.floor(Math.random() * r--);

    temp = array[r];
    array[r] = array[index];
    array[index] = temp;
  }
  array = array.substring(0, len);

  return array;
}
// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
