// GLOBAL VARIABLES (Accessible by all functions)
// ==================================================================================================
var incorrectAnsCnt = 0;
var corrAnsCnt = 0;
var myWatch;


//OBJECT
//===================================================================================================

//Game question object array
var triviaQuesArray = [
						{ques: "Question1", opt1: "Q1Option1", opt2: "Q1Option2", opt3: "Q1Option3", opt4: "Q1Option4", corrAns: 3},
						{ques: "Question2", opt1: "Q2Option1", opt2: "Q2Option2", opt3: "Q2Option3", opt4: "Q2Option4", corrAns: 1},
						{ques: "Question3", opt1: "Q3Option1", opt2: "Q3Option2", opt3: "Q3Option3", opt4: "Q3Option4", corrAns: 2},
						{ques: "Question4", opt1: "Q4Option1", opt2: "Q4Option2", opt3: "Q4Option3", opt4: "Q4Option4", corrAns: 3},
						{ques: "Question5", opt1: "Q5Option1", opt2: "Q5Option2", opt3: "Q5Option3", opt4: "Q5Option4", corrAns: 1}
];

// stopwatch object
/*var stopwatch = {

	time: 30,

	reset: function(){
		stopwatch.time = 30;
	},

	start: function(){
		myWatch = setInterval(stopwatch.count, 1000);
	},
	stop: function(){
		clearInterval(myWatch);
	},
	count: function(){
		console.log(stopwatch.time);
		stopwatch.time--;
		$("#timer-div").html(stopwatch.time);

		
		if (stopwatch.time === 0){
			alert("Time is up!");
			stopwatch.reset();
		}

	}

};*/
var stopwatch = {

  time: 31,

  reset: function() {

    stopwatch.time = 30;

    $("#timer-div").html(stopwatch.time);

  },

  start: function() {

    //  Use setInterval to start the count here.
    myWatch = setInterval(stopwatch.count, 1000);

  },
  stop: function() {

    //  Use clearInterval to stop the count here.
    clearInterval(myWatch);

  },

  count: function() {

  	if (stopwatch.time > 0){

	    stopwatch.time--;

	    console.log(stopwatch.time);
	}
	else{
		stopwatch.reset();
	}

    $("#timer-div").html(stopwatch.time);

  }

};


// FUNCTIONS (These are bits of code that we will call upon to run when needed)
// ==================================================================================================

//Testing/debugging
$.each(triviaQuesArray, function() {
	$.each(this, function(key,value) {

		console.log(key + ":" + value);
	});
});

function displayQuestion(num){
	$("#question-div").html("<p>" + triviaQuesArray[num].ques + "</p>");
	var opt1Button = $("<button><p>" + triviaQuesArray[num].opt1 + "</p></button>"); 
	//$(".img").attr("alt", " image");
	opt1Button.addClass("." + "options");
	opt1Button.data("ind", num);
	opt1Button.val(triviaQuesArray[num].opt1);
	var opt2Button = $("<button><p>" + triviaQuesArray[num].opt2 + "</p></button>"); 
	//$(".img").attr("alt", " image");
	opt2Button.addClass("." + "options");
	opt2Button.data("ind", num);
	opt2Button.val(triviaQuesArray[num].opt2);
	var opt3Button = $("<button><p>" + triviaQuesArray[num].opt3 + "</p></button>"); 
	//$(".img").attr("alt", " image");
	opt3Button.addClass("." + "options");
	opt3Button.data("ind", num);
	opt3Button.val(triviaQuesArray[num].opt3);
	var opt4Button = $("<button><p>" + triviaQuesArray[num].opt4 + "</p></button>"); 
	//$(".img").attr("alt", " image");
	opt4Button.addClass("." + "options");
	opt4Button.data("ind", num);
	opt4Button.val(triviaQuesArray[num].opt4);

	//append button to options-div
	opt1Button.appendTo("#options-div");
	opt2Button.appendTo("#options-div");
	opt3Button.appendTo("#options-div");
	opt4Button.appendTo("#options-div");
}

function newQuestion(num){

	//start timer
		stopwatch.start();

		//display first question
		displayQuestion(num);

}

function startGame(){

	//reset variables
	incorrectAnsCnt = 0;
	corrAnsCnt = 0;

	//for(i=0, j=triviaQuesArray.length; i<j ; i++){

		//start timer and display first question
		newQuestion(0);

	//}

}


// MAIN PROCESS (THIS IS THE CODE THAT CONTROLS WHAT IS ACTUALLY RUN)
// ==================================================================================================
$("button").on("click", function(){

	console.log("Button clicked");

	if ($(this).hasClass("start")) {
		console.log("Start button clicked!");
		$("#start").hide();
		startGame();
	}
});

$("#options-div").on("click","button", function(){

	console.log("Option Button clicked");
	console.log("Value of option is" + $(this).val());
	console.log("Index of ques array is" + $(this).data("ind"));

	//display correct/wrong answer to user
	var index = $(this).data("ind");
	var ansIndx = triviaQuesArray[index].corrAns;
	console.log("correct answer index " + ansIndx);
	
	if (ansIndx === 1){

		if(triviaQuesArray[index].opt1 === $(this).val() ){
			$("#msg-div").html("Correct Answer");
		}else{
			$("#msg-div").html("Wrong Answer. The correct answer is " + triviaQuesArray[index].opt1);
		}

	}
	else if (ansIndx === 2){

		if(triviaQuesArray[index].opt2 === $(this).val() ){
			$("#msg-div").html("Correct Answer");
		}else{
			$("#msg-div").html("Wrong Answer. The correct answer is " + triviaQuesArray[index].opt2);
		}

	}
	else if (ansIndx === 3){

		if(triviaQuesArray[index].opt3 === $(this).val() ){
			$("#msg-div").html("Correct Answer");
		}else{
			$("#msg-div").html("Wrong Answer. The correct answer is " + triviaQuesArray[index].opt3);
		}

	}
	else if (ansIndx === 4){

		if(triviaQuesArray[index].opt4 === $(this).val() ){
			$("#msg-div").html("Correct Answer");
		}else{
			$("#msg-div").html("Wrong Answer. The correct answer is " + triviaQuesArray[index].opt4);
		}

	}

	

	

	//stop the timer

	//wait for a few seconds and display next question

	if ($(this).hasClass("options")) {
			console.log("Option button selected!");
			
	}

});	