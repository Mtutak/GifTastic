
// VARIABLES ======================
var animalArray = ["border collie", "red panda", "elephant", "sugar glider"]

var click = 0;

var total = animalArray.length;
	

	// 	var state = $(this).attr
	// 	//replace? _s, ''
	// });


//creating new button

		$('#addAnimal').on('click', function() {
			click++;
			
			total = total + click

			var animal = $('#animalInput').val().trim();
				console.log(animal);

			var addArray = animalArray.push(animal);
				console.log(animalArray);

			console.log(total);
			//creating buttons from array
			//Add new input to array add to button on screen
				for (var i = 0; i < total; i++) {
					var arrayBtn = animalArray[i]
					console.log(arrayBtn);
					$('#animalButtons').append('<button class="animal">'+ arrayBtn);
					$('.animal').data("animal", arrayBtn);
					
				}

			// var animalBtn = $('<button>').data("animal", animal).
			// 				append(animal);

				return false;
		});


//query from button click
$(document).on('click', '.animal', function() {
			console.log("success :" + $(this).text());
        // var animalAttr = $(this).data('animal');
        var animalName = $(this).text().replace(" ", "+");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
         animalName + "&api_key=dc6zaTOxFJmzC&limit=10";
         	console.log(queryURL);

	$.ajax({
                url: queryURL,
                method: 'GET'
            })
			.done( function(response) {

				var results = response.data;
				console.log(results);

		for(var i = 0; i < results.length; i++) {
				if (results[i].rating == 'r') 
				{

				}
				else{
					var gifDiv = $('<div class = "animalItem">');
					var rating = results[i].rating;
					console.log(rating);

					var p = $('<p>').text("Rating: " + rating);
					var animalImage = $('<img class = "animalImage">')
									.attr('src', results[i].images.
									fixed_height_still.url);
					console.log(animalImage);

					$('#animals').append(gifDiv).append(p).append(animalImage);
				} //else statement
			}//for statement
		});//ajax done
	
});//button click


//allow deletion of list 1-student-do-todolist

