<!-- 
.. title: Upgrading Nikola: some pitfalls and how I climbed out of them
.. slug: upgrade-nikola-783
.. date: 2017-03-23 07:48:48 UTC+11:00
.. tags: meta, blog, draft
.. category: 
.. link: 
.. description: Upgrading Nikola needs some thought
.. type: text
-->

After [some hacking]() of [my dotfiles]() and [python settings](), I lost my `nikola` virtual environment (I think it broke after a brew update or something.  The hacking's only partly recorded in the issues on GitHub).

But that's no biggie, just make a new one and re-install, right?  Well, not quite. The re-install gives you the *latest* Nikola (great!) and that means I have to review and update my `conf.py` (okay...) and figure out runtime errors like this:

```
[src:?][mjl@milo:~/hax/net/blog/milosophical.me]
[07:27](nikola)$ nikola version
Traceback (most recent call last):
  File "/Users/mjl/lib/nikola/bin/nikola", line 11, in <module>
    sys.exit(main())
  File "/Users/mjl/lib/nikola/lib/python3.6/site-packages/nikola/__main__.py", line 171, in main
    _ = DN.run(oargs)
  File "/Users/mjl/lib/nikola/lib/python3.6/site-packages/nikola/__main__.py", line 339, in run
    self.nikola.init_plugins()
  File "/Users/mjl/lib/nikola/lib/python3.6/site-packages/nikola/nikola.py", line 1077, in init_plugins
    self._activate_plugins_of_category("SignalHandler")
  File "/Users/mjl/lib/nikola/lib/python3.6/site-packages/nikola/nikola.py", line 1233, in _activate_plugins_of_category
    plugin_info.plugin_object.set_site(self)
  File "/Users/mjl/lib/nikola/lib/python3.6/site-packages/nikola/plugins/misc/taxonomies_classifier.py", line 328, in set_site
    self._register_path_handlers(taxonomy)
  File "/Users/mjl/lib/nikola/lib/python3.6/site-packages/nikola/plugins/misc/taxonomies_classifier.py", line 316, in _register_path_handlers
    doc = taxonomy.path_handler_docstrings[name]
KeyError: 'page_index_folder_index'
```

(well, pooh).

I decided a while back that I wasn't going to meta-blog (otherwise most of my posts would be about blogging!), but I think in this case, Rule 4 will come to the rescue.  Anyway at least you know this story has a happy ending, or else I wouldn't be able to add this `new_post`!

<!-- TEASER_END -->
----

Okay so starting over, how actually did I get to this point?

First I made a fresh python virtual environment using [my nifty python venv wrapper]():

```
[src:?][mjl@milo:~/hax/net/blog/milosophical.me]
[22:01]$ mkvenv nikola
Using base prefix '/usr/local/Cellar/python3/3.6.0_1/Frameworks/Python.framework/Versions
/3.6'                    
New python executable in /Users/mjl/lib/nikola/bin/python3.6
Also creating executable in /Users/mjl/lib/nikola/bin/python
Installing setuptools, pip, wheel...done.

[src:?][mjl@milo:~/hax/net/blog/milosophical.me]
[22:01]$ activate nikola

[src:?][mjl@milo:~/hax/net/blog/milosophical.me]
[22:02](nikola)$ pip install "Nikola[extras]"
Collecting Nikola[extras]

&hellip;

Installing collected packages: natsort, Yapsy, docutils, Pygments, piexif, PyRSS2Gen, lxml, MarkupSafe, mako, logbook, blinker, unidec
ode, cloudpickle, macfsevents, doit, requests, olefile, Pillow, six, python-dateutil, ws4py, argh, PyYAML, pathtools, watchdog, pygal,
 jsonschema, decorator, ipython-genutils, traitlets, jupyter-core, nbformat, tornado, Jinja2, pandocfilters, webencodings, html5lib, b
leach, entrypoints, testpath, mistune, nbconvert, pyzmq, jupyter-client, ptyprocess, terminado, simplegeneric, pexpect, pickleshare, a
ppnope, wcwidth, prompt-toolkit, ipython, ipykernel, notebook, Markdown, ghp-import2, pyphen, micawber, webassets, smartypants, typogr
ify, phpserialize, husl, Nikola                                                                                                      
Successfully installed Jinja2-2.9.5 Markdown-2.6.8 MarkupSafe-1.0 Nikola-7.8.3 Pillow-4.0.0 PyRSS2Gen-1.1 PyYAML-3.12 Pygments-2.2.0 Y
apsy-1.11.223 appnope-0.1.0 argh-0.26.2 bleach-2.0.0 blinker-1.4 cloudpickle-0.2.2 decorator-4.0.11 docutils-0.13.1 doit-0.30.3 entryp
oints-0.2.2 ghp-import2-1.0.1 html5lib-0.999999999 husl-4.0.3 ipykernel-4.5.2 ipython-5.3.0 ipython-genutils-0.2.0 jsonschema-2.6.0 ju
pyter-client-5.0.0 jupyter-core-4.3.0 logbook-1.0.0 lxml-3.7.3 macfsevents-0.7 mako-1.0.6 micawber-0.3.3 mistune-0.7.4 natsort-5.0.2 n
bconvert-5.1.1 nbformat-4.3.0 notebook-4.4.1 olefile-0.44 pandocfilters-1.4.1 pathtools-0.1.2 pexpect-4.2.1 phpserialize-1.3 picklesha
re-0.7.4 piexif-1.0.12 prompt-toolkit-1.0.13 ptyprocess-0.5.1 pygal-2.3.1 pyphen-0.9.4 python-dateutil-2.6.0 pyzmq-16.0.2 requests-2.1
3.0 simplegeneric-0.8.1 six-1.10.0 smartypants-2.0.0 terminado-0.6 testpath-0.3 tornado-4.4.2 traitlets-4.3.2 typogrify-2.0.7 unidecod
e-0.4.20 watchdog-0.8.3 wcwidth-0.1.7 webassets-0.12.1 webencodings-0.5 ws4py-0.3.5
```

Cool, that was easy. Okay, let's see what we've got

```
[src:?][mjl@milo:~/hax/net/blog/milosophical.me]
[22:16](nikola)$ nikola version
[2017-03-22T11:18:23Z] WARNING: Nikola: The STORY_INDEX option is deprecated, use PAGE_INDEX instead.
Traceback (most recent call last):
  File "/Users/mjl/lib/nikola/bin/nikola", line 11, in <module>
    sys.exit(main())
  File "/Users/mjl/lib/nikola/lib/python3.6/site-packages/nikola/__main__.py", line 171, in main
    _ = DN.run(oargs)
  File "/Users/mjl/lib/nikola/lib/python3.6/site-packages/nikola/__main__.py", line 339, in run
    self.nikola.init_plugins()
  File "/Users/mjl/lib/nikola/lib/python3.6/site-packages/nikola/nikola.py", line 1077, in init_plugins
    self._activate_plugins_of_category("SignalHandler")
  File "/Users/mjl/lib/nikola/lib/python3.6/site-packages/nikola/nikola.py", line 1233, in _activate_plugins_of_category
    plugin_info.plugin_object.set_site(self)
  File "/Users/mjl/lib/nikola/lib/python3.6/site-packages/nikola/plugins/misc/taxonomies_classifier.py", line 328, in set_site
    self._register_path_handlers(taxonomy)
  File "/Users/mjl/lib/nikola/lib/python3.6/site-packages/nikola/plugins/misc/taxonomies_classifier.py", line 316, in _register_path_handlers
    doc = taxonomy.path_handler_docstrings[name]
KeyError: 'page_index_folder_index'

[src:?][mjl@milo:~/hax/net/blog/milosophical.me]
[22:18](nikola) 1 $
```

Um, what?  Well, this has come up in the past, so let's first just check that basic nikola can load from a directory that doesn't have a `conf.py` in it, like `$HOME`:

```
[src:?][mjl@milo:~/hax/net/blog/milosophical.me]
[22:18](nikola) 1 $ cd

[mjl@milo:~]
[22:20](nikola)$ nikola version
Nikola v7.8.3
```

Okay that worked.  So, it must be an issue with an old `conf.py` in my project.  I'll have to update it.


Get the latest `conf.py` from https://getnikola.com/conf.html

Compare that to mine using Ediff and selectively merge in the changes.

fael (first error in this blog)

Only this is with the *new* `conf.py` settings *and removal of deprecated stuff*.  Granted, the values of the variables set to customise for this site, **but that Should Work!**  Why not?

One of the changes imported was this:

```diff
@@ -975,13 +1032,13 @@ COMMENT_SYSTEM_ID = ""
 # the "noannotations" metadata.
 # ANNOTATIONS = False
 
-# Create index.html for page (story) folders?
+# Create index.html for page folders?
 # WARNING: if a page would conflict with the index file (usually
-#          caused by setting slug to `index`), the STORY_INDEX
+#          caused by setting slug to `index`), the PAGE_INDEX
 #          will not be generated for that directory.
-STORY_INDEX = True
-# Enable comments on story pages?
-# COMMENTS_IN_STORIES = False
+PAGE_INDEX = True
+# Enable comments on pages (i.e. not posts)?
+# COMMENTS_IN_PAGES = False
 # Enable comments on picture gallery pages?
 # COMMENTS_IN_GALLERIES = False
```

Since I *was* using `STORY_INDEX = True` before, I set `PAGE_INDEX = True` when I merged.  But the error has been about the page index all along: 

```
KeyError: 'page_index_folder_index'
```

So, what if I try (on the bus this morning) disabling `PAGE_INDEX = True`?

```
[src:+!?][mjl@milo:~/hax/net/blog/milosophical.me]
[07:42](nikola)$ nikola version
Nikola v7.8.3
```

**Success!** 

In Nikola <= 7.7.1 I used `STORY_INDEX = True` to have this page: http://milosophical.me/pg/index.html

I still want a page (ne "story") index, so now I'll have to work out why that is breaking.  Time to go exploring:

```
[src:+!?][mjl@milo:~/hax/net/blog/milosophical.me]
[07:48](nikola)$ nikola new_post -d -f markdown
Creating New Post
-----------------

Title: Upgrading Nikola: some pitfalls and how I climbed out of them
Scanning posts..........done!
[2017-03-22T20:48:48Z] INFO: new_post: Your post's text is at: posts/2017/upgrading-nikola-some-pitfalls-and-how-i-climbed-out-of-them.md

[src:+!?][mjl@milo:~/hax/net/blog/milosophical.me]
[07:48](nikola)$ mv posts/2017/upgrading-nikola-some-pitfalls-and-how-i-climbed-out-of-them.md posts/2017/upgrade-nikola-783.md
```

```quote
**There's benefits to upgrading too**:  I really like the new `-d` switch to put your posts into date folders (formatted by the new `NEW_POST_DATE_PATH_FORMAT = '%Y'`)!  I should figure out how to specify a shorter *slug* though.
```

----


