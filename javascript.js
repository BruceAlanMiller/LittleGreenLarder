
	//function to create an element
	function createNode(element) {
  	return document.createElement(element);
	}
	//function to append element to a certain position in .html
	function append(parent, el) {
  	return parent.appendChild(el);
	}

//variables for working with API
const recipeContainer = document.getElementById('recipes');
const modalBody = document.getElementById('modalBody');
const ingredients_ul = document.getElementById('ingredients')
const instructions_ol = document.getElementById("instructions")
const url = 'https://api.spoonacular.com/recipes/random?tags=vegan&number=6&apiKey=0c348994e1f741c28714f414d89a9c6e'
var array = [];
var arr2 = ['red kidney beans', 'butter beans', 'black turtle beans', 'pinto beans', 'chickpeas', 'marrowfat peas', 'yellow split pea', 'red lentils', 'green lentils broth mix', 'organic white pasta', 'non organic pasta', 'organic whole wheat pasta', 'gluten free pasta', 'spaghetti', 'gluten free spaghetti', 'baking powder', 'bicarbonate of soda', 'white caster sugar', 'demerera sugar', 'organic coco powder', 'cocoa nibs', 'organic icing sugar', 'self raising four', 'plain four', 'rice flour', 'ground almonds', 'falafel mix', 'vegan sausage mix', 'nut roast mix', 'b12 yeast flakes', 'tvp mince', 'broth mix', 'peach garden tea', 'earl grey', 'sencha green tea', 'green tea w jasmine', 'apple rings', 'dried apricots', 'dates', 'papaya', 'pinnaple', 'raisins', 'banana chips', 'berries', 'mixed peel', 'glace cherries', 'currants', 'peanuts roasted salted', 'pistachios roasted salted', 'cashews broken', 'blanched almonds', 'walnuts broken', 'mixed buts and raisins', 'pine kernels', 'tiger nuts', 'chia seeds', 'organic pumpkin seeds', 'organic sunflower seeds', 'organic omega seed mix', 'linseed', 'cereal', 'banana bran', 'exotic muesli', 'porridge oats', 'granola mix', 'jasmine rice', 'long grain brown rice', 'long grain rice', 'organic long grain rice', 'white basmati rice', 'arborio rice', 'organic quinoa', 'organic tri colour quinoa', 'popping corn', 'pear cous cous', 'white cous cous', 'vegan white chocolate drops', 'moo free chocolate drops', 'choc honeycomb', 'dark choc raisins', 'milk choc raisins', 'yoghurt almonds', 'white jazzies', 'chocolate jazzies', 'dark chocolate gingers', 'milk choc banana chips', 'dark choc coffee beans', 'rum balls', 'choc cookie fudge clusters', 'nut brittle', 'choc peanuts', 'milk choc brazils', 'dark choc brazils', 'basil', 'cajun', 'cayenne pepper', 'chilli ground', 'chineese 5 spice', 'cinnamon ground', 'cinnamon sticks', 'cumin ground', 'curry powder', 'garam masala', 'garlic powder', 'ginger ground', 'mixed herbs', 'oregano', 'paprika smoked', 'paprika', 'star anise', 'turmeric', 'zaâ€™atar spice', 'crushed chillies', 'black peppercorns', 'mixed spice', 'chipotle chillies crushed', 'fine sea salt', 'sea salt flakes', 'onion powder', 'kibbled onions', 'sumac', 'mixed spice'];
//initial call to API to display recipes on homepage
function getRecipes(){
	fetch(url)
		.then((resp) => resp.json())
		.then(function(data){
			console.log(data);
			let recipes = data.recipes;
			return recipes.map(function(recipe){
				div = createNode('div');
				div.setAttribute('class','col-sm-6')
				recipeImage = recipe.image;
				recipeTitle = recipe.title;
				//recipeTime = recipe.readyInMinutes;
				recipeID = recipe.id;
				div.innerHTML = "<div class='card'><img class='card-img-top' alt='...' src="+recipeImage+"><div class='card-body'><h5 class='card-title'>"+recipeTitle+"</h5><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#modal1' data-id="+recipeID+">Recipe</button></div>";
				append(recipeContainer, div);
	})
})
.catch(function(error) {
        console.log(error);
      });
}

