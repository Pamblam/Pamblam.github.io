var GithubAPI = (function(){
	
	function GithubAPI(username){
		this.user = username;
		this.userData = false;
		this.repoData = false;
	}
	
	GithubAPI.prototype.getBlogPosts = function(repo, path, callback){
		var posts = {};
		var self = this, file, c;
		api("/repos/"+self.user+"/"+repo+"/commits", function(commits){
			var pend = 0;
			for(var i=0; c=commits[i]; i++) (function(commit){
				pend++;
				api("/repos/"+self.user+"/"+repo+"/commits/"+commit.sha, function(c){
					var date = new Date(c.commit.committer.date);
					for(var n=0; file = c.files[n]; n++){
						if(("/"+file.filename).indexOf(path)===-1) continue;
						var pieces = file.filename.split(".");
						if(pieces.pop() !== "md") continue;
						var title = pieces.join('').split("/").pop();
						if(!posts.hasOwnProperty(title) || posts[title].date.getTime() < date.getTime()){
							posts[title] = {
								date: date,
								title: title,
								raw_url: file.raw_url
							};
						}
					}
					if(!--pend){
						var ret = [];
						for(var n in posts)
							if(posts.hasOwnProperty(n)) 
								ret.push(posts[n]);
						ret.sort(function(a, b){
							return a.date.getTime() - b.date.getTime();
						});
						callback(ret);
					}
				});
			})(c);
		});
	};
	
	GithubAPI.prototype.getRepos = function(callback){
		if(this.repoData !== false) return callback(this.repoData);
		api("/users/"+this.user+"/repos", callback);
	};
	
	GithubAPI.prototype.getUser = function(callback){
		if(this.userData !== false) return callback(this.userData);
		api("/users/"+this.user, callback);
	};
	
	function api(endpoint, callback){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				callback(JSON.parse(this.responseText));
			}
		};
		xhttp.open("GET", "https://api.github.com"+endpoint, true);
		xhttp.send();
	}
	
	return GithubAPI;
	
})();

	