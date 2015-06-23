<!-- 
.. title: 4-bit Rules of Computing, Part 2
.. slug: 4-bit-rules-of-computing-part-2
.. date: 2015-06-09 21:11 UTC+10:00 
.. tags: draft, 4-bit-rules, tips, comments, litterate
.. category: lore
.. link: 
.. description: Mike's 4-bit rules explained, part 2
.. type: text
--> 

Here is the third part of my [blog series](/tags/4-bit-rules.html) expanding on my
[4-bit rules of computing](/pg/4-bit-rules.html).

In this instalment:  Rules 5 and 6, on code comments.

<!-- TEASER_END -->

**Rule 5**: Comments considered harmful
----
*(embedded in code, as well as those on YouTube)*

This
[thought-provoking blog](http://simpleprogrammer.com/2015/04/13/why-comments-are-stupid-a-real-example/)
on [Simple Programmer](http://simpleprogrammer.com) certainly
[provoked me](https://xkcd.com/386/) to begin with.  It goes against
everything I've been taught and trained to believe.  Looking at the
feedback for it, it's clear I'm not alone.  Nearly every reaction I've
had when discussing this line of thought in person has been "the
smeg?" too.

But after I calmed down and *read John's post properly*, I came around, mostly
(but see **Rule 6**)&hellip;.

While I'm not convinced that John successfully demonstrates his point,
I do follow his reasoning, and I agree with his *principle* that **source
code should be speaking for itself, whenever it can**; that if you are
resorting to using embedded comments to *explain the logic or
implementation*, this should be a sign that you want to rethink your
approach. This is mostly in accordance the advice in Rule 2.

So now after thinking on this for a while and weighing it against my
upbringing, my own opinion about code comments is to treat them in the
same vein that
[Edsger Dijkstra](http://en.wikipedia.org/wiki/Edsger_W._Dijkstra)
[treated `GOTO`](http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html):
avoid it *where you can*, because many uses are the
[Wrong Thing](http://www.catb.org/jargon/html/W/Wrong-Thing.html)&trade;
and you should be doing something else instead:

* *Code* is the single authoritative source of truth in a program!
* There is no way to ensure that code comments are correct at all
  times (they're not always updated as code changes, and they're not
  covered by unit tests).
* Comments are written in human language which can be prone to
  misinterpretation.

What one should be doing instead is putting good intentions into
writing simple (or at least clear and explicate), readable code.

My own comment pet peeves:

* Comments inline that translate code into English (why?)
* Comments that have nothing to do with what the code does (except
  when they are funny)
* or worse, Comments that mislead because they say what the code *used
to do*, or what it *should be doing*, or is pseudocode for *an idea
that was not implemented*

<a href="https://plus.google.com/116269726157614459607/posts/263et4zQMh3"><img src="pixels/dust/SoManyLies.jpg"/></a>

***Please don't do these things***. At best, you're filling your code
   with noise, and doubling your maintenance debt (because you must
   ensure that comments are still true after you change the code
   &mdash; see **Rule A**).  At worst though, you're misleading
   readers, the equivalent of doing the old signpost vandalism trick.

And really, what the smeg is with comments like this?

```python
# Set the maximum length of a wall.
maxWallLen = 1

# Find position of player and set base of maze 3 blocks lower.
ppos = player.getPos()
ppos.y -= 3
```

I mean, come on.

Oh, and if you find yourself writing comments like this

```java
//MJL20150609 Increased size from 384, for ticket 23940129
int MaximumFobs = 512
```

Then you should feel naked running around without your source control
clothes on (and *do* I feel for you, if you have no source control
available, I've been there &hellip;)

Okay, ranting over.

Now, **on the other hand, if you are unfortunate enough to be working
in a language that does not have Doc-Comments**, or **that is
esoteric** (like assembly, bash scripts, Perl, or JCL), or **your
problem is very hairy** (numerical analysis, or some complicated logic
that really deserves a
[Litterate Programming](http://www.literateprogramming.com/)
approach), well *then* I think **you should be using comments**
***liberally***.

But keep [Rule 0](/pg/4-bit-rules-part-0) in mind, and everyone loves
funny comments, used sparingly:

```
// hack for ie browser (assuming that ie is a browser)

// TODO make this work

// If you’re reading this, that means you have been put in charge of my previous project.
// I am so, so sorry for you. God speed.

// Abandon hope, all ye who enter here
```
----

I've also mentioned *YouTube* for this Rule. That's because **I'm beginning to
doubt the value of "Web 2.0" as it appears in You/Twit/Face
comments**. They are a great opportunity for engaging with your audience
and to facilitate feedback, but they are more likely a vector for
personal attack and flamage. I'm lucky to have not been much of a
victim of flame wars, but now that the Internet is mainstream, it's
become a real concern, especially for women.

For some things, **it may be safest not to comment when you don't agree
with something online**. At least Google+ has the Mute function, so we
can be cowards and run away, just not Anonymous Cowards&hellip;.


**Rule 6**: but Doc-Comments are a Force for Good
----

Doc-Comments are the language-supported documentation strings that can
optionally be added to function definitions. Examples are LISP
documentation strings, Javadoc strings, and Python's docstrings,
though they appear in many languages.

These really are a Force for Good. Every argument that John Sonmez has
about code comments can be refuted for doc-comments:

* 
*
*

