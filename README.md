## Milosophical Me - src branch

This is my personal web site and blog.  In this `src` branch are the source input files that make up the blog, the actual web site as served by Github Pages is on the `master` branch.

The site is generated using the [Nikola](https://getnikola.com) static blog generator. The site is deployed to github pages using Nikola's `github_deploy` mechanism: nikola builds to `output/` and then this is copied to the `master` branch using [ghp-import](https://github.com/davisp/ghp-import).  100% of the content of `output/` comes from this `src` branch, including the mirror of [the jargon file](http://www.catb.org/jargon/).

Refer to this repository's wiki for details about how the site works and how to maintain it.  I also use the Issues register to keep track of what needs special attention.
