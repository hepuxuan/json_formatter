$(document).ready(function(){
  var clip = new ZeroClipboard($("#copy"));
  $('#format').on('click', function(e) {
   	e.preventDefault();
   	try{
      var json = JSON.parse($('#json').val());
      $('#format_json').text(JSON.stringify(json, null, 2));
 	  } catch(e) {
 	  	$("<div class='alert alert-danger'> <a class='close' data-dismiss='alert'>×</a> <div id='flash_error'>"+e+"</div> </div>").insertBefore('.container')
 	  }
  })
});


