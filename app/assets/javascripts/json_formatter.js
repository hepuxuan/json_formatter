$(document).ready(function(){
  var clip = new ZeroClipboard($("#copy")),
    json_string = '',
    indent_num = parseInt($('#indent').val());
  $('#format').on('click', function(e) {
    e.preventDefault();
    try{
      var json = JSON.parse($('#json').val());
      json_string = JSON.stringify(json, null, indent_num);
      $('#format_json').text(json_string);
    } catch(e) {
      $("<div class='alert alert-danger'> <a class='close' data-dismiss='alert'>×</a> <div id='flash_error'>"+e+"</div> </div>").insertBefore('.container')
    }
  })
  $('#explore_btn').on('click', function (e) {
    e.preventDefault();
    $('#format_json').html(parseJson(JSON.parse($('#json').val()), indent_num))
  })
  $('#pretty_btn').on('click', function (e) {
    e.preventDefault();
    $('#format_json').html(json_string)
  })
  
});

function parseJson(json, indent_num) {
  return parseJsonRec(json, '', indent_num);
}

function parseJsonRec(json, indent, indent_num) {
  var curIndent = indent + getIndent(indent_num);
  if(typeof json == "string") {
    return "<span class=json_string>&nbsp;" + json + "&nbsp;<br></span>";
  } else if(typeof json == "number") {
    return "<span class=json_number>&nbsp;" + String(json) + "&nbsp;<br></span>";
  } else if(typeof json == "boolean") {
    return "<span class=json_boolean>&nbsp;" + String(json) + "&nbsp;<br></span>";
  } else if (json instanceof Array) {
    var json_html = ["[<br>"];
    for (var number in json) {
      if(json.hasOwnProperty(number)) {
        json_html.push(parseJsonRec(json[number], curIndent, indent_num));
      }
    }
    json_html.push(indent);
    json_html.push("]");
    json_html.push("<br>");
    return json_html.join("");
  } 
  var json_html = ["<br>", indent, "{<br>"];
  for (var key in json) {
    if (json.hasOwnProperty(key)) {
    json_html.push("<span class=json_name>")
      json_html.push(curIndent);
      json_html.push(String(key));
      json_html.push("&nbsp;:");
      json_html.push(parseJsonRec(json[key], curIndent, indent_num));
      json_html.push("</span>")
    }
  }
  json_html.push(indent)
  json_html.push("}")
  json_html.push("<br>")
  return json_html.join("");
}

function getIndent(number) {
  var indent = []
  for(var i = 0; i < number; i++) {
    indent.push("&nbsp;")
  }
  return indent.join(" ");
}