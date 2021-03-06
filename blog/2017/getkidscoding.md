<!-- 
.. title: getkidscoding
.. slug: getkidscoding
.. date: 2017-09-19 09:45:54 UTC+10:00
.. tags: CodeKids, children, getkidscoding
.. category: 
.. link: 
.. description: Overview of what I'm planning for coding in schools
.. type: text
-->

I've been coming to my sons class when I get a chance and showing the kids about computer codes. I actually started a [CodeClub](https://codeclubau.org) last year and we were pretty successful, though very limited by my availability -- I was able to run the club for one hour *most* weeks, so it took us two terms to cover [Scratch 1](https://codeclubprojects.org/en-GB/scratch/).

This year I've had even less time away from work, but I've had great support from the grade 6 teacher. We plan for him to facilitate the projects in class while I assist via emails and blogs. So: here's my first post.

<!-- TEASER_END -->
----

## CodeClub, `#getkidscoding`, and Scratch

I started last year by [registering a CodeClub](https://codeclubau.org/get-involved/) (you can see Margate on the map!) and working through the Scratch projects on the Scratch 1 module.  This was well received by the kids.  This year we skimmed that module (since half the class is made of the same pupils as last year) -- the kids have all kept up, even those who weren't exposed before.  I think it's for two reasons:

 1. We paired experienced kids with newbies
 2. All the kids are in grade 6, instead of a mixed 4/5 class

The coding language we used is [Scratch](https://scratch.mit.edu), from the Massachusetts Institute of Technology. That's the famous MIT.  Scratch has been a great environment because it's readily accessible on school computers without installing anything, and it's so engaging. Also the block-codes remove hurdles of syntax and typing errors that older languages I grew up with such as LOGO and BASIC had.

Unfortunately it has a problem: the runtime is based upon Adobe Flash, which is being phased out by Adobe and support on browsers is already being disabled: I can't run it on my work's computer; I don't know how long before the school computers also turn it off. There is an [HTML5 Scratch player](https://wiki.scratch.mit.edu/wiki/HTML5_Player) project, with [code on GitHub](https://wiki.scratch.mit.edu/wiki/HTML5_Player), but it's only 40% complete and being worked on by volunteers, not MIT staff. Nobody has time to get it going properly, which is sad.

But there is good news:  Scratch is only the beginning of the CodeClub coding journey. They have projects using HTML/CSS, and Python, which can also be run from a browser without installing anything on school equipment. They use *Trinket* for an in-browser editor *and runtime*.

## Trinket

[Trinket]( https://trinket.io) is a great resource for learning to code in schools, because:

 * It requires only an HTML5 browser. Anything newer than 2014 will do
 * Pupils *are not required to sign in or have an email address*:  You can bookmark links to resume your projects
 * The editor, while fairly basic, has syntax highlighting and balances parenthesis/quote pairs, so you can get feedback when you make typing mistakes.

I believe it's time to expose the kids to some "real" code: they have a great grounding from Scratch and understand the basics of Sequence, Blocks, Loops, and Branches, so it's only a small step up.

## What will we be doing

I'm undecided.  We could move on to the [HTML&CSS projects](https://codeclubprojects.org/en-GB/webdev/), which will be a great grounding in how the Web works, and give the pupils an opportunity for some *real* "computer *literacy*" -- they will be able not only to *use* the web as a resource, but express themselves and create new work in the medium.

On the other hand, we could tackle the [Python modules](https://codeclubprojects.org/en-GB/python/).  Python is the main programming language used for the Raspberry Pi, with good reason. It's also very popular as a language for conducting scientific research, as an extension language for games (e.g. [Minecraft PI](https://www.raspberrypi.org/learning/getting-started-with-minecraft-pi/)) and office software ([Libre Office](https://pypi.python.org/pypi/pyoo/1.0), or [Google APIs](https://developers.google.com/api-client-library/python/)), and to program robots.

Both can be done straight away.  I am thinking to actually ask the pupils what they would like to do.

## Why not both?

Well, we *could* do that. It's a matter of how much time is available to work through these things, and what goals we want to set for the end of the year.  Personally I don't think we could work through *all* the modules of both, but we could pick-and-choose according to end goals. The risk is trying to learn 2 coding languages at once (actually 3 if you count HTML and CSS as separate languages) could be confusing. Or not: maybe I shouldn't underestimate the kids?

I know that the class has some LEGO&trade; NXT&trade; robots that they would like to program, so that is yet another direction.

**UPDATE 2017-09-19T12:08+1000** After talking very briefly with the teacher, we feel we should head down the Python trail next term, if only because there are a couple of pupils who've seen it already and may act as teacher's helpers, and because the two languages HTML and CSS are also a move from *Imperative* programming to *Declaraitive*.

## Getting started with Trinket

Whichever language we choose to use, we'll be using Trinket to do the coding.  Getting started is really simple:

 * Open an HTML5 web browser (e.g. Firefox, Chrome, MS-Edge)
 * Visit [https://trinket.io](https://trinket.io)
 * If you want to, you can create an account and sign in
 * Or, you can instead visit [This bare project I created anonymously](https://trinket.io/python/33e5c3b81b) and then start to code.

### Saving work

You can keep your work *without having a Trinket.io account*:  Just click the "**Share**" menu, and choose "**Link**".  You can copy the URL and store it in your notebook. I'll be recommending that pupils follow my [fourth rule of computing](/blog/2015/4-bit-rules-of-computing-part-1.html).

## Pedagogy

One other stream of thought I've been having is to answer the "why" and "what" questions that teachers and other parents have about getting kids to code.  I think that the CodeClub joint founder Clare Sutcliffe sums this up brilliantly in he 10-minute TEDx Talk in Brighton, in 2012:

<iframe width="560" height="315" src="https://www.youtube.com/embed/ng7sf2_peFg?rel=0" frameborder="0" allowfullscreen></iframe>

This is clearly oriented towards the UK, and indeed UK now has a [computer curriculum for K-6](http://www.develop-online.net/news/uk-govt-outlines-computer-science-curriculum/0115853) which the CodeClub projects follow closely. But what about Australia? Well, CodeClub AU have put up [this Australian Curriculum Map](https://codeclubau.org/curriculum/overview.html) which maps the projects to the new [Australian Digital Technologies curriculum](https://www.australiancurriculum.edu.au/f-10-curriculum/technologies/digital-technologies/)!  Very handy resource for teachers.  Teachers also can benefit from [Teacher training and workshops](https://codeclubau.org/teacher-training/), online or face-to-face, **for free**.

An important point in Clare's video is the gap in generations between the current "digital natives" and coders like me who learned to code in the 1980s.  Teachers today haven't had the experience of coding that I enjoyed, or at least not from a point of view where they could be supported in teaching it to children.  Naturally the new STEM curriculum with computing in it is [very scary and frustrating to them](http://www.smh.com.au/national/computer-science-reforms-to-test-teachers-skills-20140111-30nj4.html).

This is where I feel that I fit in:  as a coder and a dad, I'm in a position where facing a room full of children and trying to explain computers to them is -- while daunting and challenging -- not completely terrifying, as it would be to many coders out there.  So it's something I'm keen to do.

My personal views on this effort are that true "computer literacy" will only be achieved when pupils can not only use computers, but express themselves with them. Just like English literacy.  And also just like English, the goal is not to create a generation of computer programmers. I want coding to be a core skill, like English and Mathematics, because just like those two, it is central to future (indeed *current*) lifestyles and vocations.  We don't teach English to create book authors, but everyone understands its importance.  The same is true for programming computers.


## Stay tuned

I'm really excited to get going for the final term of school and also continue into future years.
