
var gh = new GithubAPI("Pamblam");
gh.getBlogPosts("Pamblam.github.io", "posts", function(posts){
	var post, $ul = $("<ul style='list-style-type:none'>")
	$(".contents").empty().append('<h4>Recent Posts</h4>').append($ul);
	for(var i=0; post=posts[i]; i++){
		$($ul).append('<li><a class="loadPost" data-id="'+i+'"><b>'+post.title+'</b></a> <small><i>'+formatDate(post.date, 'm/d/y')+'</i></small></li>');
	}
	$(".loadPost").click(function(e){
		e.preventDefault();
		loadPost(posts[$(this).data('id')]);
		return false;
	});
	if(posts.length) loadPost(posts[0]);
});

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

function loadPost(post){
	$.ajax({
		url: post.raw_url
	}).done(function(resp){
		$(".posts").html("<small>"+post.title+" | "+formatDate(post.date, "l F jS")+"</small><br>"+marked(resp));
	});
}