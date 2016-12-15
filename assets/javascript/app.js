
//OBJECT
//===================================================================================================
var TriviaGame = {

	inCorrAnsCnt: 0,
	corrAnsCnt: 0,
	missed: 0,
	currQues: 0,
	time: 0,
	myTimer: "",
	timeCnt: 31,

	msgArray: [
				"'Yep! The correct answer is '' + this.triviaQuesArray[this.currQues].ans",
				"'Nope! The correct answer is ' + this.triviaQuesArray[this.currQues].ans",
				"'Sorry, Time is Up! The correct answer is ' + this.triviaQuesArray[this.currQues].ans",
				"'All done! Here's how you did: <br/>Correct Answers' + this.corrAnsCnt + '<br/>Incorrect Answers: ' + this.inCorrAnsCnt + '<br/> Unanswered: ' + this.missed"
				],

	triviaQuesArray: [
						{ ques: "Question1",
						  options: ["Q1Option1", 
						 			"Q1Option2", 
						 			"Q1Option3", 
						 			"Q1Option4"], 
						  ans: "Q1Option3"},
						{ ques: "Question2",
						  options: ["Q2Option1", 
						 			"Q2Option2", 
						 			"Q2Option3", 
						 			"Q2Option4"], 
						  ans: "Q2Option4"},
						{ ques: "Question3",
						  options: ["Q3Option1", 
						 			"Q3Option2", 
						 			"Q3Option3", 
						 			"Q3Option4"], 
						  ans: "Q3Option1"},
						{ ques: "Question4",
						  options: ["Q4Option1", 
						 			"Q4Option2", 
						 			"Q4Option3", 
						 			"Q4Option4"], 
						  ans: "Q4Option2"},
						{ ques: "Question5",
						  options: ["Q5Option1", 
						 			"Q5Option2", 
						 			"Q5Option3", 
						 			"Q5Option4"], 
						  ans: "Q5Option3"},
						],

	displayMsg(msg){

		//clear the question and options div
		$("#question-div").html("");
		$("#options-div").html("");

		//stop the timer
		clearInterval(this.myTimer);

		$("#msg-div").html(msg);
	},

	doTimeOut: function(){
		//increment missed count
		this.missed++;
		var msg = "Sorry, Time is Up! The correct answer is " + this.triviaQuesArray[this.currQues].ans;
		this.displayMsg(msg);

		//display next question
		setTimeout(function(){TriviaGame.nextQuestion()}, 1000 * 5);
	},

	incGameTimerCnt: function(){
		if(TriviaGame.timeCnt > 0){
			TriviaGame.timeCnt--;
		}else{
			TriviaGame.doTimeOut();
		}
		//display the timer
		$("#timer-div").html("Time remaining is " + TriviaGame.timeCnt);
	},

	nextQuestion: function(){

		if (this.currQues + 1 < this.triviaQuesArray.length){
			this.currQues++;
			this.displayQues(this.currQues);
		}
		else { //END OF GAME
			msg = "All done! Here's how you did: <br/>Correct Answers" + this.corrAnsCnt + "<br/>Incorrect Answers: " + this.inCorrAnsCnt + "<br/> Unanswered: " + this.missed + "<br/><button class = 'start'>Start Over</button>";
			this.displayMsg(msg);
		}

	},

	validateOption: function(selOption){

		var msg;

		if(selOption === this.triviaQuesArray[this.currQues].ans){
			this.corrAnsCnt++;
			msg = "Yep! The correct answer is " + this.triviaQuesArray[this.currQues].ans; 
			//correct answer
			this.displayMsg(msg);
		}
		else if(selOption !== this.triviaQuesArray[this.currQues].ans){
			this.inCorrAnsCnt++;
			msg =  "Nope! The correct answer is "+ this.triviaQuesArray[this.currQues].ans;

			//wrong answer
			this.displayMsg(msg);
		}

		//display the next question, if not end of game
		setTimeout(function(){TriviaGame.nextQuestion()}, 1000 * 5);
	
	},

	displayQues: function(num){

		$("#msg-div").html("");
		$("#timer-div").html("");

		//Display Question
		$("#question-div").html("<p>" + this.triviaQuesArray[num].ques + "</p>");

		//Display options for the question

		var opt = this.triviaQuesArray[num].options;

		for(k=0; k<opt.length; k++){
			var optButton = $("<button/>", {	
			'text': opt[k],
			'class': '.options',
			'data-ind': num,
			'value' : opt[k]
			});

			var brk = $("<br/>");

			//display options button on screem
			optButton.appendTo("#options-div");
			brk.appendTo("#options-div");

			}

		//start the timer
		this.timeCnt = 31;
		this.myTimer = setInterval(this.incGameTimerCnt, 1000);

		//display the timer
		/*$("#timer-div").html("Time remaining is " + this.timeCnt);*/
			
	},

	startGame: function(){

		this.inCorrAnsCnt = 0;
		this.corrAnsCnt = 0;
		this.missed = 0;
		this.currQues = 0;
		this.timeCnt = 31;


		//displayQues function passing 0
		this.displayQues(0);

	},

	displayQuesArray: function(){

		for(i=0, j=this.triviaQuesArray.length; i<j ; i++){

			console.log(this.triviaQuesArray[i]);
			var quest = this.triviaQuesArray[i].ques;
			var opt = this.triviaQuesArray[i].options;

			for(k=0; k<opt.length; k++){
				console.log(opt[k]);
			}

		}
	}

};

// FUNCTIONS (These are bits of code that we will call upon to run when needed)
// ==================================================================================================



// MAIN PROCESS (THIS IS THE CODE THAT CONTROLS WHAT IS ACTUALLY RUN)
// ==================================================================================================
TriviaGame.displayQuesArray();

$(document).on("click",".start", function(){

	console.log("Button clicked");

	if ($(this).hasClass("start")) {
		console.log("Start button clicked!");
		$("#start").hide();
		
		//display first question
		TriviaGame.startGame();

	}
});

$("#options-div").on("click","button", function(){

	console.log("Option Button clicked");
	console.log("Value of option is" + $(this).val());
	console.log("Index of ques array is" + $(this).data("ind"));
	var selOption = $(this).val();
	var quesIndx = $(this).data("ind");

	//validate selected option
	TriviaGame.validateOption(selOption);

});