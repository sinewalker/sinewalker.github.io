<!--
.. title: 4-bit Rules of Computing, Part 3
.. slug: 4-bits-part3
.. date: 2018-02-28 07:44:51 UTC+11:00
.. tags: 4-bit-rules, tip, comments, literate, code
.. link: 
.. description: Mike's 4-bit rules explained, part 3: doc-comments
.. type: text
-->

Here is the forth part of my [blog series](/tags/4-bit-rules.html) expanding on my
[4-bit rules of computing](/pg/4-bit-rules.html).

>[Previously](/blog/2015/4-bit-rules-of-computing-part-2.html) in *Milosophical Me*: Mike was reflecting on Comments, both in source code and in social media, and had come to the conclusion that they are to be avoided, that they can be more harmful than helpful, and that source codes (and people) should be allowed to speak for them selves.

There is an exception to Rule 5 (*Rule 0* allows for this): **doc-comments**.   In this post I explore what they are, how they differ from regular comments, and how to use them to assist your fellow hackers.

<!-- TEASER_END -->

----

# **Rule 6**: Doc-comments are a Force for Good
(follows on from Rule 5 *Comments considered harmful*)


>You are in a maze of twisty little passages, all alike

Sometimes exploring code is like a text-adventure game.  The modules are like different rooms containing strange objects and it's not immediately clear what you should be doing next, or how to use the objects.

In a text-adventure game, you need to `LOOK` at your surroundings to get your bearings and see what objects are around; `TAKE` objects, and even `EXAMINE` them once they're in your hands to uncover their secrets.  Only then will you discover that the sword you just took has a powerful magical enscryption on it, for instance.

If the code you're exploring has *doc-comments*, then you can do the same thing: you can *look* at the module's description and an overview of classes and methods; or get the coding system to *describe* an object's properties and methods, how they should be called, what behavior to expect.

