//////// Unicorn mode. needs On and Off only
const unicornMode = function(){

	let images = document.getElementsByTagName( 'img' )
		for ( let i = 0; i < images.length; i += 1 ) {
		let image = images[ i ];
		image.src = 'http://bestanimations.com/Animals/Mammals/Horses/unicorn/animated-unicorn-gif.gif';
	}

	$('body').css("background-image","url('https://thumbs.gfycat.com/EmbarrassedLegitimateBullmastiff-size_restricted.gif')")

	function getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i += 1 ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	var arr = $('div')
	var index = 0;
	setInterval(function(){
			$('div').css('background-color', getRandomColor() );
			console.log(arr[index++ % arr.length]);
	}, 800)

	var elements = $("p, h1, h2, h3, h4, h5, h6")
		for ( let i = 0; i < elements.length; i += 1 ) {
			generateRainbowText(elements[i]);
		}

	function generateRainbowText(element) {
		var text = element.innerText;
		element.innerHTML = "";
		for ( let i = 0; i < text.length; i += 1 ) {
			let charElem = document.createElement("span");
			charElem.style.color = "hsl(" + (360 * i / text.length) + ",80%,50%)";
			charElem.innerHTML = text[i];
			element.appendChild(charElem);
		}
	}
}


/////// Text Swapper = Needs.... existing_word, new_word, on/off
if ( slaveCSSObject.text_swapper ) {
	for ( let i = 0; i < para.length; i += 1	) {
		para[i].innerText = para[i].innerText.replace( slaveCSSObject.text_existing, slaveCSSObject.text_new )
	}
}
