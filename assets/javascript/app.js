
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

	imgArray: [
				"<img class = 'image' src='assets/images/mickey.gif' alt='animated mickey pic'>",
				"<img class = 'image' src='assets/images/martian.gif' alt='animated martian pic'>",
				"<img class = 'image' src='assets/images/elmer.gif' alt='animated elmer pic'>",
				"<img class = 'image' src='assets/images/devil.gif' alt='animated tasmanian devil pic'>",
				"<img class = 'image' src='assets/images/sylvester.gif' alt='animated sylvester the cat pic'>"
				],

	triviaQuesArray: [
						{ ques: "Which was the first cartoon to get a star on the Hollywood walk of fame?",
						  options: ["Mickey Mouse", 
						 			"Bugs Bunny", 
						 			"Sylvester the Cat", 
						 			"Porky Pig"], 
						  ans: "Mickey Mouse"},
						{ ques: "Since debuting in 1948, Marvin the Martian has had one goal: to blow up Earth. What’s his motivation?",
						  options: [
						  	"Earth obstructs his view of Venus, his favorite planet.", 
						 	"Destruction is simply in his DNA. He is, after all, based on Mars, the Roman god of war.", 
						 	"His love interest passed him over for an Earthling and he wants revenge."
						 		], 
						  ans: "Earth obstructs his view of Venus, his favorite planet."},
						{ ques: "Mel Blanc, whose nickname was 'The Man of 1,000 Voices,' provided voices for 90 percent of Looney Tunes characters. Who did he not originally voice?",
						  options: ["Daffy Duck", 
						 			"Cecil Turtle", 
						 			"Elmer Fudd", 
						 			"Yosemite Sam"], 
						  ans: "Elmer Fudd"},
						{ ques: "Who was the last Looney Tunes character introduced before Warner Bros. Cartoons shut down in 1964?",
						  options: ["Foghorn Leghorn", 
						 			"Tasmanian Devil", 
						 			"Michigan J. Frog", 
						 			"Granny"], 
						  ans: "Tasmanian Devil"},
						{ ques: "Which two characters are rivals?",
						  options: ["Petunia Pig and Porky Pig", 
						 			"Miss Pris.sy and Egghead Jr.", 
						 			"Granny and Sylvester the Cat", 
						 			"Pepe Le Pew and Penelope Pussycat"], 
						  ans: "Granny and Sylvester the Cat"},
						],

	displayMsg(msg){

		//clear the question and options div
		$("#question-div").html("");
		$("#options-div").html("");

		//stop the timer
		clearInterval(this.myTimer);

		$("#msg-div").html(msg);
		$("#media-div").html(this.imgArray[this.currQues]);
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
			msg = "All done! Here's how you did <br/><br/>Correct Answers: " + this.corrAnsCnt + "<br/>Incorrect Answers: " + this.inCorrAnsCnt + "<br/> Unanswered: " + this.missed + "<br/><button class = 'start'>Start Over</button>";
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
		$("#media-div").html("");
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