var triviaQuestions = [{

	question: "Who was awarded Album of The Year at the 2018 Grammy awards?",
	answerList: ["Awaken, My Love! — Childish Gambino", "Damn. — Kendrick Lamar", "24K Magic — Bruno Mars", "Melodrama — Lorde"],
	answer: 2
	
},{
	question: "Name 2018's best new artist?",
	answerList: ["Alessia Cara", "Khalid", "Lil Uzi Vert", "Julia Michaels"],
	answer: 0
},{
	question: "Finish the lyric: Have a seat in the foyer, take a number I was lightning before... ",
	answerList: ["...my brother", "...life's wonder", "...the thunder", "...a hunter"],
	answer: 2
},{
	question: "Name 2018's R&B song of the year?",
	answerList: ["Location", "Redbone", "That's What I Like", "Supermodel"],
	answer: 2
},{
	question: " 2018's Country Album of The Year was awarded to?",
	answerList: ["Kenny Chesney", "Lady Antebellum", "Little Big Town", "Chris Stapleton"],
	answer: 3
},{
	question: "Who was awarded the Michael Jackson video vanguard award at the 2018 MTV VMA's?",
	answerList: ["Beyonce", "Jennifer Lopez", "Bruno Mars", "Aretha Franklin"],
	answer: 1
},{
	question: "Which artist played Gloria in Happy Feet 2?",
	answerList: ["Pink", "Madonna", "Christina Aguilera", "Lady Gaga"],
	answer: 0
},{
	question: "Who was awarded best female pop artist at the 2018 BET awards?",
	answerList: ["Rihanna", "Nicki Minaj", "Ariana Grande", "Beyonce"],
	answer: 3
},{
	question: "Which music couple has been married for a decade?",
	answerList: ["Priyanka & Nick Jonas", "Chole & Logan", "Beyonce & Jay-Z", "Pete & Ariana"],
	answer: 2
},{
	question: "Finish the lyric: That's a real one in your reflection, without a follow...",
	answerList: ["...without a mention", "...asking for attention", "...without extensions", "...sitting in detention"],
	answer: 0
},{
	question: "Bruno Mars played what character in Rio 2?",
	answerList: ["Blu", "Nigel", "Tulio", "Roberto"],
	answer: 3
},{
	question: "Who is the top Grammy award winner of all time?",
	answerList: ["U2", "Georg Solti", "Quincy Jones", "Kanye West"],
	answer: 1
},{
	question: "Which artist won a Pulitzer Prize for distinguished musical composition in 2018? ",
	answerList: ["Taylor Swift", "Adele", "Kendrick Lamar", "Celine Dion"],
	answer: 2
},{
	question: "Finish the lyric: Sipping bubbly, feeling lovely, living lovely...",
	answerList: ["...Just love me", "...No one around me", "...I want to be with you", "...The party won't end"],
	answer: 0
},{
	question: "Which movie soundtrack was rated Top Soundtrack at the 2018 Billboard music awards?",
	answerList: ["Black Panther", "The Greatest Showman", "Guardians of the Galaxy, Vol. 2", "Moana"],
	answer: 3
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "You Got It!",
	incorrect: "No, that's not it.",
	endTime: "Sorry, Time's Up!",
	finished: "Count it up, count it up, count it up, count it ."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}