getRecipes();
//functions for initial animation
var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

//calling API to get ingredients of a certain recipe
function getIngredients(recipient){
	fetch('https://api.spoonacular.com/recipes/'+recipient+'/information?includeNutrition=false&apiKey=0c348994e1f741c28714f414d89a9c6e')
	  .then((resp) => resp.json())
	  .then(function(data) {
	    console.log(data);
	    let recipe = data;
	      recipeImage = recipe.image;
	      recipeTitle = recipe.title;
	      recipeTime = recipe.readyInMinutes;
	      document.getElementById("recipe-image").src = recipeImage;
	      document.getElementById("recipe-title").innerHTML = recipeTitle
	      document.getElementById("recipe-time").innerHTML = "Time to make: " + recipeTime + " minuntes"
	    let ingredients = data.extendedIngredients;
			ingredients_ul.innerHTML = "";
	    for(var ingredient of ingredients){
	      let li = createNode('li');
	      let span = createNode('span');
	      ingredientName = ingredient.name;
	      ingredientAmount = ingredient.original;
	      span.innerHTML = ingredientAmount;
	      if(arr2.includes(ingredientName)){
	        span.style.color = "green";
	        append(li,span);
	        append(ingredients_ul,li);
	      }
	      else{
	        append(li,span);
	        append(ingredients_ul,li);
	      }
	    }
	})
	.catch(function(error) {
	  console.log(error);
	});
  }

//calling API to get instructions to a certain recipe
function getInstructions(recipient){
	fetch('https://api.spoonacular.com/recipes/'+recipient+'/information?includeNutrition=false&apiKey=0c348994e1f741c28714f414d89a9c6e')
	  .then((resp) => resp.json())
	  .then(function(data){
	    let instructions = data.analyzedInstructions[0].steps;
	    instructions_ol.innerHTML = "";
	    for(var instruction of instructions){
	      let li = createNode('li');
	      let span = createNode('span');
	      instructionName = instruction.step;
	      span.innerHTML = instructionName;

	      append(li,span);
	      append(instructions_ol,li);
	    }
	})
	.catch(function(error) {
	  console.log(error);
	});
}

//handling and calling functions to display data in modal
$('#modal1').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('id') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  getIngredients(recipient);
  getInstructions(recipient);

})

//printing of a recipe
document.getElementById("btnPrint").onclick = function () {
    printElement(document.getElementById("printThis"));
}

function printElement(elem) {
    var domClone = elem.cloneNode(true);

    var $printSection = document.getElementById("printSection");

    if (!$printSection) {
        var $printSection = document.createElement("div");
        $printSection.id = "printSection";
        document.body.appendChild($printSection);
    }

    $printSection.innerHTML = "";
    $printSection.appendChild(domClone);
    window.print();
}

//calling map API and creating map
function createMap(){
	mapboxgl.accessToken = 'pk.eyJ1IjoiZWlsaWRoc3RyYWNoYW4iLCJhIjoiY2szZzJybXZ2MGFhZTNscDc1bXloejdvaiJ9.tA4RZImuVZVJHDL3-DkArA';
              var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v9',
                center: [-2.992301, 56.455945],
                zoom: 14
              });


              map.on('load', function() {
                map.addLayer({
                  "id": "points",
                  "type": "symbol",
                  "source": {
                    "type": "geojson",
                    "data": {
                      "type": "FeatureCollection",
                      "features": [{
                          "type": "Feature",
                          "geometry": {
                            "type": "Point",
                            "coordinates": [-2.992301, 56.455945]
                          },
                          "properties": {
                            "title": "Little Green Larder",
                            "icon": "grocery"
                          }
                        }
                      ]
                    }
                  },
                  "layout": {
                    "icon-image": "{icon}-15",
                    "text-field": "{title}",
                    "text-font": ["Roboto Regular"],
                    "text-offset": [0.6, 0.1],
                    "text-anchor": "left",
                  }
                });
              });
              map.addControl(new mapboxgl.NavigationControl());
}

createMap();
