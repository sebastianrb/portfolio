//convert string to number with decimals

//FUNCTIONS

//utilities functions
function toNumber(string, decimals) {
    var number = parseFloat(string.replace(/,/g, ""));
    number = +number;
    number = number.toFixed(decimals);
    return number;
}

//random number between min and max (inclusive)
function random(min, max) {
    console.log(Math.floor((Math.random() * (max - min + 1)) + min));
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

//get random element of an array
function randomElement(array) {
   //function takes an array as its sole parameter
   //find array length; that's max, minimum is 1
   var max = array.length;
   var min = 1;
   //generate random integer between min and max
   //subtract 1 to adjust for zero-indexing
   var index = Math.floor(Math.random() * (max - min + 1) + min);
   index -= 1;
   //print and return array item at that number
   console.log(array[index]);
   return array[index];
}

//email mask
function emailMask(email) {
    //find index of @ symbol
    var atIndex = email.indexOf("@");
    //get string before @ symbol
    var afterAt = email.slice(atIndex);
    var beforeAt = email.slice(0, atIndex);
    var firstLetters;
    if(beforeAt.length > 5) {
        firstLetters = beforeAt.slice(0, 5);
    } else {
        firstLetters = beforeAt.slice(0, 1);
    }
    var finalMask = firstLetters + "..." + afterAt;
    console.log(finalMask);
    return finalMask;
}

//camel case and underscore conversions

//strign to camel case
function camelCase(string) {
    console.log(string);
    //make everything lowercase
    string = string.toLowerCase();
    //split string into array, each character is an element
    var stringArray = string.split("");
    console.log(stringArray);
    //loop through array. if there is a space, find index of space and capitalize character after space by setting array element
    var i;
    for(i = 0; i < stringArray.length; i++) {
        var spaceIndex;
        if(stringArray[i] === " ") {
            spaceIndex = i;
            var nextLetter;
            stringArray[spaceIndex + 1] = stringArray[spaceIndex + 1].toUpperCase();
            console.log(stringArray[spaceIndex + 1]);
        }
    }
    //convert array to string, get rid of commas
    var newStringWithSpaces = stringArray.toString();
    console.log(newStringWithSpaces);
    //eliminate spaces
    var finalString = newStringWithSpaces.replace(/,/g, "").replace(/ /g, "");
    console.log(finalString);
}

camelCase("Hello mr person");

//string to underscore
function stringToUnderscore(string) {
    console.log(string);
    var lowerCaseString = string.toLowerCase();
    var finalString = lowerCaseString.replace(/ /g, "_");
    console.log(finalString);
}

stringToUnderscore("Hey there mr Person");

//camel case to underscore
// Jaymes' solution
function camelCaseToUnderscore(string) {
        var newString = "";
        for (var i = 0; i < string.length; i++) {
            if (string[i] === string[i].toUpperCase()) {
                newString += "_" + string[i].toLowerCase();

            } else {
              newString += string[i];
            }
        }

        return newString;
    }

   console.log(camelCaseToUnderscore("hiThere"));


//object map and callback
function map(obj, callback){
  //iterate each property using for...in loop
  for(var p in obj){
    //the value of the property is modified with the result of the callback
    obj[p] = callback(p, obj[p]);
  }
  return obj;
}

//merge objects
function merge(object1, object2) {
    var newObject = {};
    for(p in object1) {
        newObject[p] = object1[p];
    }
    for(p in object2) {
        if(newObject[p] === object2[p]) {
            delete newObject[p];
        } else {
            newObject[p] = object2[p];
        }
    }
    console.log(newObject);
    return newObject;
}

//omit object properties based on array of properties and return new object
function omit(object, props) {
    //create new empty object
    var newObject = {};
    //fill ne wobject with object properties
    for(var p in object) {
        newObject[p] = object[p];
    }
    console.log(newObject);
    //loop over elements in array; if they match properties in object, delete that property in the newObject
    var i;
    for(i = 0; i < props.length; i++) {
        if(props[i] in object) {
            delete newObject[props[i]];
        }
    }
    console.log(newObject);
    return newObject;
}





//DOM utility functions




//getAncestorBySelector
function getAncestorBySelector(element, selector) {
    "use strict";
    //use querySelectorAll to find all elements matching selector
    var selectorMatches = document.querySelectorAll(selector);
    //get all parents of the reference node
    var parentsArray = [];
    while (element.parentNode) {
        parentsArray.push(element.parentNode);
        element = element.parentNode;
    }
    for(var i = 0; i < parentsArray.length; i++) {
        var item = parentsArray[i];
        //loop over selectorMatches array
        for(var j = 0; j < selectorMatches.length; j++) {
            if(item === selectorMatches[j]) {
                return item;
            }
        }
    }
    return null;
}


//getSiblingsBySelector
function getSiblingsBySelector(element, selector) {
    "use strict";
    //use querySelectorAll to find all elements matching selector
    var selectorMatches = document.querySelectorAll(selector);
    //get all siblings of the reference node; start with previous siblings then do next siblings
    var siblingsArray = [];
    //matching siblings array
    var matchingSiblings = [];
    //get originalElement
    var originalElement = element;
    //previous
    while (element.previousElementSibling) {
        siblingsArray.push(element.previousElementSibling);
        element = element.previousElementSibling;
    }
    //next
    while (originalElement.nextElementSibling) {
        siblingsArray.push(originalElement.nextElementSibling);
        originalElement = originalElement.nextElementSibling;
    }
    //loop over both arrays and get matches
    siblingsArray.forEach(function(item, position) {
        for(var i = 0; i < selectorMatches.length; i++) {
            if(item === selectorMatches[i]) {
                matchingSiblings.push(item);
            }
        }
    });
    return matchingSiblings;
}


//insertAfter
function insertAfter(newNode, referenceNode) {
    "use strict";
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    return newNode;
}


//swapElements
function swapElements(firstElement, secondElement) {
    "use strict";
    if((firstElement.nodeType === 1) && (secondElement.nodeType === 1)) {
        //make clones
        var firstNodeClone = firstElement.cloneNode(true);
        var secondNodeClone = secondElement.cloneNode(true);

        //insert second element after first element and insert first element after second using the clones
        firstElement.parentNode.insertBefore(secondNodeClone, firstElement.nextElementSibling);
        secondElement.parentNode.insertBefore(firstNodeClone, secondElement.nextElementSibling);

        //delete both of the nodes
        firstElement.remove();
        secondElement.remove();

        return true;
    } else {
        return false;
    }
}


//removeAll
function removeAll(selector) {
    "use strict";
    //use querySelectorAll to find all elements matching selector
    var selectorMatches = document.querySelectorAll(selector);
    //
    selectorMatchesArray = [];
    //move items from node list to an array and remove each one in turn
    for(var i = 0; i < selectorMatches.length; i++) {
        selectorMatchesArray.push(selectorMatches[i]);
        selectorMatches[i].remove();
    }
    return selectorMatchesArray;
}





///////// METHODS





//utilities object
var utilities = {
    by: function(list, n, callback) {
        var i;
        for(i = 0; i < list.length; i++) {
            if(i % n === 0) {
                callback(list[i]);
            }
        }
    },
    keys: function(object) {
        //declare result array
        var result = [];
        //loop through object and add property names to array
        for(var p in object) {
            result.push(p);
        }
        //print and return result
        console.log(result);
        return result;
    },
    values: function(object) {
        //declare result array
        var result = [];
        //loop through object and add values to array
        for(var p in object) {
            result.push(object[p]);
        }
        //print and return result
        console.log(result);
        return result;
    },
    pairs: function(object) {
        //declare result array
        var result = [];
        //loop through object and add property names and values to array
        for(var p in object) {
            result.push(p);
            result.push(object[p]);
        }
        //print and return result
        console.log(result);
        return result;
    },
    shuffle: function(array) {
         //declare result array
        var result = array;
        //get input array length
        var len = array.length;
        //loop through array
        var i;
        for(i = len - 1; i >= 0; i--) {
            var randomIndex = Math.floor(Math.random() * (i + 1));
            var itemAtIndex = result[randomIndex];

            result[randomIndex] = result[i];
            result[i] = itemAtIndex;
        }
        console.log(result);
        return result;
    },
    pluralize: function(n, word, pluralWord) {
        //declare result variable
        var result;
        //if pluralword parameter is prvided
        if(n < 1) {
            console.log("Please supply an 'n' value taht is greater than or equal to 1");
            return;
        } else {
            if(n === 1) {
                result = word;
            } else {
                if(pluralWord) {
                   result = pluralWord;
                } else {
                    result = word + "s";
                }
            }
            console.log(result);
            return result;
        }
    },
    toDash: function(string) {
        var i;
        //loop through string and find indexes of capital letters
        //get string into array, each character is an element
        var stringArray = string.split("");
        //check for spaces
        if(stringArray.indexOf(" ") > -1) {
            console.log("The input string cannot have spaces");
            return;
        }
        // console.log(stringArray);
        var indexArray = [];
        for(i = 0; i < stringArray.length; i++) {
            if(stringArray[i] === stringArray[i].toUpperCase()) {
                indexArray.push(i);
            }
        }
        // console.log(indexArray);
        //insert spaces before capital letters using array indexes
        if(indexArray.length > 0) {
            for(i = 0; i < indexArray.length; i++) {
                stringArray[indexArray[i]] = "-" + stringArray[indexArray[i]].toLowerCase();
            }
        } else {
            console.log("The string supplied is not in camel case.");
            return;
        }
        // console.log(stringArray);
        //convert array to string and eliminate commas
        var finalString = stringArray.join("");
        console.log(finalString);
        return finalString;
    },
    toCamel: function(string) {
        var result;
        var characterArray = string.split("");
        if(characterArray.indexOf("-") >= 0) {
            for (var i = characterArray.length - 1; i >= 0; i--) {
                if (characterArray[i] === "-") {
                    // newString += "_" + characterArray[i].toLowerCase();
                    characterArray[i + 1] = characterArray[i + 1].toUpperCase();
                    characterArray.splice(i, 1);
                }
            }
            result = characterArray.join("");
            console.log(result);
        } else {
           console.log("The string entered does not have any dashes");
        }
    },
    has: function(object, search) {
        //set result variable
        var found = false;
        //loop through object
        for(var p in object) {
            if(object[p] == search) {
                found = true;
            }
        }
        console.log(found);
        return found;
    },
    pick: function(object, keys) {
        //declare new result object
        var result = {};
        //loop through reference object and array
        for(var p in object) {
            keys.forEach(function(item) {
                if(p === item) {
                    result[p] = object[p];
                }
            });
        }
        console.log(result);
        return result;
    }
};





//validator object
var errorObject = {
    alert: "Error: ",
    explain: function(message) {
        var result = this.alert + message;
        console.log(result);
        return result;
    }
};

//validator object
var validator = {
    //email validot
    isEmailAddress: function(input) {
        input = input.toString();
        var indexAt = input.indexOf("@");
        if(indexAt > 0 && indexAt < input.length - 1) {
            var beforeAt = input.substr(0, indexAt);
            var afterAt = input.substr(indexAt + 1);
            // console.log(beforeAt);
            // console.log(afterAt);
            if(typeof beforeAt === "string" && typeof afterAt === "string") {
                // console.log("It's good");
                return true;
            }
        } else {
            errorObject.explain("the information provided is not a valid email address");
            return false;
        }
    },
    //phone number validator
    isPhoneNumber: function(input) {
        if(typeof +input === "number") {
            var numString = input.toString();
            var numberLength = numString.length;
            if(numberLength == 7) {
                // console.log("It's good");
                return true;
            } else {
                errorObject.explain("The information entered is not a valid phone number");
                return false;
            }
        } else {
            errorObject.explain("The information entered is not a valid phone number");
            return false;//code
        }
    },
    //remove symbols
    withoutSymbols: function(input) {
        var result = "";
        var counter;
        input = input.toString();
        var inputCharacters = input.split("");
        var symbols = ["/","!", "@", "#","$","%","^","&","*","(",")","_","+","=","-","`","~",";","<",">",".","?","[","]","{","}", "?", "\\", ","];
        //loop through inputCharacters, adding them to the string if not in the symbols array
        var i;
        for(i = 0; i < inputCharacters.length; i++) {
            if (symbols.indexOf(inputCharacters[i]) < 0) {
                    result += inputCharacters[i];
            }
        }
        console.log(result);
        return result;
    },
    //checks whether the input is a valid date
    isDate: function(input) {
        var date = new Date(input);
        // console.log(date);
        if(date != "Invalid Date") {
            // console.log("Valid date string");
            return true;
        } else {
            errorObject.explain("the information entered is not a valid date");
            return false;
        }
    },
    //before date validator; checks to see whether or not input date comes after reference date
    isBeforeDate: function(input, reference) {
        //declare variables
        var date, dateReference, result;
        //make the input and reference date objects
        if(this.isDate(input)) {
            date = new Date(input);
        } else {
            errorObject.explain("The information entered for input is not a valid date");
            throw "Invalid date entered as input";
        }
        if(this.isDate(reference)) {
            dateReference = new Date(reference);
        } else {
            errorObject.explain("The information entered for reference is not a valid date");
            throw "Invalid date entered as reference";
        }
        //convert both dates to milliseconds
        var dateMil = date.getTime();
        var dateReferenceMil = dateReference.getTime();
        //calculate difference
        // console.log(dateMil, dateReferenceMil);
        var difference = dateMil - dateReferenceMil;
        //if difference is greater than 0, return true. Else return false
        // console.log(difference);
        if(difference > 0) {
            // console.log("It's after");
            result = true;
            console.log(result);
            return result;
        } else {
            // console.log("It's not after");
            result = false;
            console.log(result);
            return result;
        }
    },
    //isAfterDate
    isAfterDate: function(input, reference) {
        //declare variables
        var date, dateReference, result;
        //make the input and reference date objects
        if(this.isDate(input)) {
            date = new Date(input);
        } else {
            errorObject.explain("The information entered for input is not a valid date");
            throw "Invalid date entered as input";
        }
        if(this.isDate(reference)) {
            dateReference = new Date(reference);
        } else {
            errorObject.explain("The information entered for reference is not a valid date");
            throw "Invalid date entered as reference";
        }
        //convert both dates to milliseconds
        var dateMil = date.getTime();
        var dateReferenceMil = dateReference.getTime();
        //calculate difference
        // console.log(dateMil, dateReferenceMil);
        var difference = dateMil - dateReferenceMil;
        //if difference is greater than 0, return true. Else return false
        // console.log(difference);
        if(difference < 0) {
            // console.log("It's after");
            result = true;
            console.log(result);
            return result;
        } else {
            // console.log("It's not after");
            result = false;
            console.log(result);
            return result;
        }
    },
    //before today check
    isBeforeToday: function(input) {
        var today = new Date(), result;
        if(this.isDate(input)) {
            date = new Date(input);
        } else {
            errorObject.explain("The information entered for input is not a valid date");
            throw "Invalid date entered as input";
        }
        //convert to milliseconds;
        var dateMil = date.getTime();
        var todayMil = today.getTime();
        //get difference
        var difference = dateMil - todayMil;
        //logic
        if(difference < 0) {
            // console.log("It's after");
            result = true;
            console.log(result);
            return result;
        } else {
            // console.log("It's not after");
            result = false;
            console.log(result);
            return result;
        }
    },
    //isAfterToday
    isAfterToday: function(input) {
        var today = new Date(), result;
        if(this.isDate(input)) {
            date = new Date(input);
        } else {
            errorObject.explain("The information entered for input is not a valid date");
            throw "Invalid date entered as input";
        }
        //convert to milliseconds;
        var dateMil = date.getTime();
        var todayMil = today.getTime();
        //get difference
        var difference = dateMil - todayMil;
        //logic
        if(difference > 0) {
            // console.log("It's after");
            result = true;
            console.log(result);
            return result;
        } else {
            // console.log("It's not after");
            result = false;
            console.log(result);
            return result;
        }
    },
    //checks for empty input
    isEmpty: function(input) {
        var inputCharacters, result, newString, i;
        if(typeof input !== "string") {
            result = false;
            console.log(result);
            return result;
        } else {
            inputCharacters = input.split("");
            // console.log(inputCharacters);
            for(i = inputCharacters.length - 1; i >= 0; i--) {
                if(inputCharacters[i] === " ") {
                    inputCharacters.splice(i, 1);
                }
            }
        }
        newString = inputCharacters.join("");
        // console.log(newString);
        if(newString === "") {
            result = true;
            console.log(result);
            return result;
        } else {
            result = false;
            console.log(result);
            return result;
        }
    },
    //check for words
    contains: function(input, words) {
        var result, i;
        var isFound = false;
        var noSymbols = this.withoutSymbols(input);
        var searchArray = noSymbols.split(" ");
        // console.log(searchArray);
        searchArray.forEach(function(item) {
            for(i = 0; i < words.length; i++) {
                if(item == words[i]) {
                    isFound = true;
                }
            }
        });
        result = isFound;
        console.log("Result of 'contains' function: " + result);
        return result;
    },
    //lacks
    lacks: function(input, words) {
        // var isLacking = true;
        // var noSymbols = this.withoutSymbols(input);
        // var searchArray = noSymbols.split(" ");
        // // console.log(searchArray);
        // searchArray.forEach(function(item) {
        //     var i;
        //     for(i = 0; i < words.length; i++) {
        //         if(item == words[i]) {
        //             isLacking = false;
        //         }
        //     }
        // });
        // console.log(isLacking);
        // return isLacking;
        var result = !this.contains(input, words);
        console.log("Result of 'lacks' function: " + result);
        return result;
    },
    // isComposedOf: function(input, strings) {
    //NOTE: I couldn't figure this one out. I don't believe the specifications are specific enough. See the below link:

    // https://qa.moderndeveloper.com/t/intro-to-the-dom-pa1-unclear-instruction-validation-function-iscomposedof/1260
    // },
    isLength: function(input, n) {
        var result;
        var inputString = input.toString();
        if(inputString.length <= n) {
            result = true;
        } else {
            result = false;
        }
        console.log(result);
        return result;
    },
    isOfLength: function(input, n) {
        var result;
        var inputString = input.toString();
        if(inputString.length >= n) {
            result = true;
        } else {
            result = false;
        }
        console.log(result);
        return result;
    },
    countWords: function(input) {
        var newString,
        newArray,
        i,
        k,
        j;
        var symbols = ["/","!", "@", "#","$","%","^","&","*","(",")","_","+","=","-","`","~",";","<",">",".","?","[","]","{","}", "?", "\\", ","];
        var characters = input.split("");
        // console.log(characters);
        characters.forEach(function(item, index) {
            for(i = 0; i < symbols.length; i++) {
                if(item == symbols[i]) {
                    characters[index] = " ";
                }
            }
        });
        // console.log(characters);
        for(j = characters.length - 1; j >= 0; j--) {
            if(characters[0] === " ") {
                characters.splice(0, 1);
            } else if(characters[characters.length - 1] === " ") {
                characters.splice(characters.length - 1, 1);
            }
        }
        newString = characters.join("");
        newArray = newString.split(" ");
        for(k = newArray.length - 1; k >= 0; k--) {
            if(!newArray[k]) {
                newArray.splice(k, 1);
            }
        }
        wordCount = newArray.length;
        return wordCount;
    },
    //less words
    lessWordsThan: function(input, n) {
        var lessThan;
        var wordCount = this.countWords(input);
        if(wordCount <= n) {
            lessThan = true;
        } else {
            lessThan = false;
        }
        console.log(lessThan);
        return lessThan;
    },
    //more words
    moreWordsThan: function(input, n) {
        var lessThan;
        var wordCount = this.countWords(input);
        if(wordCount >= n) {
            lessThan = true;
        } else {
            lessThan = false;
        }
        console.log(lessThan);
        return lessThan;
    },
    isBetween: function(input, floor, ceil) {
        var between;
        if(input <= ceil && input >= floor ) {
            between = true;
        } else {
            between = false;
        }
        console.log(between);
        return between;
    },
    isAlphanumeric: function(input) {
        var i;
        var alphanumeric = true;
        var symbols = ["\'", "\"", "/","!", "@", "#","$","%","^","&","*","(",")","_","+","=","-","`","~",";",":", "<",">",".","?","[","]","{","}","?", "\\", ","];
        var characterArray = input.split("");
        // console.log(characterArray);
        for(i = 0; i < characterArray.length; i++) {
            var j;
            for(j = 0; j < symbols.length; j++) {
                if(characterArray[i] == symbols[j]) {
                    alphanumeric = false;
                }
            }
        }
        console.log(alphanumeric);
        return alphanumeric;
    },
    isCreditCard: function(input) {
        var isCredit = true;
        var characterArray = input.split("");
        if(characterArray.length === 19) {
            if(characterArray[4] != "-" || characterArray[9] != "-" || characterArray[14] != "-") {
                isCredit = false;
            }
            var firstFour = characterArray.slice(0, 4);
            var secondFour = characterArray.slice(5, 9);
            var thirdFour = characterArray.slice(10, 14);
            var fourthFour = characterArray.slice(15, 20);
            var i;
            for(i = 0; i < firstFour.length; i++) {
                if(!this.isAlphanumeric(firstFour[i])) {
                    isCredit = false;
                }
            }
            for(i = 0; i < secondFour.length; i++) {
                if(!this.isAlphanumeric(secondFour[i])) {
                    isCredit = false;
                }
            }
            for(i = 0; i < thirdFour.length; i++) {
                if(!this.isAlphanumeric(thirdFour[i])) {
                    isCredit = false;
                }
            }
            for(i = 0; i < fourthFour.length; i++) {
                if(!this.isAlphanumeric(fourthFour[i])) {
                    isCredit = false;
                }
            }
        } else if(characterArray.length === 16) {
            var i;
            for(i = 0; i < characterArray.length; i++) {
                if(!this.isAlphanumeric(characterArray[i])) {
                    isCredit = false;
                }
            }
        } else {
            isCredit = false;
        }
        console.log(characterArray);
        console.log(isCredit);
        return isCredit;
    },
    isHex: function(input) {
        var hex = true;
        input = input.toLowerCase();
        var acceptedCharacters = ["a", "b", "c", "d", "e", "f", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        var characterArray = input.split("");
        if(characterArray[0] != "#") {
            hex = false;
        }
        if(characterArray.length === 7 || characterArray.length === 4) {
            var afterHash = characterArray.slice(1);
            var i;
            for(i = 0; i < afterHash.length; i++) {
               if(acceptedCharacters.indexOf(afterHash[i]) < 0) {
                   hex = false;
               }
            }
        } else {
            hex = false;
        }
        // console.log(hex);
        return hex;
    },
    isRGB: function(input) {
        var rgb = true;
        var count = 0;
        var firstNumberArray, secondNumberArray, thirdNumberArray,firstNumber, secondNumber, thirdNumber;
        var commaLocations = [];
        input = input.toLowerCase();
        var characterArray = input.split("");
        var i;
        for(i = characterArray.length - 1; i >= 0; i--) {
            if(characterArray[i] == " ") {
                characterArray.splice(i, 1);
            }
        }
        var len = characterArray.length;
        var newString = characterArray.join("");
        // console.log(characterArray);
        if(characterArray[0] != "r" || characterArray[1] != "g" || characterArray[2] != "b" || characterArray[3] != "(" || characterArray[len - 1] != ")") {
            rgb = false;
        }
        // console.log(characterArray);
        // console.log(rgb);
        //check commas
        for(i = 0; i < characterArray.length; i++) {
            if(characterArray[i] == ",") {
                count++;
                commaLocations.push(i);
            }
        }
        if(count != 2) {
            rgb = false;
        }
        //make new array of characters between ( and first comma
        //make new array of characters between first command and second comma
        //make new array of characters between second comma and )
        firstNumberArray = characterArray.slice(4, commaLocations[0]);
        secondNumberArray = characterArray.slice(commaLocations[0] + 1, commaLocations[1]);
        thirdNumberArray = characterArray.slice(commaLocations[1] + 1, len - 1);
        // console.log(characterArray);
        firstNumber = +firstNumberArray.join("");
        secondNumber = +secondNumberArray.join("");
        thirdNumber = +thirdNumberArray.join("");
        // console.log(firstNumber, secondNumber, thirdNumber);
        if(!(firstNumber >= 0 && firstNumber <= 255)) {
            rgb = false;
        } else if(!(secondNumber >= 0 && secondNumber <= 255)) {
            rgb = false;
        } else if(!(thirdNumber >= 0 && thirdNumber <= 255)) {
            rgb = false;
        }
        // console.log(rgb);
        return rgb;
    },
    isHSL: function(input) {
        var hsl = true;
        var count = 0;
        var firstNumberArray, secondNumberArray, thirdNumberArray,firstNumber, secondNumber, thirdNumber;
        var commaLocations = [];
        input = input.toLowerCase();
        var characterArray = input.split("");
        var i;
        for(i = characterArray.length - 1; i >= 0; i--) {
            if(characterArray[i] == " ") {
                characterArray.splice(i, 1);
            }
        }
        var len = characterArray.length;
        var newString = characterArray.join("");
        // console.log(characterArray);
        if(characterArray[0] != "h" || characterArray[1] != "s" || characterArray[2] != "l" || characterArray[3] != "(" || characterArray[len - 1] != ")") {
            hsl = false;
        }
        // console.log(characterArray);
        // console.log(hsl);
        //check commas
        for(i = 0; i < characterArray.length; i++) {
            if(characterArray[i] == ",") {
                count++;
                commaLocations.push(i);
            }
        }
        if(count != 2) {
            hsl = false;
        }
        //make new array of characters between ( and first comma
        //make new array of characters between first command and second comma
        //make new array of characters between second comma and )
        firstNumberArray = characterArray.slice(4, commaLocations[0]);
        secondNumberArray = characterArray.slice(commaLocations[0] + 1, commaLocations[1]);
        thirdNumberArray = characterArray.slice(commaLocations[1] + 1, len - 1);
        // console.log(characterArray);
        firstNumber = +firstNumberArray.join("");
        secondNumber = +secondNumberArray.join("");
        thirdNumber = +thirdNumberArray.join("");
        // console.log(firstNumber, secondNumber, thirdNumber);
        if(!(firstNumber >= 0 && firstNumber <= 360)) {
            hsl = false;
        } else if(!(secondNumber >= 0 && secondNumber <= 1)) {
            hsl = false;
        } else if(!(thirdNumber >= 0 && thirdNumber <= 1)) {
            hsl = false;
        }
        // console.log(hsl);
        return hsl;
    },
    isColor: function(input) {
        input = input.toString();
        var color;
        if(this.isHex(input) || this.isRGB(input) || this.isHSL(input)) {
            color = true;
        } else {
            color = false;
        }
        console.log(color);
        return color;
    },
    isTrimmed: function(input) {
    //     input = input.toString();
    //     var trimmed = true;
    //     var i;
    //     var characterArray = input.split("");
    //     var len = characterArray.length;
    //     var spacePositions = [];
    //     //check spaces at start and end
    //     if(characterArray[0] === " " || characterArray[len - 1] === " ") {
    //         trimmed = false;
    //     }
    //     // console.log(trimmed);
    //     //check spaces positions
    //     for(i = 0; i < len; i++) {
    //         if(characterArray[i] === " ") {
    //             spacePositions.push(i);
    //         }
    //     }
    //     // console.log(spacePositions);
    //     for(i = 0; i < spacePositions.length; i++) {
    //         if(characterArray[spacePositions[i] - 1] === " " || characterArray[spacePositions[i] + 1] === " ") {
    //             trimmed = false;
    //         }
    //     }
    //     console.log(trimmed);
        var result;
        result = input.split(" ").indexOf("") < 0;
        console.log(result);
        return result;
    }
};


