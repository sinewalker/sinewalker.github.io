<!-- 
.. title: 4-bit Rules of Computing, Part 2
.. slug: 4-bit-rules-of-computing-part-2
.. date: 2015-06-07 22:11 UTC+10:00 
.. tags: draft, 4-bit-rules, tips, comments, testing, litterate
.. category: blog
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
[thought-provoking](http://simpleprogrammer.com/2015/04/13/why-comments-are-stupid-a-real-example/)
blog on [Simple Programmer](http://simpleprogrammer.com) got me
[really worked up](https://xkcd.com/386/) to begin with.  It goes against
everything I've been taught and trained to believe.  Looking at the
feedback for it, it's clear I'm not alone.

But after I calmed down and *read it properly*, I came around, mostly
(but see Rule 6)&hellip;.

While I'm not convinced that John successfully demonstrates his point,
I do follow his reasoning, and I agree with his principle that source
code *should* be speaking for itself, whenever it can; and that if you
are resorting to using embedded comments to *explain the logic or
implementation*, this should be a sign to rethink your approach. This
is mostly in line with Rule 2.

My own opinion about code comments now is to treat them in the same
vein that
[Dijktra](http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html)
treated `GOTO`: avoid it *where you can*. If you are unfortunate
enough to be working in a language that does not have Doc-Comments, or
that is esoteric (like assembly, bash scripts, Perl, or JCL) then I
think you should be using comments *liberally*, just as assembly uses
conditional `JUMP` instructions.

But keep [Rule 0](/pg/4-bit-rules-part-0) in mind.

----

I've also mentioned *YouTube* here. That's because I'm beginning to
doubt the value of "Web 2.0" as it appears in You/Twit/Face
comments. They are a great opportunity for engaging with your audience
and to facilitate feedback, but they are more likely a vector for
personal attack and flamage. I'm lucky to have not been much of a
victim of flame wars, but now that the Internet is mainstream, it's
become a real concern, especially for women.

For some things, it may be safest not to comment when you don't agree
with something online. At least Google+ has the Mute function, so we
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

