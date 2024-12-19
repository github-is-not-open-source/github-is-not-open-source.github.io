let popupOn = false;
class CISStudent {
    name;
    year;
    depressionIndex = 0;
    ungradedHomework = [];

    constructor(studentName, schoolYear) {
        this.name = studentName;
        this.year = schoolYear;
    }

    isDepressed() {
        return depressionIndex >= 0.7;
    }

    addDepression(amount) {
        this.depressionIndex += amount;
        if (this.depressionIndex > 1) {
            this.depressionIndex = 1;
        } else if (this.depressionIndex < 0) {
            this.depressionIndex = 0;
        }
    }

    recieveHomeworkGrade() {
        if (this.ungradedHomework.length == 0) {
            document.getElementById("missingHomework").style.visibility = 'visible';
            popupOn = true;
            return;
        }
        let index = Math.floor(Math.random() * this.ungradedHomework.length);
        let p = this.ungradedHomework[index];
        this.ungradedHomework.splice(index, 1);
        let grade = p.getGrade();
        if (grade < 0 || grade > 100) {
            throw "IllegalArgumentException";
        }
        if (grade <= 75) {
            this.addDepression(0.3);
        }
        popupOn = true;
        let hwGrade = document.getElementById("homeworkGrade");
        hwGrade.style.visibility = 'visible';
        let s = 'Your score is ' + Math.round(grade*100) + '%. ';
        if (grade >= 85) {
            s += 'You barely passed!';
        } else {
            s += 'You failed!';
        }
        hwGrade.textContent = s;
        setTimeout(() => {
            popupOn = false;
            document.getElementById("homeworkGrade").style.visibility = 'hidden';
        }, 5000);
    }

    doProblemSet(difficulty, numQuestions) {
        let p = new ProblemSet(difficulty, numQuestions);
        if (p.difficulty >= 0.4) {
            this.depressionIndex = this.depressionIndex * (1 + p.difficulty) * (1 + p.difficulty);
        } else {
            this.depressionIndex = this.depressionIndex * (1 + p.difficulty);
        }
        this.ungradedHomework.push(p);
    }
}

class ProblemSet {
    difficulty;
    numberOfQuestions;
    
    constructor(difficulty, numberOfQuestions) {
        if (difficulty < 0 || difficulty > 1) {
            throw "IllegalArgumentException";
        }
        this.difficulty = difficulty;
        this.numberOfQuestions = numberOfQuestions;
    }

    getGrade() {
        if (popupOn) {
            return
        }
        let totalSum = 0;
        for (let i = 0; i < this.numberOfQuestions; i++) {
            let randomNum = Math.random();
            if (randomNum >= this.difficulty) {
                totalSum += (randomNum - this.difficulty) / (1 - this.difficulty)/this.numberOfQuestions;
            }
        }
        return totalSum;
    }
}

let student = new CISStudent("TEST", 2027);
const defaultDifficultyValue = 0;
const defaultNumQuestions = 5;
let difficultySliderValueText = document.getElementById("difficultyValue");
let numQuestionsSliderValueText = document.getElementById("numQuestionsValue")
document.getElementById("difficultySlider").addEventListener("input", (event) => {
    difficultySliderValueText.textContent = event.target.value;
});
document.getElementById("numQuestionsSlider").addEventListener("input", (event) => {
    numQuestionsSliderValueText.textContent = event.target.value;
});

function hideHomeworkPopup() {
    document.getElementById("missingHomework").style.visibility = 'hidden';
    popupOn = false;
}

function createHomeworkPopup() {
    if (popupOn) {
        return;
    }
    document.getElementById("createHomework").style.visibility = 'visible';
    popupOn = true;
}

function submitHomework() {
    let difficulty = document.getElementById("difficultySlider").value;
    let numQuestions = document.getElementById("numQuestionsSlider").value;
    student.doProblemSet(difficulty, numQuestions);
    document.getElementById("createHomework").style.visibility = 'hidden';
    popupOn = false;
    document.getElementById("homeworkCountNumber").textContent = student.ungradedHomework.length;
    addTime(10, 15);
}

function recieveHomeworkGrade() {
    if (popupOn) {
        return;
    }
    student.recieveHomeworkGrade();
    document.getElementById("homeworkCountNumber").textContent = student.ungradedHomework.length;
}

function randomGrade() {
    return Math.floor(Math.random * 50);
}

const date = new Date();
const hour = date.getHours();
const min = date.getMinutes();

let currHour = 7;
let currMin = 0;

let currHourRotation = 0;
let currMinuteRotation = 0;

let hourHand = document.getElementById("hourHand");
let minuteHand = document.getElementById("minuteHand");

const formattedTime = `${hour}:${min}`;
console.log(formattedTime);
document.getElementById("homeworkCountNumber").textContent = student.ungradedHomework.length;

if (hour != 0) {
    //document.getElementById("title").style.visibility = 'hidden';
}


function sleep() {
    sleepShower(2, 0);
}

function shower() {
    sleepShower(0, 10);
}

function sleepShower(hour, min) {
    if (popupOn) {
        return;
    }
    let showerPopup;
    if (student.ungradedHomework.length != 0) {
        showerPopup = document.getElementById("showerPopup");
    } else {
        showerPopup = document.getElementById("showerPopup2");
        addTime(hour, min);
    }
    showerPopup.style.visibility = 'visible';
    popupOn = true;
    setTimeout(() => {
        popupOn = false;
        showerPopup.style.visibility = 'hidden';
    }, 5000);
}

function addTime(hours, minutes) {
    if (minutes < 0 || minutes > 59 || hours < 0) {
        throw "IllegalArgumentException";
    }
    currHourRotation += (hours / 12) * 360;
    currMinuteRotation += 360 * hours + (minutes / 60) * 360;
    hourHand.style.transform = 'rotate(' + currHourRotation + 'deg)';
    minuteHand.style.transform = 'rotate(' + currMinuteRotation + 'deg)';

}

