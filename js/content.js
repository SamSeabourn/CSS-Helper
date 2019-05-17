////////////////////////////////////////////////////////////////////////////////
// This script inherently only loads after a website has finished loading, much like $(document).ready(){} from jQuery.
// This script can affect the DOM however variables etc are in their own cloud, we cannot call them directly from a page's console.
// This we need to setup a loop that will check the values once we've "messaged" them from "background.js" (in turn, after getting them from our API).

console.log( "content.js running..." );
// on page load it'll set all the prank 'features' off.
let slaveCSSObject = {};
let marqueeCount = 0;
let playVideoCount = 0;


// setup a message listener, which will recognise and accept a message from "background.js" script.
chrome.runtime.onMessage.addListener( function( objectFromBackground ) {
	slaveCSSObject = objectFromBackground;
	console.log( 'background.js delivered:' );
	console.log( objectFromBackground );
	console.log( 'content.js update to:' );
	console.log( slaveCSSObject );
} );

// set off a recursive self call function chain on page load, after 1000ms.
let recursionKickoff = setTimeout( checkVariablesAndPrank, 5000 );

// if the updated values received from "background.js" affect the slaveCSSObject and "turn on" the prank.
// Then this function will affect the users' DOM.
function checkVariablesAndPrank() {
	console.log( "prnkstr applying now..." );

	if ( slaveCSSObject.fill_murray ) {
		let images = document.getElementsByTagName( 'img' );
		for ( let i = 0; i < images.length; i += 1 ) {
			let image = images[ i ];
			if ( image.height !== 0 && image.width !== 0 && image.src.substring( 8, 22 ) !== "fillmurray.com" ) {
				// console.log( "already filled Murray..." );
				image.src = 'https://fillmurray.com/' + image.width + '/' + image.height;
			}
		}
	}

	if ( slaveCSSObject.place_cage ) {
		let images = document.getElementsByTagName( 'img' );
		for ( let i = 0; i < images.length; i += 1 ) {
			let image = images[ i ];
			if ( image.height !== 0 && image.width !== 0 && image.src.substring( 8, 21 ) !== "placecage.com" ) {
				// console.log( 'already placed cage' );
				image.src = 'https://placecage.com/c/' + image.width + '/' + image.height;
			}
		};
	};

	if ( slaveCSSObject.custom_header ) {
		$( 'h1' ).html( `${ slaveCSSObject.custom_header_text }` );
	}

	if ( slaveCSSObject.paragraph_background !== "" ) {
		let para = document.getElementsByTagName( 'p' );
		for ( let i = 0, l = para.length; i < l; i += 1 ) {
			para[ i ].style.backgroundColor = slaveCSSObject.paragraph_background;
		}
	}

	if ( slaveCSSObject.paragraph_color !== "" ) {
		let para = document.getElementsByTagName( 'p' );
		for ( let i = 0, l = para.length; i < l; i += 1 ) {
			para[ i ].style.color = slaveCSSObject.paragraph_background;
		}
	}

	if ( slaveCSSObject.snap ) {
		$( 'body' ).removeAttr( 'style' ).html( '<img src="https://image.ibb.co/byWcEv/rtaImage.jpg">' ).css( 'text-align', 'center' ).css( 'margin', '125px' ).css( 'background-color', 'rgb(250, 250, 250)' );
	}

	if ( slaveCSSObject.stranger_things ) {
		$( 'img' ).stop().animate( {
			rotation: 180
		}, {
			duration: 1000,
			step: function( now, fx ) {
				$( this ).css( {
					"transform": "rotate(" + now + "deg)"
				} );
			}
		} );
	}

	if ( slaveCSSObject.page_flip ) {
		$( "body" ).css( {
			"-webkit-transform": "rotate(180deg)",
			"-moz-transform": "rotate(180deg)",
			"transform": "rotate(180deg)"
		} );
	}

	if ( slaveCSSObject.otherside ) {
		$( "body" ).css( {
			"-moz-transform": "scaleX(-1)",
			"-o-transform": "scaleX(-1)",
			"-webkit-transform": "scaleX(-1)",
			"transform": "scaleX( -1 )",
			"filter": "FlipH"
		} );
	}

	if ( slaveCSSObject.marquee && marqueeCount < 1 ) {
		$( `${slaveCSSObject.marquee_element}` ).wrap( `<marquee scrollamount="${ slaveCSSObject.marquee_speed }">` );
		marqueeCount += 1
	}

	if ( slaveCSSObject.unicorn_mode ) {
		let images = document.getElementsByTagName( 'img' )
		for ( let i = 0; i < images.length; i += 1 ) {
			let image = images[ i ];
			image.src = 'http://bestanimations.com/Animals/Mammals/Horses/unicorn/animated-unicorn-gif.gif';
		}

		$( 'body' ).css( "background-image", "url('https://thumbs.gfycat.com/EmbarrassedLegitimateBullmastiff-size_restricted.gif')" )

		function getRandomColor() {
			var letters = '0123456789ABCDEF';
			var color = '#';
			for ( var i = 0; i < 6; i += 1 ) {
				color += letters[ Math.floor( Math.random() * 16 ) ];
			}
			return color;
		}

		var arr = $( 'div' )
		var index = 0;
		setInterval( function() {
			$( 'div' ).css( 'background-color', getRandomColor() );
			console.log( arr[ index++ % arr.length ] );
		}, 800 )

		var elements = $( "p, h1, h2, h3, h4, h5, h6" )
		for ( let i = 0; i < elements.length; i += 1 ) {
			generateRainbowText( elements[ i ] );
		}

		function generateRainbowText( element ) {
			var text = element.innerText;
			element.innerHTML = "";
			for ( let i = 0; i < text.length; i += 1 ) {
				let charElem = document.createElement( "span" );
				charElem.style.color = "hsl(" + ( 360 * i / text.length ) + ",80%,50%)";
				charElem.innerHTML = text[ i ];
				element.appendChild( charElem );
			}
		}
	}

	if ( slaveCSSObject.word_swapper ) {
		let para = $('p')
		for ( let i = 0; i < para.length; i++ ) {
			para[ i ].innerText = para[ i ].innerText.replace( slaveCSSObject.existing_word, slaveCSSObject.new_word )
		}
	}

	if ( slaveCSSObject.hidden_video && playVideoCount < 1 ) {
		$( slaveCSSObject.hidden_video_element ).last().html( `<iframe src="https://www.youtube.com/embed/${ slaveCSSObject.hidden_video_url }?autoplay=1" allow="autoplay"></iframe>` ).css( 'opacity', '0' )
		playVideoCount += 1;
	}

	setTimeout( checkVariablesAndPrank, 2000 );

	// cancel initial timeout, allowing the recursive call to be forever calling itself.
	clearTimeout( recursionKickoff );
};
