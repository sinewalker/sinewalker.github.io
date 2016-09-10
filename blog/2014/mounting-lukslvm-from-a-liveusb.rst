.. title: mounting-lukslvm-from-a-liveusb
.. slug: mounting-lukslvm-from-a-liveusb
.. date: 
.. tags: 
.. link: 
.. description: 
.. type: text
.. author: Mike Lockhart..
    .. title: Mounting LUKS/LVM from a LiveUSB
    .. slug: mounting-lukslvm-from-a-liveusb
    .. date: 2014-11-09 21:30:25 UTC+11:00
    .. tags: linux, LUKS, LVM, encryption
    .. link: 
    .. description: How do you mount an encrypted hard drive to recover
    backups in a LiveUSB system?
    .. type: text


After upgrading work's openSUSE laptop from 13.1 to 13.2 today it
would not unlock the LUKS-encrypted LVM, which is a problem since the
entire SSD is encrypted (except for /boot).  Bummer.

So, I had occasion to test my backup/recovery strategy and found that
I had a few issues (of course I did!)

.. TEASER_END

1 What happened?
----------------

One problem was: I have my work laptop backups stored to an external
USB hard drive, which is is also formatted with a LUKS encrypted
volume. Great, no problem, I just need to unlock the LUKS so I can
mount, right?  What's the password...?

Another was: my passwords are stored in a KeePass2 database, which I
have stored on a cloud service. Only: it turns out it's not been
sync'd for about 4 months because I changed the DB's location and
forgot to update the sync software, so the password for the hard drive
wasn't on the cloud. Where is it? Oh, right, it's on my broken laptop,
in an encripted LUKS/LVM which can't be unlocked since the upgrade.
Goody.

2 So, what to do...?
--------------------

The immediate task was to locate my recovery LiveUSB. Every good
hacker should have (at least) one of these. Mine's the openSUSE 13.1
Live Rescue image, which is spartan, but it does have everything you
need, including lvm/luks on it, and yast.  Yast it turns out didn't
help me much, I'm unsure why, but anyway, I got by with the command
line ;-)

3 Unlock LUKS volumes
---------------------

To mount a LUKS-encrypted drive you first need to unlock the LUKS
container:

.. code-block:: shell

    # cryptsetup luksOpen /dev/sdb1 myusb
    Enter passphrase for /dev/sdb1: 
    No key available with this passphrase.
    Enter passphrase for /dev/sdb1:

Ah, yes. Got to get that passphrase. Of course, being in KeePass2 it's
a random generated hex string that no human will ever remember (that is what
password database are for, after all)... Well, we'll come back to
this...

So, need to unlock the volume on the laptop...

.. code-block:: sh

    #cryptsetup luksOpen /dev/sda3 laptop
    Enter passphrase for /dev/sda3:

Okay, so it opened, great! (The problem after the upgrade was that it
wouldn't even get this far). Now I just need to mount the home
volume. It's part of an LVG...

4 Mount the LVG(s)
------------------

First, let's look at the logical volumes:

.. code-block:: sh

    #lvs
      LV   VG   Attr      LSize   Pool Origin Data%  Move Log Cpy%Sync Convert
      home lvg  -wi-ao--- 179.31g                                             
      root lvg  -wi-ao---  50.00g                                             
      swap lvg  -wi-ao---   8.00g 

That's right, I used a very simple/guessable naming
convention. Bravo. Okay, the passwords file is somewhere in 'home',
let's mount it

.. code-block:: sh

    # mount /dev/laptop/home /mnt
    # ls /mnt
    guest mjl

W00t! Alright, now I can grab that KeePass database, shove it on an SD
chip and then load it up in Keepass2Android on my smart phone (the
LiveUSB doesn't have any KeePass software... hmm, better do something
about that later).

.. code-block:: sh

    # mkdir /var/tmp/sdc
    # mount /dev/sdc1 /var/tmp/sdc
    # cp /mnt/home/mjl/keys/db.kdbx /var/tmp/sdc
    # umount /var/tmp/sdc

Awesome. Now I can open up the password database, and laboriously
transcribe that generated passphrase to unlock the backup drive, when
I need to

5 Long story shorter
--------------------

So in a nutshell (assuming you have your password stored *somewhere
you can get to* !), you can do this:

1. Boot to a LiveUSB

2. Start a Terminal, become root (on the Live system)

3. **tail -f /var/log/messages|grep Attached**

4. Plug in the backup drive, watch which device gets attached (look
   for a message like "2014-11-09T22:22:13.742555+11:00 milo kernel:
   [ 4678.150011] sd 7:0:0:0: *[sdb]* Attached SCSI disk" where
   *[sdb]* will be dependant on your devices, but that's the device
   you're looking for

5. unlock it **cryptsetup luksOpen /dev/sdb1 mybackup**

6. make a mount point if necessary:  **mkdir /recover**

7. If it's a raw partition, you can mount now **mount
   /dev/mapper/mybackup /recover**, otherwise continue to LVM

8. list the logical LVM volumes with **lvs**

9. pick a volume (e.g. "myvolume") and mount it

.. code-block:: sh

    # mount /dev/mapper/mybackup/myvolume /recover

Now you can navigate the volume and view/copy files.

6 Unmounting
------------

You need to first umount the volume, and then close the LUKS:

.. code-block:: sh

    # umount /recover
    # cryptsetup luksClose mybackup
