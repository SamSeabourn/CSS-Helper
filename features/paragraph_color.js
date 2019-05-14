if ( slaveCSSObject.paragraphBackground ) {
	let para = document.getElementsByTagName('p');
	for (let i = 0, l = para.length; i < l; i += 1) {
		para[i].style.backgroundColor = paragraphBackgroundColor;
		para[i].style.color = paragraphTextColor;
	}
}
