marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

var gh = new GithubAPI("Pamblam");
gh.getGists(function(gists){
	$(".content").empty();
	$.each(gists, function(k, g){
		var $div = $("<div>");
		var desc = g.description;
		var date = new Date(g.updated_at);
		var url = g.html_url;
		var files = [];
		$(".content").append($div);
		var hasMD = false;
		for(var f in g.files){
			if(!g.files.hasOwnProperty(f)) continue;
			files.push(f);
			if(g.files[f].language && g.files[f].language.toLowerCase() == "markdown") hasMD = true;
		}
		$div.append("<h4><a href='"+url+"'>"+formatDate(date, "l F jS")+"</a></h4>");
		if(desc) $div.append("<p>"+desc+"</p>");
		$div.append("<ul><li>"+(files.join("</li><li>"))+"</li></ul>");
		if(hasMD){
			gh.getGist(g.id, function(gist){
				for(var file in gist.files){
					if(!gist.files.hasOwnProperty(file)) continue;
					if(gist.files[file].language && gist.files[file].language.toLowerCase() == "markdown"){
						$div.append('<div class="panel panel-default"><div class="panel-body">'+marked(gist.files[file].content)+'</div></div>');
					}
				}
			});
		}
	});
});


