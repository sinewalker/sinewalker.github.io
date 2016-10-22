<!-- 
.. title: Organising my digital stuff
.. slug: home-dir-maintenance
.. date: 2016-10-22 18:24:54 UTC+11:00
.. tags: tips, organisation, draft
.. category: 
.. link: 
.. description: 
.. type: text
-->


blah blah...
<!--TEASER_END -->
----

mention messy workshop and pic.


## My Home directory

While I describe my home, lets list the other directories. These all live in the `/home` volume:

### Fully named directories

Free Desktop-inspired directories. They all start with a capital letter and are spelled out in full, not abbreviated. They are lie the familiar ones you see in User Folders of Windows and Mac OS.

 * `Audio`: sounds (as distinct from music)
 * `Desktop`:  Not used a lot now. This is the Freedesktop desktop folder
 * `Documents`: Again, Free Deskktop (also Windows and Mac OS) location for "documents"
 * `Downloads`: default download location.  It should get periodically cleaned...
 * `Links`: for desktop shortcuts (KDE `.desktop` files) to other places
 * `Movies`: Not used a lot. This is for motion pictures, as distinct from video in general
 * `Music`: music (as distinct from audio, which is not music)
 * `Pictures`: picture files
 * `Projects`: for project directories (many will be `git`/`hg` repositories)
 * `Public`: contains a link to `~/pub` and another to `html -> /data/srv/html/${USER}`
 * `Video`: video files (not movies, e.g. generated animations and such)

 * `public_html -> /data/srv/html/${USER}`: this is a SUSE thing to automatically make web pages with Apache I think.

### 3-letter nubbles

These are more pithy named directories that are quick to type and more friendly to my geek sensibilities

 * `bak`: backups
 * `bin`: binaries (small programs/scripts)
 * `buz -> Audio/buz`: system sounds and other effects.
 * `fun`: games and/or game saves (e.g. Minecraft)
 * `hax`: quick-and-dirty hacking space (throw-away data/scripts)
 * `key`: encryption key files (gpg, ssh and so on)
 * `lib`: library (private code modules, or ones not managed by a packaging system)
 * `mem -> /data/mem/${USER}`: fast storage
 * `org -> MEGA/org`: organiser files (Emacs Org Mode)
 * `pub -> /data/pub`: shared files
 * `ram`: mount point for a RAM drive
 * `src`: source (untarred source code, not retrieved from a revision control system)
 * `tmp -> /data/mem/${USER}/tmp`:  temporary files
 * `vms -> /data/vms` virtual machine storage

There are also symlinks used as short names for the Fully named directories:

 * `doc -> Documents`
 * `pix -> Pictures`
 * `prj -> Projects`'
 * `vid -> Video`

There's also `net -> MEGA` for my main cloud drive
