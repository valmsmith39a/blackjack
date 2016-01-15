
$(document).ready(init);

var arrayOfCardsG = [];
var startingCardsArrayG = [];
var computerCardsArrayG = [];
var computerCardsDOMArrayG = [];
var computerTotalG = 0; 
var playerCardsArrayG = [];
var playerCardsDOMArrayG = [];
var playerTotalG = 0; 
var computerPlaysFlagG = false; 

function init(){
	$('#start-button').on('click', startGameButton);
	$('#hit-button').on('click', hitButton);
	$('#stay-button').on('click', stayButton);	
}

function hitButton(e){
	dealCard();  
}

function stayButton(e){	
  var arrayOfAs = playerCardsArrayG.filter(function(item){
 		return item.rank === 'A';
  });

  if(arrayOfAs.length > 0){
  	playerTotalG = 0; 
  	playerCardsArrayG.map(function(item){  			
  			playerTotalG += item.value;
  	});
  	for(var i = 0; i < arrayOfAs.length; i++){
  		if(playerTotalG > 21){
  			playerTotalG = playerTotalG - 10; 
  		}
  	}
  }
  else {
  	playerTotalG = 0; 
  	playerCardsArrayG.map(function(item){
  		playerTotalG += item.value;
  	});
  }

  var $playerScore = $('<div>').addClass('player-score').text(playerTotalG);
	$('#player-score-display').empty();
	$('#player-score-display').append($playerScore);
	
	computerPlays(); 
}

function computerPlays(){

	var arrayOfAs = computerCardsArrayG.filter(function(item){
 		return item.rank === 'A';
  });

  if(arrayOfAs.length > 0){
  	computerTotalG = 0; 
  	computerCardsArrayG.map(function(item){  			
  			computerTotalG += item.value;
  	});
  	for(var i = 0; i < arrayOfAs.length; i++){
  		if(computerTotalG > 21){
  			computerTotalG = computerTotalG - 10; 
  		}
  	}
  }
  else {
  	computerTotalG = 0; 
  	computerCardsArrayG.map(function(item){
  		computerTotalG += item.value;
  	});
  }

	if(computerPlaysFlagG === false){
		$('.hide-card').hide();
		computerCardsDOMArrayG.splice(1,1);
		computerPlaysFlagG = true;
	}

	$('.computer-card2').show();

	if(computerTotalG < 17){
		while (computerTotalG < 17){
			var randomArrayIndex = Math.floor(Math.random()*arrayOfCardsG.length + 0);
			var cardObjectSelected = arrayOfCardsG.splice(randomArrayIndex,1)[0];
			computerCardsArrayG.push(cardObjectSelected);
			displayCards()

			var arrayOfAs = computerCardsArrayG.filter(function(item){
 				return item.rank === 'A';
		 	 });

		  if(arrayOfAs.length > 0){
		  	computerTotalG = 0; 
		  	computerCardsArrayG.map(function(item){  			
				computerTotalG += item.value;
	  	});
	  	for(var i = 0; i < arrayOfAs.length; i++){
	  		if(computerTotalG > 21){
	  			computerTotalG = computerTotalG - 10; 
	  		}
	  	}
		  }
		  else {
		  	computerTotalG = 0; 
		  	computerCardsArrayG.map(function(item){
	  		computerTotalG += item.value;
	  	});
		  }
		}

		if(computerTotalG <= 21){
			decideWinner(); 
		}
		else {
			alert('DEALER BUSTED. YOU WIN');
			resetGame(); 
		}
	}
	// Dealer (computer) stays bc point total >= 17 
	else{
		decideWinner()
	}
}

function decideWinner(){
	if(playerTotalG <= 21 && computerTotalG <= 21){
		if(playerTotalG > computerTotalG){
			alert('YOU WIN');
			resetGame(); 
		}
		else if (playerTotalG === computerTotalG){
			alert('YOU TIE')
			resetGame();
		}
		else{
			alert('YOU LOSE');
			resetGame();
		}
	}

	else {
		if(playerTotalG < 21){
			alert('YOU WIN');
		}
	else {
		alert('YOU LOSE');
		}
	}
}

function resetGame(){
	$('#table-dealer').empty();
	$('#table-player').empty();

	arrayOfCardsG.splice(0, arrayOfCardsG.length);
	computerCardsArrayG.splice(0, computerCardsArrayG.length);
	computerCardsDOMArrayG.splice(0, computerCardsDOMArrayG.length);
	computerTotalG = 0; 
	playerCardsArrayG.splice(0, playerCardsArrayG.length);
	playerCardsDOMArrayG.splice(0, playerCardsDOMArrayG.length);
	playerTotalG = 0; 
	computerPlaysFlagG = false; 

	startGame(); 
}

function dealCard(){

	var randomArrayIndex = Math.floor(Math.random()*arrayOfCardsG.length + 0);
	var cardObjectSelected = arrayOfCardsG.splice(randomArrayIndex,1)[0];
	playerCardsArrayG.push(cardObjectSelected);
	displayCards();

	var arrayOfAs = playerCardsArrayG.filter(function(item){
 		return item.rank === 'A';
  });

  if(arrayOfAs.length > 0){
  	playerTotalG = 0; 
  	playerCardsArrayG.map(function(item){  			
  			playerTotalG += item.value;
  	});
  	for(var i = 0; i < arrayOfAs.length; i++){
  		if(playerTotalG > 21){
  			playerTotalG = playerTotalG - 10; 
  		}
  	}
  }
  else {
  	playerTotalG = 0; 
  	playerCardsArrayG.map(function(item){
  		playerTotalG += item.value;
  	});
  }

  var $playerScore = $('<div>').addClass('player-score').text(playerTotalG);
	$('#player-score-display').empty();
	$('#player-score-display').append($playerScore);

  bustOrNot('player'); // Check if bust. Indicate checking player, not computer (dealer).
}

