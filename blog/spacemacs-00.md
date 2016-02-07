<!-- 
.. title: Spacemacs for 2016
.. slug: spacemacs-00
.. date: 2016-01-06 12:48:46 UTC+11:00
.. tags: emacs, configuration, spacemacs, keyboards, email, elisp
.. category: hacking
.. link: 
.. description: In which I explore Spacemacs and adopt it
.. type: text
-->

I've been an [Emacs](https://www.gnu.org/software/emacs/) user for more than 15 years and I've been keeping my emacs configuration ever since February 2000 (when it was just a simple `~/.emacsrc`) until it evolved over time to something quite complex and hairy. Since the past couple of years it's developed a will of its own, to the point now that I cannot easily maintain it: if I make a change to something, three other things will unexpectedly break.

I tried last year to overhaul my `~/.emacs.d` structure and I had some success, but it's still an awful mess.

So, in December 2015 I declared **Emacs Configuration Bankruptcy**.

<!-- TEASER_END -->
----

I was casting about for ideas about what to do.  I see a few people doing Literate programming for their emacs configs, using [Org-mode](http://orgmode.org/worg/org-contrib/babel/intro.html) (a really good examlpe is [Sacha Chua's emacs config](http://pages.sachachua.com/.emacs.d/Sacha.html)), but I don't really like this: org-mode is a moving target, it's something else I'd have to manage and update, and I'd hate a change to break my whole emacs config. It's bad enough when it breaks just the org parts...

I recently discovered [use-package](https://github.com/jwiegley/use-package), which offers a way to replace my own [ELPA](http://www.emacswiki.org/emacs/ELPA)-wrangling code (based off the [Emacs Starter Kit, version 2](https://github.com/technomancy/emacs-starter-kit/tree/v2)) with something much more sensible and simple. It's great, but I would still need to write many package configurations to pick up what I've accumulated over the years and tidy it so that make it all make sense and works together. That is, it would help to solve my problem, but there's a lot of work I'd have to do still.

Then I discovered [Spacemacs](https://github.com/syl20bnr/spacemacs), which comes with "batteries included" and organises the configuration of all your Emacs packages. I've seen this before with the ESK and with [Prelude](http://wikemacs.org/wiki/Prelude), but Spacemacs offers something different over these: modular configuration, using `use-package`, in the form of lazily-loaded *Layers*.

Wow, this is so elegant — and importantly, much of the package installations/configurations I've been doing on my own over the years are already done for me (by people with much more skill than I). Equally important: you can opt out of Spacemacs' idiosyncrasies (such as making Emacs behave like vim) much more easily than with ESK or Prelude.

So, I'm going to Spacemacs!

Adopting Spacemacs
----

Spacemacs is well documented, so there is not a lot of value in me describing how it works here.  The most cuspy part for me is the *Layers* that Spacemacs brings to the configuration game.  All the machinery to make downloading/compiling groups of packages which go together; and then configuring them with custom functions, hooks and keybindings (over what `use-package` does) is all done for you. You just need to include any of the pre-built Layers that come with it into your `dotspacemacs-configuration-layers` list, or write your own Layers to add to the list.

Of course it still needs tweaking to personal taste (there's no accounting for personal taste), and that is why I have a [dotspacemacs project](https://github.com/sinewalker/dotspacemacs) on [GitHub](https://github.com).

*I have a* **dotemacs** *project in [BitBucket](http://bitbucket.com) too, but frankly I'm too embarrassed to share it publicly (A good test of whether your code smells bad is to consider if you'd be happy to make it public. My emacs configuration fails this test, so it's Private to protect the innocent).  I'll be pulling custom functions out of it, but nearly all the configuration settings are either already set as defaults in Spacemacs, or are obsoleted by advances in Emacs itself (such as zooming text sizes).*

My main aims in configuring *Spacemacs* are:

 * Make it less like vim, but still using Helm (I know, people tell me vim is great but I don't agree)
 * Add my personal utility `defun`s, where still required (in a Layer)
 * Configure personal preference variables
 * Add modern/super-keybindings
 * TODO: Configure separate Layers for different groupings of settings, and also contrive to add different groups of Layers for different hosts I install Spacemacs to (e.g. some Layers for Windows/Cygwin settings that are only added when on a Windows host, or a host with a specific name)

That should pretty well be all I do with this, aside from adding/removing the built-in layers as I want.

Personal dotspacemacs
====

To begin with, I'll write about what I've covered so far, since not every one of my aims is met yet (I've been playing with Spacemacs for about a fortnight).

The first thing I did was to think about how I want to organise my Spacemacs layout. When you first clone the Spacemacs git repository into your `~/.emacs.d` (replacing whatever you used to have there), it asks you a few questions and then generates a personal `~/.spacemacs` configuration file from a template. It sets a few variables, such as `dotspacemacs-editing-style` (which toggles between traditional "holy" emacs style editing, or the modal editing of vi (vim), or even a "hybrid" of the two). 

I thought about having just one configuration file again, but then I thought it would be easiest to maintain a whole directory on a source control system, since Spacemacs supports a `~/.spacemacs.d` directory.  So I made one, and moved the supplied config file into `~/.spacemacs.d/init.el`. This will be my new init script and directory, to replace the hairball of my old `~/.emacs.d` which is now given over exclusively to Spacemacs. Files in there will be entirely managed by Spacemacs' own machinery, though of course I can still look to see what it does, especially in `~/.emacs.d/layers`. Here's an overview:

```shell
.spacemacs.d/
├── config
│   └── ...
├── init.el
├── layers
│   ├── mjl
│   │   └── ...
│   └── mu4e-mike
│       └── ...
├── LICENSE
├── README.md
└── snippets
    └── ...
```

But I'm getting ahead of myself.

Spacemacs has a nifty function `ediff-dotfile-and-template` to compare your dotspacemacs file with the stock template that comes from the project. It uses Emacs Ediff, and still works when with `~/.spacemacs.d/init.el`. It's really handy and I'm using that to review my own [init.el](https://github.com/sinewalker/dotspacemacs/blob/master/init.el) as I write this log entry.

I'll just show you some interesting highlights from my first couple weeks of playing, rather than go blow-by-blow through the whole file.

Spacemacs leader key
----

That differencing function is bound to the Spacemacs key sequence `SPC` `f` `e` `D`. A lot of Spacemacs works like this; it uses **helm** and it reduces a lot of key-chords. The leader key is `SPC` by default in "*vim*" mode, but it's `M-m` in "*holy*" (emacs) mode.  I find that hard to type, so the first thing I did was to change it:

```emacs-lisp
   ;; The leader key accessible in `emacs state' and `insert state'
   ;; (default "M-m")
   dotspacemacs-emacs-leader-key "s-SPC" ;"M-m" 
```

That `s-SPC` means Super-Space.  On PCs, the Super key is the one with the Microsoft logo on it (the "Windows" key, or ❖ on my TEK 209). On my Sun Type 6, this is the ◆ diamond key, next to the space bar. It's much easier to type than `M-m`. It's also happily the ⌘ Command-key on a Macintosh, so if I'm ever using Spacemacs on one of those (very likely where I work), it'll still work.

I did want to use H-SPC, because Hyper-Space would be so cool, but without mucking in my X11 configuration to change things, this is the Apps/Menu key on a PC, and who-knows-what on a Mac &mdash; maybe ⌥ Command? &mdash; And I don't want to have to hack operating system settings to make my Spacemacs work in hyperspace. Oh well.

Rainbow sparkles
----

Emacs has a [Nyan mode](http://www.emacswiki.org/emacs/NyanMode), of course. You've gotta have the [Nyan cat](http://www.nyan.cat/)!  I found the `colors` layer pretty quickly. It does rainbow-delimeters, and rainbow identifiers too. There's a small typo in the documentation for it. I should submit a pull request, but I'll have to learn how to do that first.  Here's my config for that layer, that turns on the cat, but only in graphics mode:

```emacs-lisp
     (colors :variables
             colors-enable-rainbow-identifiers nil
             colors-enable-nyan-cat-progress-bar (display-graphic-p))
```

This also disables rainbow-identifiers by default. I can toggle it on manually with `M-x rainbow-identifiers-mode`, but don't do that much, it's more distracting than the cat!

PHP Layer tweak
----

Okay enough fun. My first *interesting* hack was to "tweak" the `php` Layer a little bit.  I use PHP at work, though really I don't know this language very much, so I just want some basic syntax hi-lighting and maybe the ability to compile/run code. The `php` Layer includes a package called `php-extras`, but this doesn't build for me. I get compilation errors. The easiest fix for now is to use Spacemacs' package exclusion facility:

```emacs-lisp
   dotspacemacs-excluded-packages '(
                                    php-extras ; MJL20151220 compilation errors
                                    )
```

Boom, no more compiler errors and failed startup (and also no extras for PHP, but I don't mind for now).

Auto-completion
----

Now things start to get a little more interesting.  I use [yasnippet](http://www.emacswiki.org/emacs/Yasnippet) a little bit, for email templates mostly. I mean to get into this a lot more, but it was one of the things I could not get to work right with my old emacs setup, so it's been on the back-burner.  Spacemacs has a layer that includes this package: `auto-completion`. It's a really nice layer actually, and everything works well for the most part.

I want to keep my yas snippets out of `~/.emacs.d`, and thought the best place for them actually is to copy them from my old project into `~/.spacemacs.d/snippets`.  The package has a variable you can set to tell yas where the snippets are:

```emacs-lisp
     (auto-completion :variables
                      auto-completion-private-snippets-directory "~/.spacemacs.d/snippets/")
```

Now pressing `s-SPC` `i` `s` gives me a **HELM** buffer to insert snippets which match the current buffers editing mode, and it's picked up my own snippets too. Great!

But there's one problem I've found.  The `auto-completion` Layer adds a hook to work around a [compatibility problem](https://github.com/Fuco1/smartparens/issues/431) between yasnippet and another Emacs package called **smartparens** (which looks like it takes the best of paredit and a few other modes, worth looking more into later).  The hook checks if smartparens mode is enabled, and disables it while yasnippet runs its snippet completion. This is great, and a fine example of the kind of configuration / machination stuff I want Spacemacs to take care of for me so that it "just works".  Problem is: if you haven't ever used smartparens, then the hook will fail with an error "function definition is void: smartparens-mode". This is often the case for me if I haven't loaded any code buffers before I write an email (because Spacemacs makes all the packages load "lazily" to speed up starting, so smartparens isn't fully loaded yet).

However, I'm very happy:  **I've found the configuration problem**, it only took me a few minutes to work out where the problem is, and I should be able to write a small patch to the `auto-completion` layer pretty easily (again, submit a PR when I learn how to).  Haven't yet, but it's on my todo list. The code with the hook is in  the `use-package` configuration for yas-snippet, in `~/.emacs.d/layers/auto-completion/packages.el`:

```emacs-lisp
...
    :config
    (progn
      ;;  We need to know whether the smartparens was enabled, see
      ;; `yas-before-expand-snippet-hook' below.
      (defvar smartparens-enabled-initially t
        "Stored whether smartparens is originally enabled or not.")

      (add-hook 'yas-before-expand-snippet-hook (lambda ()
                                                  ;; If enabled, smartparens will mess snippets expanded by `hippie-expand`
                                                  (setq smartparens-enabled-initially smartparens-mode)
                                                  (smartparens-mode -1)))
      (add-hook 'yas-after-exit-snippet-hook (lambda ()
                                               (when smartparens-enabled-initially
                                                 (smartparens-mode 1))))
      (spacemacs|diminish yas-minor-mode " ⓨ" " y"))))
...
```

It just needs a `(when (fboundp smartparens-mode)...) ` guard around those lambda functions to check if `smartparens-mode` is bound to a function. I'll fix that and do a patch/pull request thing when I work out how to.

mu4e configuration layer
----

My first Layer is to install and configure something which I needed right away: **mu4e**, so that I can still read my work emails (we get a **lot** of email in the sysadmin groups, and mu is the best way I've found to handle it, even if it does take 1.5GB of RAM when it's loaded my email database).

When I wrote my layer, there was not yet a mu4e layer in the main branch of Spacemacs, but there is one in the Develop branch. I don't want to switch to the Develop branch for my main emacs configuration, so what I did was:

 1. View the [Develop branch on GitHub](https://github.com/syl20bnr/spacemacs/tree/develop)
 1. Download the `mu4e` layer codes (under `layers/+email` ... I can see it's [there on Master](https://github.com/syl20bnr/spacemacs/tree/master/layers/%2Bemail/mu4e) now)
 1. Find a place to put my layers.  I opted to go with putting them in my spacemacs directory, rather than in `~/.emacs.d/private/layers` (I don't yet want to figure out sub-repos in git), which means I need to tell Spacemacs about it (in my `~/.spacemacs.d/init.el`):

```emacs-lisp
   dotspacemacs-configuration-layer-path '("~/.spacemacs.d/layers")
```

```emacs-lisp
     (mu4e-mike :variables
                mu4e-installation-path "/usr/local/share/emacs/site-lisp/mu4e")
```

(now that it's in Spacemacs *master*, I should probably retire it from my own project)

That's pretty well it, apart from configuring for work's email server, which took me a little while to nut out because I had it sprinkled between two different config files on my old Emacs setup, and also the global Customize settings, and the settings for the IMAP sync...  What I've done is to put it all in a file by itself in `~/.spacemacs.d/config/mu4e-config.el` (because it's specific to me, not general mu4e configuration for the layer), and then `require` it from the `dotspacemacs/user-config` function (the last two expressions below, the rest is personal preference too):

```emacs-lisp
(defun dotspacemacs/user-config ()
  "Configuration function for user code.
 This function is called at the very end of Spacemacs initialization after
layers configuration. You are free to put any user code."

  (setq frame-title-format '(buffer-file-name "%f" ("%b"))
        mouse-autoselect-window t
        display-time-24hr-format t)
  (blink-cursor-mode t)
  (display-time-mode t)
  (setq indicate-unused-lines t)

  (add-hook 'before-save-hook 'time-stamp)
  (setq copyright-limit 1024)
  (add-hook 'before-save-hook 'copyright-update)

  (push "~/.spacemacs.d/config/" load-path)
  (require 'mu4e-config nil t)
  )
```


Personal settings and functions layer
----

As you see above, I'm setting basic things in the function which Spacemacs has set aside for it, `dotspacemacs/user-config`.  But after doing my first layer for mu4e, I thought I'd have a go at another one to do keybindings and my custom utility functions from *wayback*.

I found the `osx` Layer (`~/.emacs.d/layers/osx`), which is a good starting point, even though I don't (yet) use a Mac.  So I copied that and made changes.  There's still some refinements to make to the bindings, some missing functions to add (again in a different file in my old config to where I got *most* of my old stuff is...) and a proper `README.org`, but it's mostly correct:

 *  `mjl` layer [on github](https://github.com/sinewalker/dotspacemacs/tree/master/layers/mjl)

This does:

 * super keys, F*n* keys, Sun keys (in `keybindings.el`)
 * my old functions from `~/.emacs.d/mjl/defuns.el` (in `funcs.el`)

`config.el` is just copied from the `osx` layer and is unused for now, but I might put configurations in there if I need different settings for different hosts.

----

That's it for my first two weeks with Spacemacs.

I had a thought about how to set it up so that different layers are enabled for different hosts/operating systems.  Since all you do to add a Layer is stick it into Spacemacs' `dotspacemacs-configuration-layers` list, then I could maintain a list for each OS/host that I have, and then just `(append)` the dotspacemacs list together as appropriate. That'd be straightforward to do, and elegant.

Just like Spacemacs.

