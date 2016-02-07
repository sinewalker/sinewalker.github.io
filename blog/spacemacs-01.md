<!-- 
.. title: One Spacemacs Config to Rule Them All
.. slug: spacemacs-01
.. date: 2016-02-07 21:42:24 UTC+11:00
.. tags: emacs, configuration, spacemacs, elisp
.. category: hacking
.. link: 
.. description: In which I expand my dotspacemacs across platforms
.. type: text
-->

It's been a month since I started using [Spacemacs](http://spacemacs.orgd) for my Emacs configuration, and adopted it as my main editor. What's been happening?

Well, mostly not a lot, which is exactly why I wanted to use it. Oh, sure, [my commit history](https://github.com/sinewalker/dotspacemacs/commits/master) shows I've been fairly busy making small adjustments, but they are just tweaks here and there, nothing to blog about.

But, I did sit down this weekend and hack at it so that I can install *the same dotspacemacs settings everywhere*, which *is* worth a blog entry.

<!-- TEASER_END -->
----

A goal I have been trying to keep in my Emacs configuration adventures is to only have *one* set of configurations to carry around, no matter if I am running Emacs on Windows NT, as I originally did at my old job, or Linux, or even a Macintosh, as I'm likely to do late this year.

But while I want to keep my settings the same as much as possible across different operating systems and hosts, some things *must* be done differently, some options for Work don't apply at Home, and some tricks that you do to make Emacs play nice in Windows aren't needed on Linux.

Probably the main reason that my old Emacs configuration was so convoluted and difficult to maintain is that I never really had a clean design that lent itself to modular configuration. Spacemacs' Layers neatly solves this dillema by letting me compartmentalise my settings.

All I needed to do was write some very simple code to only load the Layers I need depending on which operating system, or sometimes which host, is running Spacemacs.  Emacs Lisp's `system-type` variable resolves to a symbol that tells you the operating system, and `system-name` gives the current host name string.

Separate Layers lists
====

Here's what I am doing: *separate lists for separate groups of features*. This all takes place in the `dotspacemacs/layers` function in my `init.el`, which purpose is for setting Spacemacs' Layers variables.

First, I've got a "master list" which lists all the Spacemacs Layers that I want to load, no matter which system is running:

```emacs-lisp
...
   mjl-layers
   '(
...
     (auto-completion :variables
                      auto-completion-private-snippets-directory "~/.spacemacs.d/snippets/")
     better-defaults
     emacs-lisp
     git
     markdown
     org
     (shell :variables
            ;;shell-default-height 24
            shell-default-position 'top)
     spell-checking
     syntax-checking
...
```

You can see this is just like `dotspacemacs-configuration-layers` from my [earlier post](spacemacs-00.html). Indeed it will become that list at the end.

Next, I have a list for each operating system and some "special" hosts for Work:

```emacs-lisp
  (setq
   ;; Layers to be loaded on Microsoft Windows
   mjl-windows-layers
   '(
     (mjl :variables
          mjl-bind-osx-keys t
          mjl-bind-unix-keys nil) ; don't work in Windows
     )
   ;; Layers to be loaded on Macintosh
   mjl-darwin-layers
   '(
     osx
     (mjl :variables
          mjl-bind-osx-keys nil ; bound by osx layer
          mjl-bind-unix-keys nil) ; don't exist on a Mac
     (clojure :variables
              clojure-enable-fancify-symbols t)
     )
   ;; Layers to be loaded on GNU/Linux
   mjl-gnu/linux-layers
   '(
     (mjl :variables
          mjl-bind-osx-keys t
          mjl-bind-unix-keys t)
     (clojure :variables
              clojure-enable-fancify-symbols t)
     )
   ;; Layers to be loaded on Work computers
   mjl-work-layers
   '(
     (squiz :variables
            squiz-wiid-script "~/Squiz/git/whyisitdown/whyisitdown")
     (mu4e  :variables
            mu4e-installation-path "/usr/local/share/emacs/site-lisp/mu4e")
     )
   ;; A list of system-names I use at work
   ;; Whenever I install spacemacs to a new system, add it's `system-name'
   mjl-work-systems
    '("milo.local")
   )
