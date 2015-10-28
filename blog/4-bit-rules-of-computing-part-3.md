<!-- 
.. title: 4-bit Rules of Computing, Part 3
.. slug: 4-bit-rules-of-computing-part-3
.. date: 2015-07-22 22:17 UTC+10:00 
.. tags: draft, 4-bit-rules, tips, comments, literate
.. category: lore
.. link: 
.. description: Mike's 4-bit rules explained, part 3
.. type: text
--> 

Here is the fourth part of my [blog series](/tags/4-bit-rules.html) expanding on 
my
[4-bit rules of computing](/pg/4-bit-rules.html).

In this installment:  **Rule 6, on doc-comments**, which follows up [Rule 
5](/blog/4-bit-rules-of-computing-part-2.html).

Doc-Comments are the language-supported documentation strings that can
optionally be added to function definitions and in some languages to variables. 
Examples are LISP documentation strings, Javadoc strings, and Python's docstrings. They
appear in many languages besides these.



<!-- TEASER_END -->

**Rule 6**: but Doc-Comments are a Force for Good
----

Doc-Comments really are a Force for Good. Nearly every argument that John
Sonmez has about code comments can be refuted for doc-comments:

* Some of them work to refine the function definition, or to assist
  the compiler (some languages use code decorators, or "pragma"s for
  this instead of doc comments)
* They can contain code that is tested: an executable test case, or an
  example of how to call the function that is itself tested so you can
  tell when it goes out of sync with your function

Beware though:

* They are still prone to the human-language vagueness
* They still represent more maintenance dept

I could fill this post with advice on how to write good, maintainable
doc-comments, but I think my skill in that area is still
evolving. What I will point out is why/how they are a Force for Good.

What to write in comments:
----

pre/post conditions, assumptions, inputs,
outputs

Incorporating these with tests and examples in the comment
----


Balance
----

Emacs
----

The "extensible, customizable, self-documenting real-time display editor" uses 
docstrings extensively in the LISP code that makes up most of the editor. It 
uses conventions within the docstrings to assist in generating a hypertext 
interactive online help

 * A customisation variable example. In Emacs, knowing the true name of a 
variable or function really does give you some power (in the ancient Jewish 
sense):
 
```lisp
(defcustom confirm-nonexistent-file-or-buffer `after-completion
  "Whether confirmation is requested before visiting a new file or buffer.
If nil, confirmation is not requested.
If the value is `after-completion', confirmation is only
 requested if the user called `minibuffer-complete' right before
 `minibuffer-complete-and-exit'.
Any other non-nil value means to request confirmation.

This affects commands like `switch-to-buffer' and `find-file'."
  :group 'find-file
  :version "23.1"
  :type '(choice (const :tag "After completion" after-completion)
		 (const :tag "Never" nil)
		 (other :tag "Always" t)))

```

Produces this interactive help (the u̲n̲i̲c̲o̲d̲e̲-̲u̲n̲d̲e̲r̲l̲i̲n̲e̲d̲ text 
here is actually a hyperlink in Emacs to the documentation for the function 
mentioned within the quotes):


```text
confirm-nonexistent-file-or-buffer is a variable defined in `f̲i̲l̲e̲s̲.̲e̲l'.
Its value is after-completion

Documentation:
Whether confirmation is requested before visiting a new file or buffer.
If nil, confirmation is not requested.
If the value is `a̲f̲t̲e̲r̲-̲c̲o̲m̲p̲l̲e̲t̲i̲o̲n', confirmation is only
 requested if the user called `m̲i̲n̲i̲b̲u̲f̲f̲e̲r̲-̲c̲o̲m̲p̲l̲e̲t̲e' right 
before
 `m̲i̲n̲i̲b̲u̲f̲f̲e̲r̲-̲c̲o̲m̲p̲l̲e̲t̲e̲-̲a̲n̲d̲-̲e̲x̲i̲t'.
Any other non-nil value means to request confirmation.

This affects commands like `s̲w̲i̲t̲c̲h̲-̲t̲o̲-̲b̲u̲f̲f̲e̲r' and 
`f̲i̲n̲d̲-̲f̲i̲l̲e'.

You can c̲u̲s̲t̲o̲m̲i̲z̲e̲ this variable.

This variable was introduced, or its default value was changed, in
version 23.1 of Emacs.
```

Because the documentation is right inline with the code, Emacs' interactive help 
is very complete, and well maintaned. The `:group` and `:version` symbols are 
used by the documentation system to produce the advice in the help about the 
customisation group and the Emacs version when this variable was added.

 * An example of a an interactive function:
 
```lisp
(defun find-file-read-only-other-window (filename &optional wildcards)
  "Edit file FILENAME in another window but don't allow changes.
Like \\[find-file-other-window], but marks buffer as read-only.
Use \\[read-only-mode] to permit editing."
  (interactive
   (find-file-read-args "Find file read-only other window: "
                        (confirm-nonexistent-file-or-buffer)))
  (find-file--read-only #'find-file-other-window filename wildcards))
```

Here, the `\\[function-name]` is replaced with the key binding for that 
function, and produces this interactive help:

```text
find-file-read-only is an interactive compiled Lisp function in 
`f̲i̲l̲e̲s̲.̲e̲l'.

It is bound to C-x C-r.

(find-file-read-only FILENAME &optional WILDCARDS)

Edit file FILENAME but don't allow changes.
Like C-x C-f, but marks buffer as read-only.
Use C-x C-q to permit editing.
```



Getters/Setters (doc-comments considered harmful)
----

I'll make an exception for commenting getter and setter functions with 
docstrings. They really *don't* add any value to your code: everyone knows what 
they do: they encapsulate a classes properties. They should really be generated 
for you *automatically* (and I think that's the trend now, at least in newer 
Javas, by decorating the properties?) You *should* document the properties 
though, like Emacs custom variables&hellip;.

links/references to Rust tests in comments and Python doctests
----

Doc-comments vs Literate Programming?
----
