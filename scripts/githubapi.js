var GithubAPI = (function(){
	
	function GithubAPI(username){
		this.user = username;
		this.userData = false;
		this.repoData = false;
	}
	
	GithubAPI.prototype.getBlogPosts = function(repo, path){
		var posts = [];
		
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

	