```

You can see this gives me the opportunity to add layers only in certain circumstances (`squiz` and `mu4e`), or to configure the same layer differently for different places (my own `mjl` layer, for instance).

Glueing lists together
====

So, now I have separate layers lists:

 1. `mjl-layers` (main list, most layers go here)
 1. `mjl-windows-layers` (for MS Windows)
 1. `mjl-darwin-layers` (for Macintosh)
 1. `mjl-gnu/linux-layers` (for Linux)
 1. `mjl-work-layers` (Work specific)
 
Also I have a list of Work hosts, though it's only got one member.

But Spacemacs needs all these to be in a single list `dotspacemacs-configuration-layers`. This is the fun, elegant part: just append the lists!

```emacs-lisp
  (cond ((eq system-type 'windows-nt)
         (setq mjl-layers (append mjl-layers mjl-windows-layers)))
        ((eq system-type 'darwin)
         (setq mjl-layers (append mjl-layers mjl-darwin-layers)))
        ((eq system-type 'gnu/linux)
         (setq mjl-layers (append mjl-layers mjl-gnu/linux-layers))))
  (when (member system-name mjl-work-systems)
    (setq mjl-layers (append mjl-layers mjl-work-layers)))
```

Couldn't be easier (well, maybe... see my Footnote). Also now you can see the reasoning behind my weird list names, especially `mjl-gnu/linux-layers`: it's to match the names with the symbols emacs defines for different operating systems. I'm not pedantic about the GNU/Linux distinction, but GNU Emacs is, naturally.

Carry on
====

All that remains is to assign my list values to the spacemacs variable:

```emacs-lisp
  (setq-default
   ;; List of configuration layers to load. If it is the symbol `all' instead
   ;; of a list then all discovered layers will be installed.
   ;; ----------------------------------------------------------------
   ;; I'm just setting this to the `mjl-layers' list appended above
   ;; ----------------------------------------------------------------
   dotspacemacs-configuration-layers mjl-layers
...
```

And away we go. Now the layers list is customised automatically depending on the current system.

mjl-org Layer
----

Speaking of carrying on, there's more to do with my setup. The most pressing is to configure Org Mode to match my work-flow (and/or tweak my work-flow to work with Org, there's give-and-take there). Particularly around

 * Capture templates for Tasks, Tickets, Journal, Notes, and work's Moin-moin wiki
 * Integration with Google Calendar and Google Tasks
 * Org Agenda views
 * MobileOrg to sync Tasks and Events to/from my communicator
 * (nice to have) [calfw](https://github.com/kiwanami/emacs-calfw) to view Org calendar events (and indirectly, gcal ones)
 
This is complex enough to warrant a new layer, over top of the built-in `org` layer. Indeed, I'll need to install Emacs packages for some of this, so a layer is definitely the go here. I've written two already, but neither is actually installing and configuring packages with `use-package`. This will really be a test for how I find hacking Spacemacs configurations, and logically it should be my next focus for Spacemacs.

I don't expect this layer to be something that'll be useful in the mainline Spacemacs, so it'll be another "private" layer (though shared on my github project).

dired-plus Layer
----

Another project on my todo list is a Layer that installs and configures all the bells and whistles for [dired-plus](http://www.emacswiki.org/emacs-test/DiredPlus) and [friends](http://www.emacswiki.org/emacs-test/OneOnOneEmacs).  That one *would* be valuable to others, and if I do it, it'll be my first submission to the Spacemacs project.

Definitely there's much to explore and write about Spacemacs in future months!

----

**Footnote**

It *could* be even more simple/elegant, I'm sure. The repetitive code in that `cond` and the similarity between the symbol names makes me think this is ripe for applying some kind of meta-programming. I'm just not that skillful at it. If you can see how to do it, let me know!

