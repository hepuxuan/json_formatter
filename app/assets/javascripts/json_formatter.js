$(document).ready(function(){
  var clip = new ZeroClipboard($("#copy")),
    json_string = '';
  $('#explore_json').hide();
  $('#format').on('click', function(e) {
    e.preventDefault();
    try{
      var json = JSON.parse($('#json').val());
      json_string = JSON.stringify(json, null, parseInt($('#indent').val()));
      json_explore = JsonFomatter.parseJson(JSON.parse($('#json').val()), parseInt($('#indent').val()));
      $('#format_json').html(json_string);
      $('#format_json').show();
      $('#explore_json').html(json_explore);
      $('#explore_json').hide();
      JsonFomatter.addToggleBtn();
    } catch(e) {
      $("<div class='alert alert-danger'> <a class='close' data-dismiss='alert'>×</a> <div id='flash_error'>"+e+"</div> </div>").insertBefore('.container')
    }
  })
  $('#explore_btn').on('click', function (e) {
    e.preventDefault();
    $('#format_json').hide();
    $('#explore_json').show();
  })
  $('#pretty_btn').on('click', function (e) {
    e.preventDefault();
    $('#format_json').show();
    $('#explore_json').hide();
  })
  
});
JsonFomatter = {
  addToggleBtn : function (objClassName, arrayClassName) {
    objClassName = objClassName || 'json_obj';
    arrayClassName = arrayClassName || 'json_array'
    var toggleBtn = "<a class='toggleBtn'>[-]</a>";
    $(toggleBtn).insertBefore('.' + objClassName);
    $(toggleBtn).insertBefore('.' + arrayClassName);
    $('.toggleBtn').on('click', function () {
      var $this = $(this);
      if ($this.text() === '[+]') {
        $this.text('[-]');
        $this.next().show();
      } else {
        $this.text('[+]');
        $this.next().hide();
      }   
    });
  },
  parseJson : function (json, indent_num) {
    return parseJsonRec(json, '', indent_num);
  }
}

function parseJsonRec (json, indent, indent_num) {
  var curIndent = []
  for(var i = 0; i < indent_num; i++) {
    curIndent.push("&nbsp;")
  }
  curIndent = indent + curIndent.join("");
  if(typeof json == "string") {
    return "<span class=json_string>&nbsp;" + json + "&nbsp;<br></span>";
  } else if(typeof json == "number") {
    return "<span class=json_number>&nbsp;" + String(json) + "&nbsp;<br></span>";
  } else if(typeof json == "boolean") {
    return "<span class=json_boolean>&nbsp;" + String(json) + "&nbsp;<br></span>";
  } else if (json instanceof Array) {
    var json_html = ["[<span class=json_array>"];
    for (var number in json) {
      if(json.hasOwnProperty(number)) {
        json_html.push(parseJsonRec(json[number], curIndent, indent_num));
      }
    }
    json_html.push(indent);
    json_html.push("</span>]");
    json_html.push("<br>");
    return json_html.join("");
  } else {
    var json_html = ["<br>", indent, "{<span class=json_obj><br>"];
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
    json_html.push("</span>}")
    json_html.push("<br>")
    return json_html.join("");
  }
}
