<!--
.. title: 4-bit Rules of Computing, Part 4
.. slug: 4-bits-part4
.. date: 2018-03-23 21:25:22 UTC+11:00
.. tags: 4-bit-rules, tip, testing, code, TDD, experiments,debugging, bugs, engineering, perfection
.. category: 
.. link: 
.. description: Mike's 4-bit rules explained, part 4: testing, debugging
.. type: text
-->

Here is the fifth part of my [blog series](/tags/4-bit-rules.html) expanding on my
[4-bit rules of computing](/pg/4-bit-rules.html).

In this post: **rules 7, 8, and 9**; which discuss **testing and debugging**. They are all related in a way: having to do with making good-quality craft work. Because, as much as computer people like to *believe* that we're "engineers" or that this is "computer science", [we're not really](https://web.archive.org/web/20171221023913/https://www.theatlantic.com/technology/archive/2017/09/saving-the-world-from-code/540393/).  We're crafts people, in a profession that's still very young and finding its roots and methods in order to be consistently successful.

I'm definitely *not* trying to pretend I'm an "engineer". 
For real *rigour*, there is much more required than a few simple rules. But these are some realistic and humble rules in the area of testing that I aim to stick to.

<!-- TEASER_END -->

----

# **Rule 7**: Test it. Test it Again

Before you leap to conclusions, this Rule isn't about [Test-driven development](https://en.wikipedia.org/wiki/Test-driven_development) (TDD).  Indeed, this rule is more about *not leaping to conclusions!*

My highest scoring [Stack Overflow answer](https://stackoverflow.com/questions/1434779/maximum-java-heap-size-of-a-32-bit-jvm-on-a-64-bit-os/7019624#7019624) to date has an insightful comment attached to it:

>I like that you actually tested rather than made guesses.
>– Jim Hurne Aug 25 '11 at 18:01

The reason he likes it is clear: rather than basing my answer upon conjecture, perhaps backed up with some research and cited references; I made a tool to observe what the maximum memory allocation on 32-bit JVMs actually is, and _then_ I started to think about what it means, and predict what would happen.

That's the [Scientific Method](https://en.wikipedia.org/wiki/Scientific_method#History,_philosophy,_sociology) (well, *more-or-less*&hellip;)

So the Rule is: you won't actually *know* the outcome *until you test it*. 

## Test it Again?

I am really drawing attention to the inner cycle of the Scientific Method (the part where data are gathered, predictions made, hypothesis refined and then re-tested).

That's [Iterative Development](https://en.wikipedia.org/wiki/Iterative_and_incremental_development) (well, *more or less*&hellip;) ;-)

So what about TDD then? Well I'll admit I haven't done much in my own work, but the ideas about it appeal.  Certainly there is a big advantage to 

 * Demonstrate that your program works (at least for known a set of conditions)
 * Be able to confirm that it *still* works after you make a changes

Whether you should arrive at a "working" program by beginning with the test cases and hacking at the program until the tests pass, is really dependent upon the person writing the program, and also the kind of problem it solves.

I guess I should really [test TDD](https://web.archive.org/web/20180323114827/https://dzone.com/articles/why-developers-dont-use-tdd?edition=366226&utm_source=Zone%20Newsletter&utm_medium=email&utm_campaign=devops%202018-03-09) for myself and see how it goes for me!

----

# Rule 8: You can't proof-read *after* you hit Send

I am guilty of re-reading emails after I've sent them. Often when I do that I'll spot mistakes and wish in vain that I'd seen them earlier.

Of course, it's too late: I already sent it.

So the Rule is a caution to stop, re-read and *then* hit Send to post the email (or tweet/commit message/whatever).

It's also a reminder to stop obsessing over things after it's too late to change them!

----

# Rule 9: These aren't the bugs you're looking for — move along
(Pretty good is better than perfect)

No, I can't do Jedi Mind Tricks.  This Rule is a balance to Rule 8.

Often I get hung up in a kind of "analysis paralysis", so busy obsessing over the teeniest, tiniest details that I don't even get started. It's even what delayed me moving on with this blog series for so long!

So: don't get hung up, move on! Get started. Sure there'll be parts that are wrong, that's expected (Rule 1), but the important thing is to do *something* and make some progress.

It doesn't have to be perfect to still be pretty good.
