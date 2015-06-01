<!-- 
.. title: 4-bit Rules of Computing, Part 1
.. slug: 4-bit-rules-of-computing-part-1
.. date: 2015-05-31 20:41:35 UTC+10:00
.. tags: 4-bit-rules, tips, draft
.. category: 
.. link: 
.. description: Mike's 4-bit rules explained, part 1
.. type: text
--> 

Here is the second part of my series expanding on my
[4-bit rules of computing](/pg/4-bit-rules.html).

In this instalment:  Rules 4 to 7 (the third bit), which is mainly about 
documentation and experiments.

<!-- TEASER_END -->

**Rule 4**: If you're exploring, keep a notebook/journal
----
(or, indeed, a blog)

One of the undergrad modules in my 
[UTas](http://www.utas.edu.au/computing-information-systems) degree was 
Computer Security, and as well as the dreary, dry textbooks I've forgotten 
about, we read *The Cuckoo's Egg* by [Clifford 
Stoll](http://en.wikipedia.org/wiki/The_Cuckoo's_Egg). It's a fun read, and 
though the technical details are pretty dated now (it relates events from 
the 1980s), there's still a lot to learn &mdash; particularly about the value 
of applying the **Scientific Method** in your investigations, and of *keeping 
detailed notes*.

Cliff demonstrates that careful notes are valuable for at least these reasons:

 * To accurately record and recall what happened
 * Gather Data from experiments for detailed analysis
 * As evidence that a task was performed, or to support a hypothesis
 * As material to teach others

I took a lot of Cliff's advice to heart &mdash; he's a [genuine Doc 
Brown](http://www.ted.com/talks/clifford_stoll_on_everything?language=en) and 
this book was very inspiring.

I have been following Cliff's advice for about 20 years now and I
firmly believe this to be the most important practice I picked up
during my Uni career.

<<<INSERT PICTURE OF UNI NOTES>>>

Even if you don't keep your journal online (and there are
[good arguments to blog online](http://technicalblogging.com/why-every-professional-should-consider-blogging/)
as well), you should *definately* keep some record of your
explorations and experiments.  It is so useful to be able to come back
to a project after an extended break and pick up what you were
thinking because you left careful notes.  I like to record the
following in my notes

* the date and time (I have automatic keys for this)
* what are my goals?
* concerns? where am I stuck?
* a short plan for how to get unstuck
* hypotheses for trouble-shooting. What data do I need? How will I get
  those?
* outcome of experiments

Looking at these, they form the basis of what we are taught in High
School Science class about recording experiments, aren't they? I often
find that the discipline of just writing down these things is helpful
in my problem solving, so that I have some structure about how to
aproach the problem, rather than just bash my head against the wall.

It helps that I can type almost as fast as I think now. Back when I
kept hand-written notes it was a pain (literally) to write this much
detail down, but I did it even then because it was helpful, and with a
detailed map of where I had come and was going, I almost never got
lost.


**Rule 5**: Comments considered harmful
----
(embedded in code, as well as those on YouTube)

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

But keep Rule 0 in mind.

I've also mentioned YouTube here. That's because I'm beginning to
doubt the value of "Web 2.0" as it appears in YouTwitFace and blog
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



**Rule 7**: Test it. Test it Again
----


