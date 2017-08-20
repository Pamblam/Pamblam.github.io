
var gh = new GithubAPI("Pamblam");
gh.getBlogPosts(function(posts){
	console.log(posts);
});