Most languages that have this facility call it [Docstrings](https://en.wikipedia.org/wiki/Docstring), which is the name LISP gave them, and (I think) where it originated.  I'm calling them "*doc-comments*" for two reasons:

 1. Java doesn't have docstrings, but instead has special *documentation comments*
 2. (More important) it balances Rule 5's caution against using comments at all

## What is a doc-comment?

Like regular comments, you use these to describe the code in a natural human language, let's say English (*Solo sé un poco de Español*).  Where doc-comments are different is, they have special features that are designed to be parsed by development tools to assist programmers directly, not just to be read by human eyes and ignored by compilers or interpreters.

Let's see how doc-comments address the problems I outlined with regular comments:

1. *Code is the single authoritative source of truth in a program!*  

    Doc-comments include supplemental information on the object being documented which, while not needed or used by a compiler or interpreter, are essential for tools that inspect code and help you to write it.

      * Add signposts for code-completion tools
      * Provide the description text for pop-up tool-tips, or to generate documentation
      * Specify expected values for parameters, not just the data type

1. *There is no way to ensure that code comments are correct at all
  times (they're not always updated with code changes, and they can't
  be covered by unit tests)*
  
    Some doc-comments *can include unit test cases*, ensuring that they must agree with the code they describe, or else the tests fail. By being in-line with the code they test, this increases the likelihood that both the code and the doc-comment will be *updated together*, especially if you follow some of the practices of Test-Driven Development.

    Other doc-comment systems have a feature similar to Java's *decoractors* which will automatically build "boilerplate" code such as Object-Oriented "getters" and "setters". All you have to do is decorate the object members that should be accessed in that way. This is in addition to pointing out to any human reader that such a member is meant to be accessed only through it's get/set methods.

1. Comments are written in human language which can be prone to
  misinterpretation
  
    This is still true of doc-comments.  Having a structure to the comment may reduce this risk, but not eliminate it.

1. Comments embedded in code *can actually be harmful* when doing
  polyglot meta-programming

    Doc-comments are not syntactictly able to be embedded within the code like a regular comment can be (to mark out a suspicious section while debugging). They are usually strings, and have a special location within the code that must be adhered to (usually the beginning of a function or module), otherwise it's not a doc-comment.
  

## How do you use them

Doc-comments can be used in different ways, depending how the language designers built them.

### javadoc: Inside-out Litterate Programming

In Java, the doc-comments' main purpose is to be the source-code for API documentation.  The goal is to be able to generate an API reference from the same code that implements the API.  It's mostly successful.  This is not strictly *Litterate Programming* because it doesn't weave instructive narative with the code, but it does at least formalise the system of commenting that I was taught in high-school:

```java
/**
 * Returns an Image object that can then be painted on the screen. 
 * The url argument must specify an absolute {@link URL}. The name
 * argument is a specifier that is relative to the url argument. 
 * <p>
 * This method always returns immediately, whether or not the 
 * image exists. When this applet attempts to draw the image on
 * the screen, the data will be loaded. The graphics primitives 
 * that draw the image will incrementally paint on the screen. 
 *
 * @param  url  an absolute URL giving the base location of the image
 * @param  name the location of the image, relative to the url argument
 * @return      the image at the specified URL
 * @see         Image
 */
 public Image getImage(URL url, String name) {
        try {
            return getImage(new URL(url, name));
        } catch (MalformedURLException e) {
            return null;
        }
 }
```

Here, the tags `@param` and `@return` are like the old [Structured Programming](https://en.wikipedia.org/wiki/Structured_programming)-style ["Pre-condition"/"Post-condition"](https://en.wikipedia.org/wiki/Predicate_transformer_semantics) comments that I would put in my Pascal school assignments.

The above code example comes from [Oracle's Javadoc style guide](http://www.oracle.com/technetwork/java/javase/tech/index-137868.html). It also shows an embedded HTML `<p>` tag which the `javadoc` tool can use when generating an HTML API document.

I call this **"inside-out" Litterate Programming** because, rather than have an English narative with code dispursed through it like Knuth's [WEB](https://en.wikipedia.org/wiki/WEB) system of *TeX*, or Jupyter Notebooks; *javadoc* is more about havinging *a code library with English dispursed through it*. The focus of Litterate Programming is on the *humans reading the document*, and you "weave" the document to generate the code from it; whereas in javadoc the focus is on the *computer as the audience of the code*, and you use the `javadoc` tool to generate the document (so it's like "tangling").

### iPython and emacs environments: explore the environment interactively

(These are just examples; there are other systems that do this too, like R and Mathematica. I'm not trying to have an exhaustive comparison here, it's not the point I'm making.)

In Emacs, you can type `M-x describe-function` (`C-h f`) and enter the name of a function. You'll get a description like this one for `describe-function` itself:

```
describe-function is an interactive autoloaded compiled Lisp function in ‘help-fns.el’.

It is bound to s-SPC h d f, C-h f, <f1> f, <help> f, <menu-bar> <help-menu>
<describe> <describe-function>.

(describe-function FUNCTION)

Display the full documentation of FUNCTION (a symbol).
When called from lisp, FUNCTION may also be a function object.

[back]
```

There is a lot going on here besides the doc-comment, but those words at the bottom actually do come from the function's code in `help-fns.el`:

```elisp
(defun describe-function (function)
  "Display the full documentation of FUNCTION (a symbol).
When called from lisp, FUNCTION may also be a function object."
  (interactive
   (let* ((fn (function-called-at-point))
          (enable-recursive-minibuffers t)
          (val (completing-read
                (if fn
                    (format "Describe function (default %s): " fn)
                  "Describe function: ")
⋮
```



I truncated the listing here, but [the whole function](https://github.com/emacs-mirror/emacs/blob/emacs-25/lisp/help-fns.el#L52) is illustrative because it does *also* include *ordinary comments*. Note though that they are exceptional because they describe difficult logic:

```elisp
⋮
    (save-excursion
      (with-help-window (help-buffer)
        (prin1 function)
        ;; Use " is " instead of a colon so that
        ;; it is easier to get out the function name using forward-sexp.
        (princ " is ")
⋮
```

IPython and Jupyter have an online inspection help system that provides something very similar, also driven by Python's *docstrings*.

# Wait, did you say you can test doc-comments?

Python's [doctest](https://pymotw.com/2/doctest/) module (*Python Module of the Month*, covers Python2; or see the [Python 3 documentation](https://docs.python.org/3/library/doctest.html#module-doctest)) provides a way to include your module's test cases within the code. This is a super facility that is well worth your time exploring.  See my [Rule 7](/pg/4-bit-rules.html).

# Regular strings as doc-comments

I have rolled my own doc-comments system in at least one language that doesn't have them:  **Bash**, which is the default Unix shell for GNU systems and many BSD ones also.

It is documented on my [dotfiles project wiki on GitHub](https://github.com/sinewalker/dotfiles/wiki/Self-documenting-functions) as well as within [the code itself](https://github.com/sinewalker/dotfiles/blob/1.0/source/10_meta.sh), of course!  Take a look at it. 

With this, and provided that the functions include a `$FUNCDESC` doc-comment that followes a few [simple conventions](https://github.com/sinewalker/dotfiles/wiki/Self-documenting-functions#coding-conventions), you can interactively explore my various esoteric shell functions.

Let's explore the system itself:

## Describing and Listing shell functions

```

[mjl@milo:~/hax]
[08:14]$ describe describe
Fn: describe in /Users/mjl/.dotfiles/source/10_meta.sh line 65
    'Describe a function and show where it is defined.
[mjl@milo:~/hax]
[08:14]$
```

My [describe](https://github.com/sinewalker/dotfiles/blob/1.0/source/10_meta.sh#L65) function tells you *where a shell function comes from, and a quick summary description from the doc-comment*. It's a bit like emacs' `describe-function`. 

What if we want to see all of the doumentation, and the code? Well, we *could* look in that file, or we can just `list` the function, as it has been loaded into memory:

```sh

[mjl@milo:~/hax]
[08:14]$ list describe
Fn: describe in /Users/mjl/.dotfiles/source/10_meta.sh line 65
    Describe a function and show where it is defined.
describe ()
{
    local FUNCDESC='Describe a function and show where it is defined.

Prints information about the specified function including the first line of the
$FUNCDESC declaration from the function definition, and where the function is
defined.

This function requires shopt -s extdebug to show file and line details.';
    if [[ -z "${1}" ]]; then
        usage "${FUNCNAME} <function>" ${FUNCDESC};
        error "Must supply a function to describe.";
        return 1;
    fi;
    local toggled=0;
    shopt extdebug > /dev/null || shopt -s extdebug && toggled=1;
    declare -F "${1}" | awk '{print "Fn: " $1 " in " $3 " line " $2}';
    type -a "${1}" | awk -F = '/FUNCDESC/{print "    "$2;exit}' | fold -s -w ${COLUMNS};
    [[ $toggled == 1 ]] && shopt -u extdebug
}
[mjl@milo:~/hax]
[08:14]$
```

Because the doc-comment is actually stored as an *environment variable*, it is included in this listing, whereas normal shell comments are not shown by Bash's `type` builtin function (the comments are ignored when the file is `source`d).

The `describe` function above just prints the first line of the code that matches the pattern `FUNCDESC`. To see the whole function instead, use [list](https://github.com/sinewalker/dotfiles/blob/1.0/source/10_meta.sh#L90) like above.  Listing `list` is left as an exercise for the reader.

The same `$FUNCDESC` variable is also referenced in the call to my `usage` function, to show how to use the function when you make an error. Here it is in action:

```

[mjl@milo:~]
[09:46]$ describe
Usage: describe <function>
Describe a function and show where it is defined. Prints information about the
specified function including the first line of the $FUNCDESC declaration from
the function definition, and where the function is defined. This function
requires shopt -s extdebug to show file and line details.
Must supply a function to describe.
[mjl@milo:~]
[09:46]$
```

## LOOKing around

You can list *all* the current Bash functions with [functions](https://github.com/sinewalker/dotfiles/blob/1.0/source/10_meta.sh#L41):

```

[mjl@milo:~/hax]
[08:19]$ functions
activate
analyse-web
backout
backup
buz
check-tls
check_help
cleanup
cpmod
⋮
```
(truncated for brevity &mdash; I have 85 interactive shell functions on my Mac, from various locations)

# *Use the Source, Luke*

So I hope this illustrates the value of *good doc-comments*.  With an interactive system that supports them, like Emacs, iPython/Jupyter and my own Bash meta-fuctions, they can be a really great tool that helps coders to explore and experiment with a codebase.

It's just like playng `ADVENT`, and like the game, good doc-comments foster in me a sense of *adventure* and *exploration* which makes coding with strange new codebases something *fun* instead of a hideous nightmare.

Commenting and documenting your code is traditionally looked at as a tiresome chore that is never complete.  Who knows, with this frame of mind, it might even encourage hackers to write their own doc-comments as a sort-of mini-adventure?

***This*** would be a *Force for Good*.
