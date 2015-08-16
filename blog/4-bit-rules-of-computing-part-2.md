<!-- 
.. title: 4-bit Rules of Computing, Part 2
.. slug: 4-bit-rules-of-computing-part-2
.. date: 2015-07-22 21:15 UTC+10:00 
.. tags: 4-bit-rules, tips, comments, literate
.. category: lore
.. link: 
.. description: Mike's 4-bit rules explained, part 2
.. type: text
--> 

Here is the third part of my [blog series](/tags/4-bit-rules.html) expanding on my
[4-bit rules of computing](/pg/4-bit-rules.html).

In this installment:  Rules 5, on comments.  Rule 5 is a bit contentious and I've taken too long in writing my thoughts on it &mdash; which is probably telling. Nonetheless I still want to press ahead and get these words out.  I also wanted to include Rule 6 with this post, but I'm taking my own advice and breaking the post into two, because it really was getting quite long.

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

Well a few months ago, there was
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
logic or implementation*, this should be a sign to you that you want to
rethink your approach.

So now after thinking on this for a while and weighing it against my
upbringing, my own opinion about code comments is to **treat them in
the same vein that
[Edsger Dijkstra](http://en.wikipedia.org/wiki/Edsger_W._Dijkstra)
[treated `GOTO`](http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html)**:
*avoid it where you can*.  This is exactly in accordance with the advice
in **[Rule 3](/blog/4-bit-rules-of-computing-part-0)**, specifically
Rule 3.8: "&hellip;*practicality beats purity*".

Misuse of code comments
----

Many uses of code comments are the
[Wrong Thing](http://www.catb.org/jargon/html/W/Wrong-Thing.html)&trade;
and you should be doing something else instead:

* **Comments with** ***change history***: Use a `CHANGELOG` and/or revision control
  commit messages
* **Comments with** ***file metadata*** (file name, date, type, language,
  authors): these used to be handy for paper printouts, but these days
  this should be in source control meta info &mdash; do people still
  print their codes onto dead trees?
* **Boilerplate Comments with legal stuff**: unfortunately this is still a
  requirement in some distributed or Open Source code.
* **Comments that** ***restate what the code says in English***: Use descriptive names for things! To be fair, "the only real difficulties in programming are cache invalidation and naming things", but if some thought is put into the names of things, a comment is usually not required. Sometimes the act of writing the comment helps me to come up with names, and then I can remove the comment&hellip;
* **Comments that** ***explain long, complex subroutines***: *devide and conquer* &mdash; break it into parts that are each more simple to grasp
* **Comments for functions detailing** ***pre-conditions, post-conditions,
  parameters*** and so on: only if your language doesn't have **doc-comments**

All of this is just noise, and is not well maintained anyway. Lose it
where you can.

What's wrong with comments?
----

* *Code* is the single authoritative source of truth in a program!
* There is no way to ensure that code comments are correct at all
  times (they're not always updated with code changes, and they can't
  be covered by unit tests)
* Comments are written in human language which can be prone to
  misinterpretation
* Comments embedded in code *can actually be harmful* when doing
  polyglot meta-programming

What one should be doing instead is ***putting good intentions into
writing simple (or at least clear and explicit), readable code***.

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
and this is why" (although, I'm not sure that the *why* is clear. I
think that the child process must *start* with the DB connection
disconnected, not disconnect when it *exits* &mdash; so maybe this is actually *not* a good comment?)

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

An example I recently heard about where *comments actually were harmful*, was in polyglot programming a web front-end system.

To test some dynamic web pages, a colleague removed a suspicious HTML `div` that was embedded as part of an HTML snippet within a JSON blob, to be insterted into a page. He removed it by surrounding the `div` with HTML comments `<!-- ... -->`.  However, when the JSON gets parsed by JavaScript, the HTML snippet that was embedded causes a syntax error, because the HTML comment is not valid JavaScript and it broke the JSON encapsulation.

The resulting error was easy to find this time, but it *may* have caused a subtle flaw, or caused the code to not exercise the logic that was under investigation.

In general, commenting out code for troubleshooting *is* a pragmatic way to find the cause of a problem. In this situation though, it's better to backup the original (ideally with revision control if you can), and then *actually* remove bits to trouble-shoot, rather than comment them out.

```
// Sometimes, I believe the compiler ignores all my comments.
```

Well, yes, and sometimes *it does not*&hellip;

My own comment pet peeves:
----

* Comments inline that restate code in English, even when it's already clear and  simple: `maxFobs=10 // Set max number of Fobs to 10` (why!?)
* Comments that have nothing to do with what the code does (except
  when they are funny)
* or worse, Comments that mislead because they say what the code *used
  to do*, or what it *should be doing*, or is pseudo-code for *an idea
  that was not implemented*

<a href="https://plus.google.com/116269726157614459607/posts/263et4zQMh3">
  <img src="/pixels/dust/SoManyLies.jpg" width="50%" height="50%"/>
</a>

   Please don't do these things. At best, you're filling your code
   with noise, and doubling your maintenance debt (because you must
   now ensure that comments are still true after you change the code
   &mdash; see **Rule A**, and **Rule 2**).  At worst though, you're misleading
   readers, the equivalent of doing the old signpost vandalism prank.

Oh, and if you find yourself writing comments like this

```java
//MJL20150609 Increased size from 384, for ticket 23940129
int MaximumFobs = 512
```

Then you should feel naked running around without your source control
clothes on (but boy *do* I feel for you, if you have no source control
available &mdash; I've been there &hellip;)


The other hand
----

Now, **on the other hand, if you are unfortunate enough to be working
in a language that does not have Doc-Comments**, or **that is evil and
esoteric** (like assembly, bash scripts, JCL, or Perl), or **your
problem is very hairy** (numerical analysis, or some complicated logic
that really deserves a
[Literate Programming](http://www.literateprogramming.com/)
approach), well *then* I think *you* ***should*** *be using comments*
***liberally***.

But keep [Rule 0](/pg/4-bit-rules-part-0) and Rule 2 in mind.

----

(anti-)Social Web comments
----

I've also mentioned *YouTube* for this Rule. That's because **I'm
beginning to doubt the value of "Web 2.0" as it appears in
You/Twit/Face comments**. They are a great opportunity for engaging
with your audience and to facilitate feedback, but they are more
likely a vector for personal attack and flamage. I'm lucky to have not
been much of a victim of flame wars, but now that the Internet is
mainstream, it's become a real concern, especially for women. Look at Reddit.com. Yuck, who would want to associate with such low life forms?

For some things, **it may be safest not to comment when you don't
agree with someone online**. I know, I know, civil liberties etc.,
**but** you have to pick your battles with online lusers at least as
much as you do with children under ten.  *Google+* has the Mute function,
so we can be cowards and run away by just Muting a bully and then
ignoring them.

Rule 5, (web 2.0) comments considered harmful:
----

Grown-ups (should) know these things:

 1. You can't argue online. It's just impossible &mdash; there's probably even a postgrad paper that proves it. Yes *Axel-F* **was** written and published before *Crazy Frog*, but you'll never win that argument in YouTube, even with proof, and it's not worth winning it anyway
 1. Negative comments based on someone's culture, beliefs, gender, ethnicity, locality, sexuality, disability or appearance just reveal you to be a bigot
 1. Positive comments on the same are pretty creepy and may be perceived as offensive or condescending by the recipient *or other readers* &mdash; even if your intentions were good &mdash; so be careful
 1. When in doubt, don't comment
 
If you're *criticising someone's creative effort* or just spouting *your opinion* which is at variance to theirs: **Naff off! &mdash; Don't be a Dick[head]&trade;**. Because:

 1. Your negative criticism won't make a difference or win you an argument. It'll only make you look like the sort of person who isn't much fun to be around or to work with &mdash; and things you post in the Internet stay forever, affecting your future employment and social prospects
 1. Even "constructive criticism" is very difficult to pull off without coming across as a condescending high-brow git. It *may* be appreciated in rare cases, but usually not unsolicited or in a public forum. If you *really* think your constructive criticism is of real value, then *write the person directly*, don't spout in their comment box or in a group chat
 1. If you have an *opinion*, then *write about it in your* **own** *blog*, not as a comment to someone else's social system post, or someone else's blog. **It's usually good to have a different opinion, and you should stand behind your opinion, if it has merit**. But standing behind it means *you* make the effort to write about it; *you* get it out and noticed; you *don't* just troll other people and their efforts.  A comment like "I feel your opinion here is wrong, and I've posted a follow-up on my blog: http://thoughtful-bunnies.blogspot.com/green-carrots-are-not-good" is much better than launching into a flame war at the end of someone's blog post, plus you'll likely get more people visiting your blog&hellip;
 
 Thanks if you read this far.
 


