
// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// prompts user for password length, will continue prompting if outside 8-128 chars
function getPasswordLength() {
  // loops once no matter what, continues to loop if outside char range
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

// stores user's choices for character types to be used in password
function getCharChoices() {
  var hasSpecChars = false, hasNumChars = false, hasLowerChars = false, hasUpperChars = false;
  alert("Please choose at least one character type.");
  hasSpecChars = confirm("Click OK to confirm including special characters.");
  hasNumChars = confirm("Click OK to confirm including numeric characters.");
  hasLowerChars = confirm("Click OK to confirm including lowercase characters.");
  hasUpperChars = confirm("Click OK to confirm including uppercase characters.");

// returns key-value pairs
  return {
    specChars: hasSpecChars,
    numChars: hasNumChars,
    lowerChars: hasLowerChars,
    upperChars: hasUpperChars
  }

}

// Function that generates password based on user preference
function generatePassword() {
  var passLen = getPasswordLength();
  var charChoices = getCharChoices();

  // loop character type choices to user until they select at least 1
  while (!Object.values(charChoices).includes(true)) {
    charChoices = getCharChoices();
  }

  // most possible special chars in string
  var specialChars = "!@#$%^&*()<>[]{}-_=+`~;:";
  // store 0-9
  var nums = "0123456789";
  // store lower case chars
  var lowerCharacters = "abcdefghijklmnopqrstuvwxyz";
  // store upper case chars
  var upperCharacters = lowerCharacters.toUpperCase();
  
  // count number of char types selected by user
  var charTypeCount = 0;
  for(const choices in charChoices) {
    if(charChoices[choices] === true) {
      charTypeCount++;
    }
  }

  var tempPwd = "";
  var rand  = 0;

  // generates a password based on user selected type, the order is not random here 
  // and is over the length required in some cases
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

  // generates a new password
  var newPwd = shuffle(tempPwd, passLen);
  return newPwd;
}

// uses Fisher-Yates shuffling algorithm and returns a password of correct length
function shuffle(array, len) {
  var r = array.length, temp, index;
  // while there remains elemnts to be shuffled
  while (r) {
    // randomly pick a remaining element
    index = Math.floor(Math.random() * r--);
    // swap with current element
    temp = array[r];
    array[r] = array[index];
    array[index] = temp;
  }
  // removes extra letters from password
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
