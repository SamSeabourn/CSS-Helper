//////// Unicorn mode. needs On and Off only
const unicornMode = function(){
  var elements = $("p, h1, h2, h3, h4, h5, h6")
    for (let i = 0; i < elements.length; i++) {
      generateRainbowText(elements[i]);
    }

  function generateRainbowText(element) {
    var text = element.innerText;
    element.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
      let charElem = document.createElement("span");
      charElem.style.color = "hsl(" + (360 * i / text.length) + ",80%,50%)";
      charElem.innerHTML = text[i];
      element.appendChild(charElem);
    }
  }
  $('body').css("background-image","url('https://thumbs.gfycat.com/EmbarrassedLegitimateBullmastiff-size_restricted.gif')")
}


/////// Text Swapper = Needs.... existing_word, new_word, on/off
if ( slaveCSSObject.text_swapper ) {
  for ( let i = 0; i < para.length; i++ ) {
    para[i].innerText = para[i].innerText.replace( slaveCSSObject.text_existing, slaveCSSObject.text_new )
  }
}
