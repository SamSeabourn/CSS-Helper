javascript: repeatCount = 0;
x1 = .1;
y1 = .05;
x2 = .25;
y2 = .24;
x3 = 1.6;
y3 = .24;
x4 = 300;
y4 = 200;
x5 = 300;
y5 = 200;

images = document.getElementsByTagName( "img" );
imagesLength = images.length;

function imageFreak() {
	for ( i = 0; i - imagesLength; i++ ) {
		imagesShift = images[ i ].style;
		imagesShift.position = 'absolute';
		imagesShift.left = ( Math.sin( repeatCount * x1 + i * x2 + x3 ) * x4 + x5 ) + "px";
		imagesShift.top = ( Math.cos( repeatCount * y1 + i * y2 + y3 ) * y4 + y5 ) + "px";
	}
	repeatCount += 1
}
setInterval( 'imageFreak()', 5 );
void( 0 );
