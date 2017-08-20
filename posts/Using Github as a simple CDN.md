
## Using Github Pages to build a simple, home-rolled CMS

I decided to read up on how to do GitHub Pages this afternoon so I could make a page for [a cool library](https://pamblam.github.io/zipTime.js/) I just completed. For some reason I had always been under the impression that this was a paid feature and had never bother looking into it further until today, so I am a total noob to GH pages and in fact, all static web site generators including Jekyll. That said, I'm sure Jekyll is super, I just honestly didn't feel like downloading a new tool and learning a new workflow just to build something as lame as a *static website*. (Apparently, [I'm not the only one who feels this way](https://www.youtube.com/watch?v=u22CLlw4_hg).)

### Making Github Dynamic

Truth is, nothing about Github is static. Github has an open API and allows free unlimited hosting. It's not a matter of static verus dynamic, it's simply a matter of client side programming versus server side programming. For a CMS, there is no explicit requirement that the logic be placed on the server.

As proof of concept, you can [download the source](https://github.com/Pamblam/Pamblam.github.io/releases/tag/1) for my Github pages blog which I write for this purpose and probably won't touch again for months. The idea is to use Javascript to access the Github APIs to serve content from the server as required dynamically. Unfortunately, it's not as straghtforward as it sounds.

#### Gathering Data

You'll start by having a repo with a path designated for storing content in markdown or html files. For example:

    User/Repo/posts

If you call the endpoint to list the content files in the repo, Github will not include the date of the last update, so you would have to resort to putting headers in your files and parsing them and at that point you  might as well use Jekyll. The only way to get the file date info is to collect the files from the `commits` endpoint. First, call this endpoint to get a list of all commits:

    /repos/{User}/{Repo}/commits
    
This will provide a list of commits, each has an `sha` property, which you can plug into another endpoint to get file details:
    
    /repos/{User}/{Repo}/commits/{Sha}
    
Thecommit date for all files in this commit will be displayed in the `commit.committer.date` object. The response contains an object called `files` which is an array of files information. You can even trim the extention off the filename to get a working title for the post. The only thing we need now is a url we can request content from.

The raw URL given in the endpoint won't allow cross origin requests, so it's useless to Javascript, but we can extract the `ref` attribute from each file' `contents_url` and use it to create the raw URL like this:

    https://raw.githubusercontent.com/{User}/{Repo}/{ref}/{file.filename}
    
This URL can be AJAX'd with no issues to get the required content. If you files are moarkdown you can use one of many markdown converters to convert the contents to HTML or you can just store them in HTML from the start.

#### Don't add removed files

Make sure you're not displaying duplicate or removed files when looping through your commits. Since you can't count on the order of the items in the arrays, you'll have to compare the dates and file status to see if a file should be displayed. Still confused? [Here's the source](https://github.com/Pamblam/Pamblam.github.io/blob/25492f085974c810e2a513e501a73c5850019e6e/scripts/githubapi.js#L9) for the function I used to pull content from Github.

### Pro-tip

There's no reason you couldn't use the Github API to make authenticated front-end interface to create blog posts and commit them too. I may work on adding that in a future version.
