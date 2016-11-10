
// VARIABLES ======================
var animalArray = ["border collie", "red panda", "elephant", "sugar glider"];

var click = 0;

var total = animalArray.length;
	

//create initial buttons from array================================
		for (var i = 0; i < animalArray.length; i++) {

					var arrayBtn = animalArray[i];
					//adding iterative buttons to DOM
					$('#animalButtons').append('<button class="animal">'+ arrayBtn);
					// $('.animal').data("animal", arrayBtn);
						
				}

//adding input to array and creating new button=====================
		$('#addAnimal').on('click', function() {
			click = 1;
			
			total = (total - 1) + click;
			
			//getting value from input
			var animal = $('#animalInput').val().trim();
				console.log(animal);

			//pushing to array
			var addArray = animalArray.push(animal);
				console.log(animalArray);

			console.log(total);

			//creating buttons from array	
			var arrayBtn = animalArray[total];
			$('#animalButtons').append('<button class="animal">'+ arrayBtn);
			$('.animal').data("animal", arrayBtn);
			

				return false;
		});


//on button click trigger ajax query===============================
$(document).on('click', '.animal', function() {
        // var animalAttr = $(this).data('animal');
        var animalName = $(this).text().replace(" ", "+");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
         animalName + "&api_key=dc6zaTOxFJmzC&limit=10";
         	console.log(queryURL);

    //NOT WORKING     	
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
					console.log(rating);

					var p = $('<p>').text("Rating: " + rating);
					var animalImage = $('<img class="animalImage">')
									.attr('src', results[i].images.
									fixed_height_still.url);
									//.data('state', 'still');
					console.log(animalImage);

					$('#animals').append(gifDiv).append(p).append(animalImage);
				} //else statement
			}//for statement
		});//ajax done function
	
});//button click

//add animate on click of gif
$(document).on('click', '.animalImage', function() {

	var state = $(this).attr('data-state');

	

	if ( state == 'still'){
				var animate = $(this).attr('src');
				animate.replace('_s', '');
				console.log(animate);
                $(this).attr('data-state', 'animate');
            }else{
                var animate = $(this).attr('src');
				animate.replace('.', '_s.');
				console.log(animate);
                $(this).attr('data-state', 'still');
            }
		});

//allow deletion of list 1-student-do-todolist

