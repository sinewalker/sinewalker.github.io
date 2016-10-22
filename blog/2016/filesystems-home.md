<!-- 
.. title: Choosing Filesystems and devices for home server
.. slug: filesystems-home
.. date: 2016-10-22 11:55:50 UTC+11:00
.. tags: linux, btrfs, ext4fs, xfs, LVM, cloud, ssd, tiered storage
.. category: 
.. link: 
.. description: Filesystem considerations as I prepare to re-partition my home machine for an upgrade
.. type: text
-->

With the release of [openSUSE Leap 42.2](https://en.opensuse.org/Portal:42.2) just 25 days away, I'm considering to move to it, from my current [openSUSE 13.2](https://en.opensuse.org/Portal:13.2) *Harlequin*. I had skipped [Leap 42.1](https://en.opensuse.org/Portal:42.1) *Malachite* not for any technical issues with Leap itself, but because I've been pretty tied up learning about Mac OS for work, and because I've been very happy with *Harlequin* anyway.  But it'll reach end of life in Q1 2017 so it's time to upgrade, and I will go to the newest Leap release when it's out. The rolling release *Tumbleweed* is still not an option for me: not when I have an NVidia GPU and also want to play with CUDA and run VirtualBox VMs.

When I moved house back in 2013, I made a number of rushed decisions and among those was to accept the default filesystem suggestion from Harlequin's YaST installer:  use **btrfs** for the `/root` volume, and **XFS** for `/home`.  I also put both of these into LVM volumes on the computer's 128G SSD, with about 40G for `/root`, 8G for `swap` and the rest for `/home` thinking "It's LVM, so I can resize the volumes later if this doesn't work out." .... Well, yes, you *can* resize LVM volumes, but the filesystems contained within behave differently. It turned out that I wanted to grow `/root` by taking away some space from `/home`, but I hit a snag:  XFS filesystems can't be shrunk, only grown.  Bummer.

This time around I will take the opportunity of the upgrade to reformat my `/home` volume, but the questions are:

 * Which filesystems to choose from?
 * Which filesystem for `/home` is best?
 * Where to put `/home`?

 Should I have my home on my fast, but pokey SSD, or should I move it to a slow(er) but expansive HDD? Come to think of it, what about tiered storage in general? (SSD, HDD, "cloud", backups, archives). How should I manage these volumes in a non-intrusive way?

 So here are my thoughts and plans.

 <!--TEASER_END -->

 ----

## Choosing a `/home` filesystem


The [openSUSE 13.2 Portal](https://en.opensuse.org/Portal:13.2) mentions a switch to using "the tried and tested XFS" for `/home` but not *why*.  There's [speculation on Redit](https://www.reddit.com/r/openSUSE/comments/3dambq/why_btrfs_for_but_xfs_for_home/) (for what that's worth) that SUSE made this choice because using btrfs in `/home` is not that great if you're storing a database, or a VM, or something that doesn't play well with a COW filesystem. I found that running snapper on `/home` was taking up quite a bit of space on 13.1 until I turned it off too.

But then, why use XFS and not ext4fs?

[RedHat switched from ext3/4 to XFS for RHEL 7](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Storage_Administration_Guide/ch06s09.html), so there may be technical reasons I don't understand (fragmentation, preallocation, perhaps performance?)  Maybe a similar decision was made for SLE?  Anyway, the biggest down-side for me personally is that you can't shrink an XFS filesystem, only grow it. And to do that you must take the filesystem offline.

So: I'm probably going against the experts here, but I think I *won't* use XFS again, simply because I want/need the ability to grow *and shrink* volumes.  I also understand the ext tools better than the xfs ones.

### What about butter?

Well, yes, I suppose btrfs is able to optimise for SSD if I place `/home` there, so it could be useful.  So long as I turn off COW, and don't run snapshots on it. Seems a bit of a hassle, plus I'm turning off many of btrfs' features. I think this is why SUSE decided not to use it in home, and I agree with that.

### So then, ext4fs?

I *think* so?

 * It's a journaled filesystem, not a COW
 * It can be grown *and* shrunk. It can even be grown while online.
 * It's simple, I don't have to tweak settings
 * Its limitations don't impact my uses (I actually can't find very conclusive arguments that any of the three filesystems ext4fs, XFS or btrfs is better than another in terms of limitations, performance or stability, at least not for a home PC)

## Choosing the storage medium for `/home`

On my home PC, I have a choice of where I could store the `/home` volume:

 * On an SSD (Solid-state device: flash memory)
 * On a SATA drive (traditional hard disc)

The pros and cons are pretty straight forward: SSD is fast, but SATA is bigger (and still *pretty darn fast*).

When I bought the SSD I was thinking "gee whiz wow, I should use this thing as much as I can!".  Now with some experience, I think that the choice I make should balance the devices' abilities with the requirements I have for a `/home` volume, which in my case actually favours size over speed for the most part.  That means: **use SATA**.

## Storage Tiers

What I've been doing is a sort-of *ad-hoc* [tiered storage](https://en.wikipedia.org/wiki/Hierarchical_storage_management#Tiered_storage) approach:

 * `/home` was (comparatively) small, but fast because it's on an SSD. The system would boot and load a desktop without needing to spool up the hard drive at all.

 * I have a big hard drive with a partition for user data mounted at `/data/usr`. In there went large data sets (video, photos, audio, databases and so on...), both shared data in `/data/usr/pub` and individual/"private" data in `/data/usr/${USER}`

 * In my home directory, I symlinked:  `~/data -> /data/usr/${USER}` and `~/public -> /data/usr/pub`

 * I symlink: `~/vms -> /data/vms` for virtual machine images (a separate disc lv)

 * I also "sync to the cloud" at `~/MEGA`

I'm fairly happy with the arrangement, except that I have to think before I save: "oh, this is a big file, I better put it under `~/data`".  Occasionally I'll forget to and then end up shuffling data off the SSD to the SATA when the SSD fills, or when I discover something I didn't think about (Downloads, or a program that stores huge datasets in `~/.blackhole`), so I'm starting to think maybe I should actually think about my tiered storage approach, rather than just be *ad-hoc* and have to keep moving stuff around, risking loss and making backups....

Since I've decided to make `/home` be the hard drive now, then I shouldn't need to shift files around as often.  Instead I can use the SSD as a "memory" tier for data access that's *speed critical*; that can be mounted at `/data/mem`.

My tiered storage approach is now like this:

 * `/home` is a large lv on a *pretty fast* SATA disc drive
     * personal / "private" files just go into home like normal
     * there are still symlinks from `${HOME}` to other places, for exceptions. See below.

 * `/data/pub` is a large lv on SATA disc for shared data
     * the size of current `/data/pub` will be reduced a bit and given to `/home`
     * the filesystems `/data/home` and `/data/pub` will both be formatted **ext4fs** so I can adjust the balance of their sizes
     * there's no longer a need for `/data/usr`: give that to `/home` too

 * `/data/vms` is a large lv on SATA for virtual machines
     * It will be formatted as **btrfs** with subvolumes for COW or non-COW depending on the virtualisation technology (Docker can use btrfs for host-native COW, VirtualBox works better on a journaled filesystem since it does it's own COW within its virtual disc image files)

 * `/data/mem` is a (comparatively) small but fast lv on the SSD (the old home volume, repurposed)
     * the filesystem for `/data/mem`  will be **btrfs**
     * private subvolumes within, for users:  `/data/mem/${USER}` (can turn on/off btrfs features for these)

 * If the SSD is not fast enough, I can still make and mount a [RAM drive](https://en.wikipedia.org/wiki/RAM_drive) for super-duper fast access to temporary things, if I want to (with 32GB RAM, I've certainly got the space!): e.g. a SQLite database, so long as I copy it out if it's not so temporary...

 * Backups are written to a secondary (removable) SATA disc drive.

 * Archives get burnt to DVD-Rs for offline storage

### Cloud drives


Cloud drives are interesting: they provide automatic sync and backup, but they're fairly small (50G is considered large) and the sync is slow because it goes over encrypted internet links.  However local editing is as fast as the device you've synced to.  I use two cloud drive providers:

 * Dropbox (syncs to `~/Dropbox`): for syncing stuff with my Android devices. It's small and I'm not a fan of the Board members
 * [MEGA.nz](http://mega.nz) (syncs to `~/MEGA`): my main cloud drive. Ten times larger and more secure, but it doesn't do hot sync to Android: you have to "download" files to the phone, so it's no good for automatic sharing of KeePass password databases for instance

I use my cloud drives for data that I want to automatically share. Mostly it's in MEGA but I use Dropbox where I must.

I have a symlink: `~/net -> MEGA` for the stuff that I keep on the Net.


## Exceptions: new structure for `$HOME`

Remember [Rule 0](/blog/2015/4-bit-rules-of-computing-part-0.html)?  Not everything I keep on my PC belongs in my `${HOME}` of course. For the exceptions I like to use symlinks, because it makes it easy to find everything:

  * `~/pub -> /data/pub` for shared/public data sets (e.g. photo albums, calibre library, music and video)
  * `~/vms -> /data/vms` which is a separate lv just for virtual machines, but having the link makes configuration simpler
  * `~/mem -> /data/mem/${USER}` for private data sets on the fast memory storage
  * `~/tmp -> /data/mem/${USER]/tmp}` so that temporary files are still fast

Actually the structure of my Home directory is evolving and deserves its own post.
