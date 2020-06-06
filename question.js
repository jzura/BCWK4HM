// pos is position of where the user in the test or which question they're up to
var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, correct = 0;

//Timer Variables
var timeleft = 10;
var downloadTimer = setInterval(myTimer, 1000);


//Score
var score = 0;
var savedscore = score;

//Game Booleans
var gameLost = false;


// Render question and display on page
function renderQuestion() {


    //Make sure test isnt complete
    if (pos >= questions.length) {

        //Stop Time 
        clearInterval(downloadTimer);
        

        //Display results
        $("#test_status").html("All done");
        $("#test_status").append("<br> Your score: " + score);
        $("#high-scores").show();


        //Hide Quiz
        $("#test").hide();
        $("#timespent").hide();

        // resets the variable to allow users to restart the test
        pos = 0;
        correct = 0;


        // stops rest of renderQuestion function running when test is completed
        return false;
    }

    // what question you are up too
    $("#test_status").html("Question " + (pos + 1) + " of " + questions.length);

    var question = questions[pos].question;
    var chA = questions[pos].a;
    var chB = questions[pos].b;
    var chC = questions[pos].c;

    // display the question
    $("#test").html("<h3>" + question + "</h3>");


    // display the answer options
    $("#test").append("<label> <input type='radio' onclick='checkAnswer()' name='choices' value='A'> " + chA + "</label><br>");
    $("#test").append("<label> <input type='radio' onclick='checkAnswer()' name='choices' value='B'> " + chB + "</label><br>");
    $("#test").append("<label> <input type='radio' onclick='checkAnswer()' name='choices' value='C'> " + chC + "</label><br><br>");
}

// check if answer is correct
function checkAnswer() {

    // use getElementsByName because we have an array which it will loop through
    choices = document.getElementsByName("choices");
    for (var i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            choice = choices[i].value;
        }
    }

    // checks if answer matches the correct choice
    if (choice == questions[pos].answer) {

        //Add extra time
        timeleft += 5;

        //Add score
        score += 5;


        //each time there is a correct answer this value increases
        correct++;
    }

    // changes position of which character user is on
    pos++;

    // then the renderQuestion function runs again to go to next question
    if (gameLost == false) {
        renderQuestion();
    }
};



//Timer function
function myTimer() {

    //If time runs out
    if (timeleft == 0) {


        //Display results
        $("#test_status").html("All done");
        $("#test_status").append("<br> Your score: " + score);
        $("#high-scores").show();

        //Hide rendered question
        $("#test").hide();
        $("#timespent").hide();

        // resets the variable to allow users to restart the test
        pos = 0;
        correct = 0;

        // stops rest of renderQuestion function running when test is completed
        gameLost = true;
        clearInterval(downloadTimer);
        return false;
    }
    //render time left on page
    $("#timespent").html("Time: " + timeleft);
    timeleft -= 1;
};


// multidimensial question array
var questions = [
    {
        question: "What is 36 + 42",
        a: "64",
        b: "78",
        c: "76",
        answer: "B"
    },
    {
        question: "What is 7 x 4?",
        a: "21",
        b: "27",
        c: "28",
        answer: "C"
    },
    {
        question: "What is 16 / 4?",
        a: "4",
        b: "6",
        c: "3",
        answer: "A"
    },
    {
        question: "What is 8 x 12?",
        a: "88",
        b: "112",
        c: "96",
        answer: "C"
    }
];

function addHighScore() {
    var input = $("#init");
    localStorage.setItem("initials", input.val());
    localStorage.setItem("scores", score);
};

// Add event listener to call renderQuestion on page load event
window.addEventListener("load", renderQuestion);