function bustOrNot(whichPlayer){
	if(whichPlayer === 'player'){
		if(playerTotalG > 21){
			alert('YOU BUST. START OVER.');
			resetGame();
		}
	}
	else if(whichPlayer === 'computer'){
		computerCardsArrayG.map(function(item, index){
			computerTotalG += item.value;
		});
		if(computerTotalG > 21){
			alert('DEALER BUST. YOU WIN');
			resetGame()
		}
	}
}

function startGameButton(e){
	startGame(); 
}

function startGame(){
	initArrayOfCards(); 
	selectStartingCards();
	displayCards();
	alert('Would you like to hit or stay?');
}

function initArrayOfCards(){
	var suitsArray = ['diamonds', 'hearts', 'clubs', 'spades'];
	for(var i = 0; i < 4; i++){
		for(var j=1; j<14; j++){
			if(j === 1){
				var cardObject = {
					rank:'A',
				  value:11,
					suit:suitsArray[i],
					color: (i === 0 || i === 1) ? 'red':'black'
				};
			}
			else if((j > 1) && (j < 11)) {
				var cardObject = {
					rank:j,
				  value:j,
					suit:suitsArray[i],
					color: (i === 0 || i === 1) ? 'red':'black'
				};
			}
			else if(j === 11){
				var cardObject = {
					rank:'J',
					value: 10,
					suit:suitsArray[i],
					color: (i === 0 || i === 1) ? 'red':'black'
			  };
			}
			else if(j === 12){
				var cardObject = {
					rank:'Q',
					value: 10,
					suit:suitsArray[i],
					color: (i === 0 || i === 1) ? 'red':'black'
			  };
			}
			else if(j === 13){
				var cardObject = {
					rank:'K',
					value: 10,
					suit:suitsArray[i],
					color: (i === 0 || i === 1) ? 'red':'black'
			  };
			}  // else if 
			arrayOfCardsG.push(cardObject);
		}  // inner for loop 
	}  // outter for loop 
}

function selectStartingCards(){
  var randomArrayIndex = Math.floor(Math.random()*arrayOfCardsG.length + 0);
	var card1 = arrayOfCardsG.splice(randomArrayIndex,1)[0];
	randomArrayIndex = Math.floor(Math.random()*arrayOfCardsG.length + 0);
	var card2 = arrayOfCardsG.splice(randomArrayIndex,1)[0]; 
	computerCardsArrayG.push(card1);
	computerCardsArrayG.push(card2);
  	
	randomArrayIndex = Math.floor(Math.random()*arrayOfCardsG.length + 0);
	var card3 = arrayOfCardsG.splice(randomArrayIndex,1)[0]; 
	randomArrayIndex = Math.floor(Math.random()*arrayOfCardsG.length + 0);
	var card4 = arrayOfCardsG.splice(randomArrayIndex,1)[0];  	
	playerCardsArrayG.push(card3);
	playerCardsArrayG.push(card4);
    
	playerTotalG = card3.value + card4.value; 

}

function emptyTable(){
	$('#table-dealer').empty();
	$('#table-player').empty();
	computerCardsDOMArrayG.splice(0, computerCardsDOMArrayG.length);
	playerCardsDOMArrayG.splice(0,playerCardsDOMArrayG.length);
}

function displayCards(){
	emptyTable();

	var $playerScore = $('<div>').addClass('player-score').text(playerTotalG);
	$('#player-score-display').empty();
	$('#player-score-display').append($playerScore);

	if(computerPlaysFlagG === true){
		computerCardsArrayG.map(function(object, index){
		var computerCardDOM = $('<div>').addClass('computer-card').text(computerCardsArrayG[index].value);
		computerCardsDOMArrayG.push(computerCardDOM);
		});
		$('#table-dealer').append(computerCardsDOMArrayG);

		playerCardsArrayG.map(function(object, index){
		var playerCardDOM = $('<div>').addClass('player-card').text(playerCardsArrayG[index].value);
		playerCardsDOMArrayG.push(playerCardDOM);
	  });
	  $('#table-player').append(playerCardsDOMArrayG);
	}
	else{
		var computerCardDOM1 = $('<div>').addClass('computer-card1').text(computerCardsArrayG[0].value);
		computerCardsDOMArrayG.push(computerCardDOM1);

		var computerCardDOM2 = $('<div>').addClass('computer-card2').text(computerCardsArrayG[1].value);
		computerCardsDOMArrayG.push(computerCardDOM2);

    var hideCard = $('<div>').addClass('hide-card').text('Fun');
	  computerCardsDOMArrayG.push(hideCard);

		$('#table-dealer').append(computerCardsDOMArrayG);
		$('.computer-card2').hide();
		
		playerCardsArrayG.map(function(object, index){
		var playerCardDOM = $('<div>').addClass('player-card').text(playerCardsArrayG[index].value);
		playerCardsDOMArrayG.push(playerCardDOM);
	  });
	  $('#table-player').append(playerCardsDOMArrayG);
	}	
}


