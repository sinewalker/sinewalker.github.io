<!--
.. title: Converting latin-1 To utf-8 with Python
.. slug: latin1-to-utf8
.. date: 2018-07-21 23:09:46 UTC+10:00
.. tags: python, character-encoding, codec, code, unicode, utf-8, iso-8859-1, jargon
.. category: 
.. link: 
.. description: Converting ISO-8859-1 ("latin1") to Unicode/utf8
.. type: text
-->

Tonight I finally converted all the Glossary pages in my mirror of the [Jargon File](http://catb.org/~esr/jargon) into Unicode (utf-8 encoding) so that they will transmit and display properly from GitHub Pages (or any other modern web server).  It was a fairly trivial thing to do in the end, but I am likely to need to repeat this for other things at work, so I'm blogging it.

The Jargon File was [converted into XML-Dockbook and Unicode](/jargon/news.html) for version 4.4.0, but ESR only converted the front- and back-matter, not the Glossary entries (i.e. the actual lexicon).  Those are still *latin-1* ([ISO-8859-1](https://en.wikipedia.org/wiki/ISO/IEC_8859-1)). And although the HTML rendition begins with the correct header declaring this:

```html
<?xml version="1.0" encoding="ISO-8859-1" standalone="no"?>
```

The pages are actually served from catb.org as [Unicode](https://en.wikipedia.org/wiki/Unicode) ([utf-8](https://en.wikipedia.org/wiki/UTF-8)).  For instance, compare [/dev/null on catb.org](http://www.catb.org/~esr/jargon/html/0/dev-null.html) with [my mirror of /dev/null](/jargon/html/0/dev-null.html).


<!-- TEASER_END -->

----

# UTF-8 does not equal Latin-1

It's a widely held misconception that utf-8 is a superset of ISO-8859-1.  It's not.  While *Unicode* itself *does* contain a [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)),  *all* of the upper 128 character bit-patterns of ISO-8859-1 have *different meaning in utf-8*, and there are many legitimate ISO-8859-1 characters that are *illegal utf-8 encoding byte sequences*.  This often confuses me because I'm used to 8-bit characters where the encoding is the same as the code-point:  `A` is `0x41` and means *A*;  `ÿ` is `0xFF` (in latin-1) and means *&yuml;*. With Unicode, the code-points and their encodings are *not* the same, there are multiple byte-stream encodings for Unicode, and utf-8 is just one of them.

Despite the *8* in it's name, utf-8 is not 8-bit.  It's a *potentially-multi-byte* encoding for Unicode, and it's *at least 8 bits*.  It just happens to share *half* of the 8-bit space with ISO-8859-1 (which shares the same half with ASCII), and so for English the same characters have the same 8-bit encodings.  *Most* Western-European languages it can be encoded in utf-8 with between 8 and 16-bits as well, and some require 21-bits (so 3 bytes or 4 bytes for utf-8's codec scheme, but only for rare characters).

This is why utf-8 is so popular online:

 * most web sites are in Western-European languages
 * most of these Latin-based characters can be encoded with 8 bits per character, many with up to 16-bits
 * the first 128 characters are the same bit-patterns as 7-bit [ASCII](https://en.wikipedia.org/wiki/UTF-16), the original byte stream for the APRANET and the Internet

If you look at Japanese or Chinese sites, they prefer [utf-16](https://en.wikipedia.org/wiki/UTF-16) because this encoding is more efficient for those Unicode blocks: the most common Chinese characters will fit in a 2-byte encoding in utf-16, whereas the same code-points in utf-8 typically need 3 or 4 bytes.

## Why ISO-8859-1 “breaks” in utf-8

Because utf-8 is a multi-byte encoding, it reserves some bit patterns for encoding that more than one byte is involved in the current code-point for a character.  The last code-point in 8-bit utf-8 is actually `0x7F`: the most-significant-bit is reserved to indicate multi-byte.  So all of the legitimate ISO-8859-1 8-bit bytes result in *different* Unicode characters, and some are *illegal utf-8 byte sequences*.

That's why you can't just take an ISO-8859-1 byte stream (or any other ISO-8859 code page, or the Windows one) and interpret it as utf-8. It only works if the bytes from the stream are in the 7-bit (ASCII) range.

# Fixing the Jargon File

When I mirrored the Jargon File back in October 2015, I asked [HTTrack](https://www.httrack.com) to encode as UTF-8, thinking this would fix it.  It didn't really succeed, all it did was to add its own encoding header:

```html
<!-- Mirrored from www.catb.org/~esr/jargon/html/A/ABEND.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 26 Oct 2015 13:15:16 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=utf-8" /><!-- /Added by HTTrack -->
```

The bytes within the page were still ISO-8859-1.  So I was having the same issue as catb.org: while the page declares ISO, the web server actually sends utf-8; and now the HTTrack insertion adds its own `content` to the confusion.

Fixing the Jargon file [properly](/jargon/mirroring.html) will involve actually going into the [Docbook sources](/jargon/jargsrc.tar.gz) and ESRs makefiles and correcting it there.  I'm not going to do that: it's too much effort to recover software that understands [DocBook](http://docbook.sourceforge.net/) XML [1.62](https://sourceforge.net/projects/docbook/files/OldFiles/) still and can do a lossless conversion.  That'll be a "someday" project probably (it's been **15 years** since ESR updated the Jargon File himself, and it's dated, and bordering on becoming [bogus](/jargon/jargtxt.html) because of a lack of currency, so it's a low-priority *maybe* project).  Instead what I've done is just run a filter over all the HTML output of the Jargon, since that is what is actually being served most of the time.

Here's the python code, `transcode.py`:

```python
#!/usr/bin/env python3
import sys
import os
import codecs

sourceFileName = sys.argv[1]
targetFileName = sys.argv[1]+'.tmp'

BLOCKSIZE = 1048576 # or some other, desired size in bytes
with codecs.open(sourceFileName, "r", "ISO-8859-1") as sourceFile:
    with codecs.open(targetFileName, "w", "utf-8") as targetFile:
        while True:
            contents = sourceFile.read(BLOCKSIZE)
            if not contents:
                break
            targetFile.write(contents.replace('ISO-8859-1','utf-8'))

os.rename(targetFileName,sourceFileName)
```

It's a [clone and hack](/jargon/html/C/clone-and-hack-coding.html), based upon [this answer to an SO question](https://stackoverflow.com/a/191403/776953) on converting files to utf-8 in Python.  All I changed was:

 * take the `sourceFileName` from the script argument (without checking if there *is* an argument)
 * set a temporary `targetFileName` based on the source file
 * [hardcoded](/jargon/html/H/hardcoded.html) the source encoding
 * and replaced "`ISO-8859-1`" in the output file with "`utf-8`" so that the headers match the content (very näive: just looks for the exact string match, so any mention of "ISO-8859-1" within the body will also be replaced)
 * Finally, replace the original source file with the temporary target file, by intentionally [clobber](http://milosophical.me/jargon/html/C/clobber.html)ing the original with `os.rename()`.

I then ran this code in a shell loop like so:

```sh
[src][mjl@milo:~/hax/blog/milosophical.me/files/jargon/html]
[22:56](nikola)β for Y in 0 [A-Z]; do
  echo $Y
  for X in $Y/*.html; do
    echo $X
    ~/hax/transcode.py $X
  done
done
```

And there we have it: all the Jargon lexicon is now encoded as utf-8 and declared as such in the headers. Here's [/dev/null](/jargon/html/0/dev-null.html):

```html
<?xml version="1.0" encoding="utf-8" standalone="no"?>
<html xmlns="http://www.w3.org/1999/xhtml">
<!-- Mirrored from www.catb.org/~esr/jargon/html/0/dev-null.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 26 Oct 2015 13:16:51 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=utf-8" /><!-- /Added by HTTrack -->
<head><title>/dev/null</title><link rel="stylesheet" href="../../jargon.css" type="text/css"/><meta name="generator" content="DocBook XSL Stylesheets V1.61.0"/><link rel="home" href="../index.html" title="The Jargon File"/><link rel="up" href="../0.html" title="0"/><link rel="previous" href="TM.html" title="(TM)"/><link rel="next" href="me.html" title="/me"/></head><body><div class="navheader"><table width="100%" summary="Navigation header"><tr><th colspan="3" align="center">/dev/null</th></tr><tr><td width="20%" align="left"><a accesskey="p" href="TM.html">Prev</a> </td><th width="60%" align="center">0</th><td width="20%" align="right"> <a accesskey="n" href="me.html">Next</a></td></tr></table><hr/></div><dt><a id="dev-null"/><dt xmlns="" id="dev-null"><b>/dev/null</b>: <span xmlns="http://www.w3.org/1999/xhtml" class="pronunciation">/dev·nuhl/</span>, <span xmlns="http://www.w3.org/1999/xhtml" class="grammar">n.</span></dt></dt><dd><p> [from the Unix null device, used as a data sink] A notional
   &#8216;black hole&#8217; in any information space being discussed, used, or
   referred to.  A controversial posting, for example, might end &#8220;<span class="quote">Kudos
   to rasputin@kremlin.org, flames to /dev/null</span>&#8221;.  See 
   <a href="../B/bit-bucket.html"><i class="glossterm">bit bucket</i></a>.</p></dd><div class="navfooter"><hr/><table width="100%" summary="Navigation footer"><tr><td width="40%" align="left"><a accesskey="p" href="TM.html">Prev</a> </td><td width="20%" align="center"><a accesskey="u" href="../0.html">Up</a></td><td width="40%" align="right"> <a accesskey="n" href="me.html">Next</a></td></tr><tr><td width="40%" align="left" valign="top">(TM) </td><td width="20%" align="center"><a accesskey="h" href="../index.html">Home</a></td><td width="40%" align="right" valign="top"> /me</td></tr></table></div></body>
<!-- Mirrored from www.catb.org/~esr/jargon/html/0/dev-null.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 26 Oct 2015 13:16:51 GMT -->
</html>
```

Happy [Hacking](/jargon/html/H/hack.html).
