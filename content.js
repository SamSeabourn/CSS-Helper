$( document ).ready( function(){

  console.log("running now brah");

    ////// Nick cage image swapper
    let placeCage = false;  //on or off

    /////// Bill Murray image swapper
    let fillMurray = false; //on or off

    /////// Paragraph Background color
    let paragraphBackground = true; // on or off
    let paragraphBackgroundColor = "blue"
    let paragraphTextColor = "red"

    ////// Custom Heading Messages
    let customHeadingOn = false; // on or off
    let customHeadingText = "Testing 1-2-3"

    ///// Makes the image freakout
    let imageFreaker = false;


    //URL of the API
    const url = "https://atm-rails-burning-airlines.herokuapp.com/airplanes.json"



    if (fillMurray) {
      let images = document.getElementsByTagName('img');
      for (let i = 0, l = images.length; i < l; i++) {
        images[i].src = 'http://fillmurray.com/' + images[i].width + '/' + images[i].height;
      }
    }

    if (placeCage) {
      let images = document.getElementsByTagName('img');
      for (let i = 0, l = images.length; i < l; i++) {
        images[i].src = 'http://placecage.com/' + images[i].width + '/' + images[i].height;
      }
    }

    if (customHeadingOn) {
      let paragraphs = document.getElementsByTagName('h1');
      for (let i = 0, l = paragraphs.length; i < l; i++) {
        paragraphs[i].innerText = "customHeadingOn"
      }
    }

    if (paragraphBackground) {
      let para = document.getElementsByTagName('p');
      for (let i = 0, l = para.length; i < l; i++) {
      para[i].style.backgroundColor = paragraphBackgroundColor
      para[i].style.color = paragraphTextColor
      }
    }

    //     javascript: repeatCount = 0;
    // x1 = .1;
    // y1 = .05;
    // x2 = .25;
    // y2 = .24;
    // x3 = 1.6;
    // y3 = .24;
    // x4 = 300;
    // y4 = 200;
    // x5 = 300;
    // y5 = 200;
    //
    // images = document.getElementsByTagName( "img" );
    // imagesLength = images.length;
    //
    //   function imageFreak() {
    //       for ( i = 0; i - imagesLength; i++ ) {
    //           imagesShift = images[ i ].style;
    //           imagesShift.position = 'absolute';
    //           imagesShift.left = ( Math.sin( repeatCount * x1 + i * x2 + x3 ) * x4 + x5 ) + "px";
    //           imagesShift.top = ( Math.cos( repeatCount * y1 + i * y2 + y3 ) * y4 + y5 ) + "px"
    //       }
    //       repeatCount++
    //   }
    //   setInterval( 'imageFreak()', 5 );
    //   void( 0 );

});



// document.getElementsByTagName("p")[2].style.backgroundColor = "red"
