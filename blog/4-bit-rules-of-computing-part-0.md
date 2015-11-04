<!-- 
.. title: 4-bit Rules of Computing, Part 0
.. slug: 4-bit-rules-of-computing-part-0
.. date: 2015-05-24 20:41:35 UTC+10:00
.. tags: 4-bit-rules, tip
.. category: blog
.. link: 
.. description: Mike's 4-bit rules explained, part 0
.. type: text
-->

A little while ago, I published my
[4-bit rules of computing](/pg/4-bit-rules.html) and I promised to
blog about them. So here is my first instalment in a series to
explain these simple rules, a bit about why I like these over others,
and my own take on this wisdom (since it isn't mine).

In this instalment:  Rules 0 to 3 (the first 2 bits).

<!-- TEASER_END -->

**Rule 0**: All rules are broken
----

Okay I'll admit first up: this *is* a cover-your-butt rule, but I
think it also serves to remind me that *one shouldn't slave to rules
for their own sake*: they are a guide only.  Some rules are made to be
broken too &mdash; relational databases should be 3rd Normal Form, for
instance (not always).

Speaking of rules that you should not follow blindly, check out [this
presentation on YouTube](www.youtube.com/watch?v=wf-BqAjZb8M) by
Raymond Hettinge, about why Python PEP 8 is not always helpful, and how
one should think beyond just mechanically conforming to its
requirements. This distils pretty much what I mean by Rule 0. There's
lots about PEP 8 that's great, but following it to the detriment of
gorillas is a broken approach.

I agree that you should not break rules for special cases, but some
rules are more useful as you learn things and can be safely discarded
when you know what you're doing.

**Rule 1**: The First Law: Nothing works First time
----
— Peter Lukes, *Amstrad Computer User magazine*, Issue 32, September 1987

I don't have the magazine article any more to verify the citation, but
I believe the quote was something along the following lines:

> So, you type your program in, save it, run it and it doesn't work (Lukes'
> first law of computing: nothing works first time). Now what? &hellip;

I remember who wrote the article because Peter Lukes' articles in
*ACU* were a big inspiration in my early computing years.  I fondly
recall learning about recursion (using CPC Locomotive BASIC, which
does not have functions, or a stack&hellip;) and other enlightening
ways to think about computer programming. To this day, I still initial
my code comments in a similar manner to his `LKS870915`, (although I
use 4-digit years, at least since the Y2K jazz).

Anyway, besides the fun play on words, this rule reminds me to
*relax*, step back and reflect that computing is non trivial.

There are those who like to boast about their programs compiling on
the first try (but do they *work*?) and others who "test in
production", but I at least, am human. Most likely you are too, and
this is good.

**Rule 2**: Don't Repeat Yourself
----
(tip: computers are *good* at that&hellip;)

The DRY Principle is pretty fundamental, and I believe most people
come to this conclusion themselves independently. For me, it was when
I started to program on the BBC Micro in high school, using BBC BASIC
(which, unlike the Locomotive BASIC, *does* have functions and also
named procedures), and I started to make utility functions for my
code. I also started to write programs using line-number blocks so
that utility functions could be `CHAIN MERGE`d (CPC) or `*LOAD`ed
(BBC) from different `.BAS` files without clobbering each other, and I
could start to collect a *library* of commonly used routines **and
only write them once** (kids today, with Python modules and name
spaces don't know how good they have it).

In a nut-shell,
[DRY](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself) boils down
to:

* write and reuse code routines
* store constant values in variables (or constants) rather than
  repeating the same number all over
* store values in *one* well-known place only

A **corollary** to DRY is that *computers are good* at repeating
themselves. Whenever you have to perform a task repeatedly, think
about automating it. I start to think about it after I've done
something three times.

Don't repeat yourself, make the computer do it.


** Rule 3**: `python <(echo import this)`
----
([Python](https://www.python.org/about/gettingstarted/) [PEP 20](https://www.python.org/dev/peps/pep-0020/))

I'm surprised to learn that PEP 20 was only published in 2004, and not
earlier. Anyway, there is much wisdom in these
19([+1](https://programmers.stackexchange.com/questions/69955/what-is-python-20th-and-final-guideline))
aphorisms, which is why they make it so high up on my personal list.

I think these aphorisms highlight that *the hardest part of computers
is actually people* and the Zen of Python is to put people before
computers.

The nice thing about these is that they are really easy to review even
when you're offline (so long as you have a Python installed in your
computer &mdash; and *everyone*
[SHOULD](https://www.ietf.org/rfc/rfc2119.txt) have Python installed
&hellip;).

