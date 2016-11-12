
// VARIABLES ======================
var animalArray = ["border collie", "red panda", "elephant", "sugar glider"];

var click = 0;

var total = animalArray.length;

var dataClose = 0;


//create initial buttons from array================================
		for (var i = 0; i < animalArray.length; i++) {

					var arrayBtn = animalArray[i];
					//adding iterative buttons to DOM
					$('#animalButtons').append('<button class="animal firstAnimals">'+ arrayBtn);
					// $('.animal').data("animal", arrayBtn);
					
				}

//adding input to array and creating new button=====================
		$('#addAnimal').on('click', function() {
			
			click++;
			
			
			//getting value from input
			var animal = $('#animalInput').val().trim();
				console.log(animal);

			//pushing to array
			var addArray = animalArray.push(animal);
				console.log(animalArray);

			//updating length from push
			total = (animalArray.length -1);
			console.log(total);

			//creating buttons from array	
			var arrayBtn = animalArray[total];
			var animalBtn = $('<button class="animal addedAnimals">').attr("id", "data-" + arrayBtn).text(arrayBtn);
			$('#animalButtons').append(animalBtn);

			// Create a button with unique identifers based on what number it is in the list. Again use jquery to do this.
			// Button with data attribute
			// Append a letter X inside.  
			var animalBtnClose = $("<button>").attr("data-link", arrayBtn)
						.addClass("check").append("X");

			// Append the button to the animal button
			$(animalBtn).before(animalBtnClose);
			
			// Clear the textbox when done
			$('#animalInput').val("");
			
			//running everytime a new item is clicked
			localStorageArraytoJson();

				return false;
		});


//on button click trigger ajax query===============================
$(document).on('click', '.animal', function() {
        // var animalAttr = $(this).data('animal');
        var animalName = $(this).text().replace(" ", "+");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
         animalName + "&api_key=dc6zaTOxFJmzC&limit=10";
         	console.log(queryURL);

    //Ajax Call   	
	$.ajax({
			url: queryURL, 
			method: 'GET'
            })
		.done(function(response) {

				var results = response.data;
				console.log(results);
			//iterate through all 10 objects called in ajax don't show r rating add rest to DOM
			for(var i = 0; i < results.length; i++) {
					if (results[i].rating == 'r') 
					{

					}
					else{
						var gifDiv = $('<div class="animalItem">');
						var rating = results[i].rating;
						rating = rating.toUpperCase();
						console.log(rating);

						var p = $('<p>').text("Rating: " + rating);
						var animalImage = $('<img class="animalImage">')
										.attr('src', results[i].images.
										fixed_height_still.url)
										.attr('data-state', 'still');
						console.log(animalImage);

						gifDiv.append(p);
						gifDiv.append(animalImage);

						$('#animals').prepend(gifDiv);

					} //else statement
				}//for statement
			});//ajax done function	
});//button click

//add animate on click of gif
$(document).on('click', '.animalImage', function() {
	//get data-state value store in state
	var state = $(this).attr('data-state');

	
	//check if current state is still if so change url to gif
	if ( state == 'still'){
				$(this).attr('src', $(this).attr("src").replace('_s', ''));
                $(this).attr('data-state', 'animate');
            }else{
				$(this).attr('src', $(this).attr("src").replace('.gif', '_s.gif'));
                $(this).attr('data-state', 'still');
            }
		});

//BONUS SWAG ==================================================
function localStorageArraytoJson(){
// Clear localStorage
	localStorage.clear();

	// Store array as string in localStorage
	localStorage.setItem("animalButtons", JSON.stringify(animalArray));
}

//When a user clicks check box delete the specific content
$(document.body).on('click', '.check', function(){

	// Get the todoNumber of the button from its data attribute.
	var dataName = $(this).data("link");
	console.log(dataName + " =datanumber");
	
	// Empty the specific <p> element that previously held the todo item.
	$("#data-" + dataName).remove();
	$(this).remove();

	// Find and remove item from an array
	var itemIndex = animalArray.indexOf(dataName);
	if(itemIndex != -1) {
		animalArray.splice(itemIndex, 1);
	}

	localStorageArraytoJson();
});

//Display localStorage=============

var retrievedData = localStorage.getItem("animalButtons");
var animalArray2 = JSON.parse(retrievedData);

if (animalArray2 !== null) {	
	for (var i = 0; i < animalArray2.length; i++) {

					var arrayBtn2 = animalArray2[i];
			if(animalArray.indexOf(animalArray2[i]) === -1) {
					//adding iterative buttons to DOM
					$('#animalButtons').append('<button class="loadAnimals">'+ arrayBtn2);
				}
					
		}
	}
