
var gh = new GithubAPI("Pamblam");
gh.getBlogPosts("Pamblam.github.io", "posts", function(posts){
	console.log(posts);
});