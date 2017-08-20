$(function(){
	
	var gh = new GithubAPI("Pamblam");
	gh.getRepos(function(repos){
		$(".content").empty();
		for(var i=0; i<repos.length; i++){

			if(repos[i].homepage) url = repos[i].homepage;
			
			var stars = (repos[i].stargazers_count>0?"<small> <i class='fa fa-star' aria-hidden='true'></i>&times;"+repos[i].stargazers_count+"</small>":"");
			var watchers = (repos[i].watchers>0?"<small> <i class='fa fa-eye' aria-hidden='true'></i>&times;"+repos[i].watchers+"</small>":"");
			
			$(".content").append("<h2><i class='fa fa-circle' aria-hidden='true'></i> "+repos[i].name+stars+watchers+"</h2>");
			$(".content").append("<small>"+(repos[i].language?"<code>"+repos[i].language+"</code> | ":"")+"<i>Last Update: "+formatDate(new Date(repos[i].updated_at), "m/d/y g:i a")+"</i></small>");
			if(repos[i].description) $(".content").append("<p>"+repos[i].description+"</p>");
			var $links = $("<div>");
			$links.append("<a href='"+repos[i].html_url+"' class='btn btn-default'><i class='fa fa-github' aria-hidden='true'></i> View on Github</a>");
			if(repos[i].homepage) url = $links.append("<a href='"+repos[i].homepage+"' class='btn btn-default'><i class='fa fa-home' aria-hidden='true'></i> View Homepage</a>");
			$(".content").append($links);
			$(".content").append("<hr>");
		}
	});
	
});

