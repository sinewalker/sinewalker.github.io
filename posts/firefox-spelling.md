.. title: Firefox Spelling
.. slug: firefox-spelling
.. date: 2015-05-12 11:52:13 UTC+10:00
.. tags: 
.. category: 
.. link: 
.. description: Quick post about how I fixed spelling in firefox
.. type: text

I fixed my spelling problem in Firefox today:

**The symptom**: a *bajillion* variants of English and Spanish
dictionaries are installed/available, and Firefox would always select
Spannish (Cuba) on a restart -- then highlight mispelllings for me, in
Spanish.

**The problem**: My default spelling language is set to en_AU for
English (Australia), but this doesn't seem to be honoured on a
restart. I have to select it from the spelling checker Languages list.

**The fix**: I'm unsure *why*, but changing the Firefox setting
`spellchecker.dictionary_path` (in `about:config`) from
`/usr/share/myspell`, which is present on my openSUSE 13.2, to
`/usr/share/aspell`, which is not (I was thinking &mdash; incorrectly &mdash;
that I was setting the name of an external spell checker
*program*&hellip;) resolved this. Maybe Firefox was picking up system-wide
settings in *myspell*? Other programs seem to spell correctly
though&hellip; so it's a mystery to me.
