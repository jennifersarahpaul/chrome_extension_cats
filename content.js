// TO-DO
// - fix picture stretch sizes
// - fix it so ALL pictures change (AJAX?)
// - have more cat pictures (in the folder or a link?)
// - have the threshold (%) increase over the course of the day

var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i += 3) {
  var element = elements[i];

  for (var j = 0; j < element.childNodes.length; j += 3) {
    var node = element.childNodes[j];

    if (node.nodeType === 3) {
      var text = node.nodeValue;
      var replacedText = text.replace(/\w\s/gi, ' Cats ');

      if (replacedText !== text) {
        element.replaceChild(document.createTextNode(replacedText), node);
      }
    }
  }
}

var THRESHOLD = 1, // percentage of images that change
  CAT_IMG_URL = chrome.extension.getURL('cat_in_space.png'),
  ORIG_WIDTH = 400,
  ORIG_HEIGHT = 400, 
  HEIGHT_RATIO = 1
  WIDTH_RATIO = 1
 
var cat = {
  generate: function(src) {
    var width, height, src_img = {
      zIndex: $(src).css('z-index'),
      width:  $(src).width(),
      height: $(src).height()
    }

    src_img.right = $(src).offset().left + src_img.width
    src_img.bottom = $(src).offset().top + src_img.height
    console.log(src_img)

    // Cat dimensions
    height = src_img.height
    width = src_img.width

    // Calculate cat dimensions
    // if (src_img.height <= src_img.width) {
      // height = HEIGHT_RATIO * src_img.height
      // width = ORIG_WIDTH * height / ORIG_HEIGHT
    // } else {
      // width = WIDTH_RATIO * src_img.width
      // height = ORIG_HEIGHT * width / ORIG_WIDTH
      // }

    var img = document.createElement('img')
    img.width = width
    img.height = height
    img.src = CAT_IMG_URL
    img.style.position = 'absolute'
    img.style.left = (src_img.right - width) + 'px'
    img.style.top = (src_img.bottom - height) + 'px'
    img.style['z-index'] = 1 + (src_img.zIndex !== 'auto' ? src_img.zIndex : 0)
    return img;
  },

  add: function(src_img, parent) {
    var img = this.generate(src_img)
    $(img).click(function(e) {
      e.preventDefault()
      $(this).hide(250)
    })
    parent = parent || document.body
    parent.appendChild(img)
  }
}
 
$(document).ready(function($) {
  console.log('Overlaying Space Cat...:')
  $('img:visible').each(function() {
    // if (Math.random() <= THRESHOLD && $(this) != undefined && $(this)
    //   .attr('src') != undefined && $(this)
    //   .attr('src') != CAT_IMG_URL && $(this)
    //   .height() >= 50) {
        console.log($(this).attr('src'))
        cat.add(this)
      // }
  })
})
