<!-- 
.. title: Bonjour Raspberry Pi
.. slug: bonjour-raspi
.. date: 2017-06-15 23:19:40 UTC+10:00
.. tags: RaspberryPi, avahi, hack, DNS, mDNS
.. category: 
.. link: 
.. description: Adding mDNS to a Raspbian image
.. type: text
-->

In preparation for some robotics I've dug out my [Raspberry Pi 2 B](https://www.raspberrypi.org/products/raspberry-pi-2-model-b/) and I'm reacquainting myself with it.  Tonight's goal: Boot up an old [Raspbian](https://www.raspbian.org/) *Squeeze* SD card and get the Pi to identify on the LAN with a domain-name -- rather than having to learn it's IP address -- using [avahi](http://www.avahi.org/) (AKA [Bonjour](https://developer.apple.com/bonjour/) or *zero-conf* mDNS networking).

<!-- TEASER_END -->

I went with the Squeeze image I have from 2015 because it was already installed -- to install Jesse past first-boot I'd have to hook up a TV/keyboard/mouse and my home lab is drk and cold tonight.

I had to do just a couple of things

 * Install *Avahi-Daemon* and enable it on boot
 * Tell it to ignore the Apple gear in my house
 * Reset the *hostname* on my image to something less generic than `raspberrypi` since there could be more than one at the [Huon Robotics](http://www.mrelliott.info/huonbots/) Lab.

## Intall Avahi-Daemon

```
$ sudo apt-get update #it's been two years, so the repo DB is out of date
$ sudo apt-get install avahi-daemon
```

## Tell Avahi to ignore the Apples

Edit `/etc/default/avahi-daemon` and set `AVAHI_DAEMON_DETECT_LOCAL=0`

## Enable avahi-daemon on boot

I'm unsure if this is enabled after you install it.  In Raspbian/Debian the daemons are enabled [Unix System V "runlevels"](https://www.debian.org/doc/manuals/debian-reference/ch03.en.html) style, using links to rc-files.  These can be managed in a friendly way with a tool called [sysv-rc-conf](https://packages.debian.org/wheezy/sysv-rc-conf).  This gives you a text-mode screen with a list of daemons and the runlevels they are enabled for.

```
$ sudo apt-get install sysv-conf-tool
$ sudo sysv-conf-tool
```

Make sure `avahi-daemon` is enabled (has X's) for run-levels **3**, **4** and **5** (the multi-user/network run-levels).



## Set hostname

I went with "squeeze-pi" because I have no imagination.

Edit `/etc/hostname` and change `raspberrypi` to `squeeze-pi`

Edit `/etc/hosts` and add `squeeze-pi` to the list of names for `127.0.0.1` -- I still want the old name to resolve.

## reboot

I am now  able to SSH to `pi@squeeze-pi.local` on the LAN, no need to figure out the IP address of the Pi.


