$(document).ready(function() {
  setTimeout(function(){
    $('.highlight').not('.language-bash').each(function(test, test1) {
      var btn = document.createElement('button');
      btn.setAttribute('type', 'button');
      // for Firefox
      btn.setAttribute('onclick', 'selectElementContents(this.nextSibling);');
      // for IE
      btn.onclick = function() {selectElementContents(this.nextSibling)};
      btn.className = 'copy-button';
      btn.innerHTML = 'COPY'; 
      this.insertBefore(btn, this.firstChild);
   });
  }, 1000);
});

function selectElementContents(el) {
    if (window.getSelection && document.createRange) {
        // IE 9 and non-IE
        var range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (document.body.createTextRange) {
        // IE < 9
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.select();
    }
    document.execCommand("copy");
}
