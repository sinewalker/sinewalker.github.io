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

Code comments are something I've been a big believer in for years &mdash;
then I entered the world of "professional programmers" and learnt about
the horrors of bad comments, which can be worse than no comments. But,
*I want to believe*; so I still use comments quite a bit, despite
there being a nagging feeling that there is something wrong about
them, and that there has to be a better way&hellip;

<br/>

Well recently, there was
[this thought-provoking post](http://simpleprogrammer.com/2015/04/13/why-comments-are-stupid-a-real-example/)
on the [Simple Programmer](http://simpleprogrammer.com) blog, which
certainly [provoked me](https://xkcd.com/386/) to begin with.  It goes
against everything I've been taught and trained to believe.  Looking
at the feedback for it, it's clear I'm not alone.  Nearly every
reaction I've had when discussing this line of thought in face-to-face
with other coders has been the same too: "The smeg? No way!"

But after I calmed down and *read John's post properly*, I came
around, mostly (see **Rule 6**)&hellip;.

While I'm not convinced that John successfully demonstrates his point,
I do follow his reasoning, and I agree with his *principle* that
**source codes should be speaking for themselves, whenever they can**;
that if you are resorting to using embedded comments to *explain the
logic or implementation*, this should be a sign that you want to
rethink your approach. This is exactly in accordance with the advice
in **[Rule 3](/posts/4-bit-rules-of-computing-part-0)**, specifically
Rule 3.8: "&hellip;*practicality beats purity*".

So now after thinking on this for a while and weighing it against my
upbringing, my own opinion about code comments is to **treat them in
the same vein that
[Edsger Dijkstra](http://en.wikipedia.org/wiki/Edsger_W._Dijkstra)
[treated `GOTO`](http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html)**:
*avoid it where you can*, because many uses of code comments are the
[Wrong Thing](http://www.catb.org/jargon/html/W/Wrong-Thing.html)&trade;
and you should be doing something else instead:

* Comments with change history: Use a CHANGE LOG and/or revision control
  commit messages
* Comments with file metadata (file name, date, type, language,
  authors): these used to be handy for paper printouts, but these days
  this should be in source control meta info &mdash; do people still
  print their codes onto dead trees?
* Boilerplate Comments with legal stuff: unfortunately this is still a
  requirement in some distributed or Open Source code.
* Comments for functions details pre-conditions, post-conditions,
  parameters: only if your language doesn't have **doc-comments**

All of this is just noise, and is not well maintained anyway. Lose it
where you can.

What's wrong with comments?
----

* *Code* is the single authoritative source of truth in a program!
* There is no way to ensure that code comments are correct at all
  times (they're not always updated with code changes, and they can't
  be covered by unit tests).
* Comments are written in human language which can be prone to
  misinterpretation.
* Comments embeded in code *can actually be harmful* when doing
  polyglot meta-programming

What one should be doing instead is putting good intentions into
writing simple (or at least clear and explicit), readable code.

Some examples
----

Here's what I'm told is an example of a *good* comment:

```php
    $pid = $this->fork();
      if (!$pid) {
        // reconnect because child disconnects DB when it exits
        $this->_reconnectDB();
```

In this case, the comment explains something that it may not be
apparent you have to do.

The comment says "yes, you read that right, we reconnect after a fork,
and this is why" (although, I'm not sure that the *why* fully correct. I
think that the child process must *start* with the DB connection
disconnected &mdash; so maybe this is actually *not* a good comment?)

Here is a *bad* comment:

```php
    this.client_jobs = _.filter(data.result,
        /* Filter to only the jobs we want to see */
        function(obj, i)
            {return (obj.hours_remaining > 0.08 /* ~5 min */) &&
                    (PACKS_TO_SHOW.indexOf(obj.type) != -1) &&
                    (obj.ready_to_audit == 'N');})
```
                                                
Actually, this second example contains a good comment, and a bad
comment

* The first comment should be replaced with a named function instead of
being anonymous.  Rule 2 (DRY and all that &hellip;)
* The second comment "~5 min" is good*-ish*, though `5/60` would be about
as clear, or a perhaps make a function to convert `minutes-to-hours(5)`

A harmful comment
----

(embedded HTML comment in an HTML blob that gets injected into JSON, which
is then interpreted by JavaScript, causing syntax errors because the
HTML comment is not a JavaScript comment)

My own comment pet peeves:
----

* Comments inline that translate code into English (why?)
* Comments that have nothing to do with what the code does (except
  when they are funny)
* or worse, Comments that mislead because they say what the code *used
  to do*, or what it *should be doing*, or is pseudocode for *an idea
  that was not implemented*

<a href="https://plus.google.com/116269726157614459607/posts/263et4zQMh3">
  <img src="/pixels/dust/SoManyLies.jpg" width="50%" height="50%"/>
</a>

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
clothes on (but boy *do* I feel for you, if you have no source control
available &mdash; I've been there &hellip;)

Okay, ranting over.

Now, **on the other hand, if you are unfortunate enough to be working
in a language that does not have Doc-Comments**, or **that is evil and
esoteric** (like assembly, bash scripts, JCL, or Perl), or **your
problem is very hairy** (numerical analysis, or some complicated logic
that really deserves a
[Litterate Programming](http://www.literateprogramming.com/)
approach), well *then* I think *you* ***should*** *be using comments*
***liberally***.

But keep [Rule 0](/pg/4-bit-rules-part-0) in mind.

And of course, everyone loves funny comments, used sparingly:

* `// hack for IE browser (assuming that IE is a browser)`
* `// TODO make this work`
* `// Abandon hope, all ye who enter here`

(anti-)Social Web comments
----

I've also mentioned *YouTube* for this Rule. That's because **I'm
beginning to doubt the value of "Web 2.0" as it appears in
You/Twit/Face comments**. They are a great opportunity for engaging
with your audience and to facilitate feedback, but they are more
likely a vector for personal attack and flamage. I'm lucky to have not
been much of a victim of flame wars, but now that the Internet is
mainstream, it's become a real concern, especially for women.

For some things, **it may be safest not to comment when you don't
agree with something online**. I know, I know, civil liberties etc.,
**but** you have to pick your battles with online lusers at least as
much as you do with children under 10.  Google+ has the Mute function,
so we can be cowards and run away by just Muting a bully and then
ignoring them: Rule 5, comments considered harmful &hellip;.


----

**Rule 6**: but Doc-Comments are a Force for Good
----

Doc-Comments are the language-supported documentation strings that can
optionally be added to function definitions. Examples are LISP
documentation strings, Javadoc strings, and Python's docstrings. They
appear in many languages besides these.

These really are a Force for Good. Nearly every argument that John
Sonmez has about code comments can be refuted for doc-comments:

* Some of them work to refine the function definition, or to assist
  the compiler (some languages use code decorators, or "pragma"s for
  this instead of doc comments)
* They can contain code that is tested: an executable test case, or an
  example of how to call the function that is itself tested so you can
  tell when it goes out of sync with your function

Beware though:

* They are still prone to the human-language and maintenance problems 

I could fill this post with advice on how to write good, maintainable
doc-comments, but I think my skill in that area is still
evolving. What I will point out is why/how they are a Force for Good.

<<<>>>
What to write in comments: pre/post conditions, assumptions, inputs,
outputs
Incorporating these with tests and examples in the comment
Balance
Getters/Setters (doc-comments considered harmful)
links/references to Rust tests in comments and Python doctests
Doc-comments vs Literate Programming?
<<<>>>
