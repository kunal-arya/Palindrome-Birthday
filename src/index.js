import "./styles.css";

function reverseStr(str) {
  return str.split("").reverse().join("");
}

function checkPalindrome(str) {
  var reversedStr = reverseStr(str);
  return reversedStr === str;
}

function convertDateToString(date) {
  var dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDateFormats(date) {
  var ddmmyyyy = date.day + date.month + date.year;

  var mmddyyyy = date.month + date.day + date.year;

  var yyyymmdd = date.year + date.month + date.day;

  var ddmmyy = date.day + date.month + date.year.slice(-2);

  var mmddyy = date.month + date.day + date.year.slice(-2);

  var yymmdd = date.year.slice(-2) + date.month + date.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  var allDateFormats = getAllDateFormats(date);
  var listOfPalindrome = [];

  for (var i = 0; i < allDateFormats.length; i++) {
    var finalResults = checkPalindrome(allDateFormats[i]);
    listOfPalindrome.push(finalResults);
  }
  return listOfPalindrome;
}

function checkLeapYear(year) {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (checkLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  };
}

function getNextPalindromeDate(date) {
  var nextDate = getNextDate(date);
  var count = 0;

  while (1) {
    count++;
    var dateStr = convertDateToString(nextDate);
    var isPalindrome = checkPalindromeForAllDateFormats(dateStr);

    for (var i = 0; i < isPalindrome.length; i++) {
      if (isPalindrome[i]) {
        return [count, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

function getPreviousDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (checkLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year
  };
}

function getPreviousPalindromeDate(date) {
  var previousDate = getPreviousDate(date);
  var count = 0;

  while (1) {
    count++;
    var dateStr = convertDateToString(previousDate);
    var isPalindrome = checkPalindromeForAllDateFormats(dateStr);

    for (var i = 0; i < isPalindrome.length; i++) {
      if (isPalindrome[i]) {
        return [count, previousDate];
      }
    }
    previousDate = getPreviousDate(previousDate);
  }
}

var birthdayInput = document.querySelector("#birthday-input");

var checkBtn = document.querySelector("#check-btn");

var output = document.querySelector("#output");

function palindromeClickHandler(input) {
  var birthday = birthdayInput.value;

  if (birthday !== "") {
    var date = birthday.split("-");
    var yyyy = date[0];
    var mm = date[1];
    var dd = date[2];

    var date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy)
    };

    var dateStr = convertDateToString(date);
    var dateList = checkPalindromeForAllDateFormats(dateStr);
    var checkPalindrome = false;

    for (var i = 0; i < dateList.length; i++) {
      if (dateList[i]) {
        checkPalindrome = true;
        break;
      }
    }

    if (!checkPalindrome) {
      const [count1, nextDate] = getNextPalindromeDate(date);
      const [count2, prevDate] = getPreviousPalindromeDate(date);

      if (count1 > count2) {
        output.innerText =
          "The nearest palindrome date is " +
          prevDate.day +
          "-" +
          prevDate.month +
          "-" +
          prevDate.year +
          ", you missed by " +
          count2 +
          " days.";
      } else {
        output.innerText =
          "The nearest palindrome date is " +
          nextDate.day +
          "-" +
          nextDate.month +
          "-" +
          nextDate.year +
          ", you missed by " +
          count1 +
          " days.";
      }
    } else {
      output.innerText = "Congrats!! Your Birthday is Palindrome";
    }
  }
}

checkBtn.addEventListener("click", palindromeClickHandler);
