<!--
.. title: Learning DVCS Workflow - 1
.. slug: git-checkout-ftw
.. date: 2018-03-27 22:16:00 UTC+11:00
.. tags: git, magit, tip, merging
.. category: 
.. link: 
.. description: 
.. type: text
-->

Tonight I learned a basic git trick that was not immediately obvious to me, but should have been, I guess.

I've been switching [my Spacemacs](https://github.com/sinewalker/dotspacemacs/tree/develop) back to the [master branch](https://github.com/sinewalker/dotspacemacs/) to try trouble-shoot a performance issue I'm having on the Macintosh where it just hangs occasionally.  My master is tracking to Spacemacs master which is still at 0.200.13.  I haven't touched it in over a year, and there are some things that I wanted from my `develop` branch.

I want to merge in the latest version of those few files, but not *everything* on the branch, so a *merge* is not the right operation.

<!-- TEASER_END -->
----

Turns out you can use `git checkout` to do this very easily. The "trick" was: you can specify a *path* as well as a branch to check out (derp, I knew that).  Magit doesn't (so far as I can find) let you check out just one or a few files, so you have to do it from the command line:

```
git checkout <branch> [<path>...]
```

Here's an example I did tonight. To get my latest EShell aliases from my Spacemacs `develop` branch, and merge them into `master`, I just did this:

```
$ git checkout master
$ git checkout develop config/eshell/alias
$ git add .
$ git commit -m "merged latest eshell aliases from develop branch"
```

It also can be used the other way.  I [fixed a bug](https://github.com/sinewalker/dotspacemacs/commit/979d01a9fd5347b4e691102ee422aece11b308f1) on my SUSE laptop where Spacemacs would not start up cleanly. I had a syntax error in my `layers/mjl/keybindings.el` on a condition that only gets executed outside of a machine running `darwin` -- clearly I introduced it last year on my Mac and never found out until I tried to use this on a SUSE machine!

Anyway that fix commit is on my `master` branch.  Back to going the other way.  One other thing that I wanted from my `develop` branch is my latest keybindings. When I merge my latest keybindings from `develop` to `master` it doesn't have the fix.

I used a combination of git command-line and Magit's cool selective hunk stage/unstage feature (it's like "interactive" mode in the git command line, but not horrible) to get it done very smoothly:

 1. From the command line, on the master branch:  `git checkout develop layers/mjl/keybindings.el`
 1. In Magit, stage the changes, then un-stage the hunk that has the syntax error
 1. In Magit, commit the staged changes on master
 1. Switch to the `develop` branch (Magit:  `b b` -> develop)
 1. On the command line, in develop branche: `git checkout master layers/mjl/keybindings.el`
 1. Back in Magit, stage the single hunk with the fix for the syntax error
 1. Commit the change
 1. Push everything up to origin
 1. Switch back to master branch
 
It's such a simple thing but very handy, I had to blog it while it's fresh in my mind.
