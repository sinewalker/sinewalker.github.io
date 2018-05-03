<!--
.. title: Pasword databases: from KeePassX to Unix password store
.. slug: keepass-and-password-store
.. date: 2018-04-28 22:52:33 UTC+10:00
.. tags: passwords, pass, keepassx, password-store
.. category: 
.. link: 
.. description: 
.. type: text
-->

At the recomendation from someone at work, I checked out [pass](https://www.passwordstore.org/), "the standard Unix password manager".  It offers all the features I've been using from [KeePassX](https://en.wikipedia.org/wiki/KeePassX) for a few years now, only with much better syncronisation based upon git.

Pass is also integrated into browsers, editors, and even a few operating systems, so it's potentially a lot less clunky to use than how I was using KeePassX.

This post reviews my password management approaches to date and gives an overview of Pass.

<!-- TEASER_END -->
----

# Passwords are hard

Originally I used to just remember passwords for everything, like most people.  I soon found this doesn't scale past about 7 passwords or PINs. I had progressed past "use the same password everywhere" (dumb!), to "make it something based upon the website's domain" (still easily guessable and dumb), to "use a bookmarklet that crytographically generates the password from the URL and a passphrase" (uhm?), to "dvorcodes" (passwords with letter substitution based on the dvorak keyboard, better*ish*, but has it's own problems requiring me [to write](/blog/2008/08/15/project-dvorcode.html) an [encoder/decoder program](https://sourceforge.net/projects/dvorcode/) in Java).

These were all stop-gap measures. I have 196 actively used personal passwords, I kid you not! I sorted and counted them today. That is why…

## I need a password *database*

But I'm too cheap to pay for a service, and anyway I don't trust any service with my *passwords*. They are literally the keys to everything! That reminds me: however I store the passwords, it better be encrypted.

## I need a *password database* that *I control* and is protected with *strong cryptography*

By about 2009, I had settled on keeping an [Org-mode](http://orgmode.org/) file with passwords listed in it, [gpg-encrypted](https://www.masteringemacs.org/article/keeping-secrets-in-emacs-gnupg-auth-sources) on my PC.

Which was fine.

Except that I needed my PC with Emacs Org and GPG to retrieve my passwords. What if I don't have my PC with emacs and everything when I need a password?  Emacs org+gpg was not going to cut it.

## I need a *password database* that *I control*, protected with *strong cryptography* and available *in my pocket*

In 2014 I found out about KeePassX, for which there are several Android apps as well as Windows, Linux and Macintosh database editors.

That's what I've been using for the past 4 years.

# But… syncing is hard too

The only trouble with KeePassX is that syncing between a Mac/Windows, Linux and your Mobile phone has limited options (basically, with the [KeePassX Android app](https://play.google.com/store/apps/details?id=keepass2android.keepass2android&hl=en) you can use your own server via SSH/WebDAV/Owncloud, or by Dropbox, or Google Drive). I don't have my own online server.  The Dropbox Android client is *huge* and clunky, plus I don't like Dropbox the company. So I use Google Drive (with read-only access on Suse Linux via [KDE's GDrive](https://community.kde.org/KIO_GDrive) [KIO module](https://github.com/KDE/kio-gdrive)).

This was not optimal for Linux, or at work either with a company-restricted GSuite My Drive. I worked around that by sharing a Folder from my *personal* Google Drive to my work Google account, and storing the share in my work Drive.  But now, with Google [announcing the imminent death of Google Drive on Windows/Mac, replaced with Drive File Stream](https://gsuiteupdates.googleblog.com/2017/09/drive-file-stream-from-google.html)  — and *never* supporting Linux at all — I have been casting about for a new solution.

So this tip from a work colleague about **pass** is actually very timely!

## Why not just sync/share a KeePassX database with git?

Well, I *could* do that. Only, having all my passwords in one database file — which is opaque to git — means that whenever I add or change a single password, *the whole database is updated*. It makes resolving conflicts (caused even when changing different passwords on separate computers) pretty much impossible.

Git works better for passwords when each is in its own file.  That's where *pass* comes in.

# What is pass?

Pass is a Unix command-line utility to manage passwords, each stored in separate gpg-encrypted text files. It takes care of managing the files, searching, encrypting/decrypting, storing decrypted passwords in your OS clipboard and clearing up after, and moving/renaming/deleting passwords. Pass can generate new passwords, and supports git storange and pushing to/pulling from an online remote.  There are also a lot of third-party tools that can use your password store natively in browsers, desktop apps and mobile phones.

The possibility of having merge conflicts after syncing the password store with git is much less, because each password is in a separate encrypted file. It's only if I update the *same* password in two places that it could conflict, and then the solution is easy: just keep the newest password (because *it's a password* — the system that the password is for will always agree with the newest password).

Pass is a "Unix command-line utility" in the traditional "do one thing well" sense. The web site makes a point to call out it's Unix-ness. This is fine on my PCs/Mac because they are Unix systems: I always have one-key access to a Bash prompt.

On my *el-cheapo*-droid I will want a light-weight App, and [there is one](https://play.google.com/store/apps/details?id=com.zeapo.pwdstore) (well, a *pair* of apps is needed, but I'll get to that in my next post).

On *Windows* it might be difficult to install Pass. There is [Pass4Win](https://github.com/mbos/Pass4Win#readme) which might work, but it's abandoned by the author. I may be able to get by on Windows just with a phone in my pocket, or I might keep using KeePassX on Windows and manually export/import a subset of passwords between it and *Pass*. I only use Windows for games these days so that would be acceptable. If ever I do go back to using Windows for work, I'll have to look at that harder. [WSL](https://docs.microsoft.com/en-us/windows/wsl/about) may be an option.
