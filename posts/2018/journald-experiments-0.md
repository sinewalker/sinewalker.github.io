<!--
.. title: Journald experiments - Testing systemd's logger: speed and buffering
.. slug: journald-experiments-0
.. date: 2018-07-14 21:32:16 UTC+10:00
.. tags: journald,systemd,asciinema,experiments,code,python
.. category: 
.. link: 
.. description: 
.. type: text
-->

I've been having good natured arguments at work about whether it's the *End of the World* that we are at last switching away from *Scientific Linux 6* and it's [System V](https://en.wikipedia.org/wiki/UNIX_System_V) style [init](https://en.wikipedia.org/wiki/Init) scripts, to *CentOS 7*, which uses [systemd](https://freedesktop.org/wiki/Software/systemd/). 

My own opinion is that *systemd is pretty [cuspy](/jargon/html/C/cuspy.html)*.  It's not perfect, but nor is it some great hulking monolithic monster come to destroy the Unix Way in the Linux world.  It offers many worthwhile improvements and I've enjoyed using it in openSUSE for years now. I look forward to switching away from the hair-ball of *wet* SysV init scripts with clumsy precedent semantics and manual service recovery.

Now, I don't want to throw my hat into the ring on the pro's and con's of systemd having replaced the start-up infrastructure (and *a lot* of other systems besides) on Linux-based operating systems.  Enough has been said already on that front, by many more experienced than I, and further argument is pointless:  whichever camp you're in, you won't be convinced of the other sides point of view by now.

However there is *one* argument against systemd that I'm not so sure about: [journald](http://0pointer.de/blog/projects/journal-submit.html) and it's past issues:

 * **alleged buffering of logs**, making diagnostics and debugging on time-critical services difficult or impossible
 * **binary log files** which can be corrupted, and then not useful thereafter (because they're binary)
 * **volatile storage**, so that your logs are gone when you want them the most: after an unplanned reboot
 
I'll be spending a few days experimenting with `journald` in these areas, to see if it's as bad now as it was five years ago when [concerns like these were being raised](https://bbs.archlinux.org/viewtopic.php?id=159090).

In this post I want to look at the `journald` daemon / `journalctl` log viewer a bit, from the point of view of **buffering output**, whether and where it could be occurring, and what the implications might be as a web sysop.

> *This is a medium-long post, with about 23 minutes of terminal output recordings (in text, using [asciinema](https://ascinnema.org)) and is about 2⅓MB to download. It's also about half-an-hour's read on top of that.*

<!-- TEASER_END -->

----

# `journald` and `journalctl`

The [journald service](https://www.freedesktop.org/software/systemd/man/systemd-journald.service.html) is the systemd component responsible for writing system logs. It replaces traditional rotated `syslog` text files `/var/log/messages`, `/var/log/secure`, `/var/log/syslog` and so on with a structured *Journal* stored in compressed, binary files.

There are two main components to this logging system:

 1. `systemd-journald.service` which is the daemon that accepts logging information from other services or programs, either through it's [API](https://www.freedesktop.org/software/systemd/man/sd_journal_print.html), or by intercepting the *stdout* and *stderr* streams from a service (daemon)

 1. `journalctl` which is the *user-space* tool provided by systemd to parse the binary logs into various formats
 
Together these write the Journal and read it. You can also write directly to the Journal from a shell script using [systemd-cat](https://www.freedesktop.org/software/systemd/man/systemd-cat.html). 

Instead of `grep`ing/`awk`ing and `tail`ing the `/var/log/messages` file (or `gunzip`ping one or more of the rotated ones), you use `journalctl` to view the Journal.

This tool has [many options](https://www.freedesktop.org/software/systemd/man/journalctl.html) which replace the traditional Unix text file utilities to filter and display Journal entries.  Yes it's quite the monolith — but then so are `openssl` and `git`. The output of `journalctl` can be plain text suitable for a traditional Unix pipeline, if necessary.

## Trouble with the Journal?

The best argument we had at work against systemd was around this system of Journal logging and some troubles we had streaming the Journal back to a terminal. It was argued that not only has systemd re-invented the wheel (true) but the Journal is very slow and laggy, and potentially buffered. We had an instance where system troubleshooting was made very difficult during an overnight backup run on one occasion: the service was supposedly logging what was going on, but operators saw no updates from `journalctl`! There were *long* delays between starting a backup and *any mention* of it in the Journal.  "If only those people at Red Hat hadn't swallowed the systemd Kool-Aid…."

I hadn't come across this issue in my home system before, but then it's a home system, not a production server.  So I Googled it and found a few interesting Stack Exchange questions:

 * [journalctl --follow isn't advancing](https://serverfault.com/questions/913707/journalctl-follow-isnt-advancing)
 * [View unbuffered log output from journalctl](https://serverfault.com/questions/832691/view-unbuffered-log-output-from-journalctl)
 * [systemd python service buffers journalctl output even with -u](https://serverfault.com/questions/909192/systemd-python-service-buffers-journalctl-output-even-with-u)
 * [How do I properly redirect stdout/stderr from a systemd service on Raspbian?](https://stackoverflow.com/questions/43602550/how-do-i-properly-redirect-stdout-stderr-from-a-systemd-service-on-raspbian)
 
The common theme here seems to be: running systemd services which are Python scripts can indeed have problems. Our backup system at work involves an in-house wrapper around [restic](https://restic.net/), and *our wrapper is written in Python*.  Maybe we're seeing this same issue?

The Stack Exchange questioners ask if it's something to do with systemd's Journal, and the answerers seem adamant that it's actually Python doing this. The answers seem typical of systemd proponents too:  blame the user or any other tool except for systemd.  Let's be clear here:  I *really like* systemd, but I agree with its detractors about the general attitude of proponents being combative and arrogant.

I decided this week-end I would test the Journal's performance with and without Python, and Python with and without the Journal, and buffering, and see if I could come to the bottom of this issue.

# Experiments with `journalctl`

The questions to answer are:

 * How does the systemd Journal perform when streaming service output?
 * Is it any different if Python is involved or not?
 * Is Python's buffering of output at fault, or is there something inherently wrong with the Journal?
 
# Apparatus

Here are instructions for creating the test apparatus:

## Test system


For these experiments, I used the current *openSUSE Tumbleweed 20180709* with **systemd version 237 release 8.1**, built on June 20th. I set systemd to use *persitent* storage rather than the default *volatile*, because I am assuming this is what most sysops would want on a server, and because it *may* introduce some I/O latency which would be absent on a memory-only logger, which would be an important impact to the tests.

I chose *Tumbleweed* in a *VirtualBox* virtual machine so that I could be sure to have a recent-but-stable systemd to test, and because I know this OS very well.  The test VM had a single virtual x86_64 CPU, 2GiB of RAM, storage was virtual SATA on a default VDI disc image with dynamic allocation to 16GiB. 

I still haven't worked out Vagrant, so here I'll document the ***manual** steps* for creating the test system:

 1. Download the x86-64 version of the [Tumblweed Network Image (85MB) ISO](https://software.opensuse.org/distributions/tumbleweed) (it's actually 122MB now)
 2. Create a new VirtualBox VM
     * Type: Linux
     * Version: openSUSE (64-bit)
     * Memory: 2048MiB
     * Hard disk: default, sized to 16GiB, dynamically allocated
     * Settings:
         * Network: **Bridged Adapter**<br/>
           (so that I can `scp` scripts and recordings between the test VM and the host)
 3. Install *Tumbelweed* in the VM
     * Start the VM
     * Select the Tumblweed ISO as boot image for the virtual CD-ROM
     * In the installer, **select the server profile**, leave the rest as default
 4. After install, Login as `root`
 5. Make persistent storage for the Journal (it will be picked up automatically):<br/>
    `mkdir /var/log/journal`
 6. Enable SSH in the guest:<br/>
    `systemctl enable sshd`<br/>
    `systemctl start sshd`
 7. Allow SSH through the firewall:<br/>
    `firewall-cmd --zone=public --permanent --add-service=ssh`
 8. Retrieve the Bridged address and note it down for after:<br/>
    `ip addr|grep global`
 9. I hate vi. Let's use a text editor from the 1990s:<br/>
    `zypper in -y mc`<br/>
    `echo "EDITOR=mcedit" >> /root/.bashrc # set EDITOR for the root user`<br/>
    `sed -i '/mcedit/s^#//g' /etc/skel/.bashrc #optional, sets for new users`
 10. Install [asciinema](https://asciinema.org) to record the actual test streaming sessions:<br/>
    `zypper in -y asciinema`

## ASCIIcasts

Since the point of these experiments is to see how fast (or slow) the output of `journalctl` can be, I wanted to record the sessions and then play them back to illustrate the speed.  For this I used [asciinema](https://asciinema.org), which records a terminal session as text, much like `script`, and then you can play the recordings back with a Javascript player in a browser.

So all the recordings on this page are 'asciicasts' rather than video.  Not only can you pause and rewind, but you can also scale them, or even select text and copy it.

<link rel="stylesheet" type="text/css" href="/scripts/vendor/asciinema-player.css"/>
<script src="/scripts/vendor/asciinema-player.js"/>

The asciicasts on this page are all pre-loaded in your browser so that any jittery output is as it was recorded and not attributable to your Internet bandwidth while the playback loads.

## Service scripts

Since I was testing the Journal's logging performance, I wrote a simple shell script to print the date 20 times per second. That's all that it does. This should be fast enough to see how the streaming is going, and doesn't actually do any taxing work for the VM, so there shouldn't be any resource contention going on.  I'm measuring purely the streaming.

I created a directory `/root/hax` in which to keep these service scripts:

`/root/hax/ticktock.sh`:

```bash
#!/bin/bash
while true; do
  date
  sleep 0.05
done
```

`/root/hax/ticktock.py`, the same exact logic, in Python:

```python
#!/usr/bin/env python
from time import sleep
from datetime import datetime
while True:
  print(datetime.now())
  sleep(0.05)
```

Both of these write to *stdout*.  It will be up to the Service manifest to direct that to different targets.

## Service manifests

The service manifests I installed as "system" services, rather than "user" services.

This is `/etc/systemd/system/tick-sh.service`:

```conf
[Unit]
Description=ticktock-sh

[Service]
ExecStart=/root/hax/ticktock.sh

#StandardOutput=file:/tmp/ticktock.log
#StandardError=inherit

[Install]
WantedBy=default.target
```

The `StandardOutput` and `StandardError` directives are commented out. I used them during later experiments to send the output to a file rather than to the Journal.  The `WantedBy` target may be a mistake, judging by the errors in the test results, but it's not an impact I think.


This is `/etc/systemd/system/tick-py.service`:

```conf
[Unit]
Description=ticktock-py

[Service]
ExecStart=/usr/bin/python -u /root/hax/ticktock.py
#ExecStart=/root/hax/ticktock.py

#StandardOutput=file:/tmp/ticktock.log
#StandardError=inherit

[Install]
WantedBy=default.target
```

For the Python `tick-py` service, I also have two `ExecStart` directives so that I could toggle unbuffered and buffered `python` calls.  This can be observed in the recordings.

After saving system service manifests, they are loaded into systemd by restarting the daemon: `systemctl daemon-reload`.  One may also edit an existing service and automatically reload using `systemctl edit «service» --full`.



# Experiment 0: tailing log output from a service

In this experiment I compared tailing the output of each service as it streams to the Journal, with streaming to a file.

Since Python's buffered output and unbuffered output is in question, I used `bash` as a comparison, working from the assumption that the output from `/usr/bin/date`, a GNU utility and ELF 64-bit executable, is not buffered in any special way. 

<asciinema-player
  src="/ascii/20180716/exp-0.cast"
  title="Experiment 0: bash vs python-unbuffered"
  cols="100"
  rows="37"
  theme="tango"
  start-at="55"
  preload>
</asciinema-player>
<center>Experiment 0: bash *vs* python (unbuffered) - 4:20</center><br/>

Points to note in this recording:

 * I first note that systemd is using *persistent* logging to an actual file, not *volatile* logging. This might impact performance, though I cannot see why you'd want volitile logging on a server — it would only be useful on embedded systems, or *maybe* desktops
 * The bash output streamed via `journalctl` at **01:04** is a bit jerky/choppy, not buttery smooth like you would expect when printing 20 times a second.
    + There must be some overhead in streaming to the Journal, processing, tagging for the service that's doing the writing, and then `journalctl` un-marshalling from the Journal to the terminal.
    + There are no breaks or pauses while it's running though
    + Perhaps `journalctl -f` only polls the Journal a few times a second?
 * It ran for about a minute I broke out of the tail.
 * The python output (unbuffered) begins at **03:08** in the recording. It looks about the same speed as the bash stream
 * I let the python service stream for about a minute before breaking out.  There were no pauses

This experiment shows that the streamed *stdout* from both a bash script and a python (unbuffered) script is about the same.  It's quite a bit slower than 20 lines per second (I estimate about 4 screen updates per second on the recording), but there are no pauses or gaps in the output.

The important observation from this first experiment is that there are no pauses or breaks in the output from `journalctl`, whether that input comes from bash (and the GNU `date` utility), or from python (so long as python's been told *not* to buffer its output).

The slow update rate does point to some kind of marshalling/unmarshalling going on between the service, the `systemd-journald` daemon storing binary logs and the `journalctl` utility reading them.  I suppose that would constitute some kind of “buffering”, though not the sort that makes the Journal unusable, even when writing output to the Journal at quite high frequency.

Also, the jerkiness in the recording is as I observed on the VM, not attributable to *asciinema* or the javascript player (later experiments will show streaming from a text file with is not jerky).


# Experiment 1: `journalctl -f` *vs* `tail -f /some/file` from `bash`

I decided to test streaming from bash directly to a file as well as through the Journal.  The first experiment showed slightly jerky output from `journalctl` with bash, I wanted to see if this would be better using `tail`.

<asciinema-player
  src="/ascii/20180716/exp-1.cast"
  title="Experiment 1: streaming bash via journald vs a text file"
  cols="100"
  rows="37"
  theme="tango"
  start-at="25"
  preload>
</asciinema-player>
<center>Experiment 1 - streaming bash via journald *vs* a text file - 4:27</center><br/>

 * At **00:32** I edited the `tick-sh.service` manifest and set it to  stream to a text file instead of the Journal, using the `StandardOut=` and `StandardError=` directives
 * After starting the service, a `journalctl -f` at **00:55** confirms no output in the Journal, just the log entry to say the service was started at 21:45:34
 * Starting at **01:15** in the recording I tailed the `/tmp/ticktock.log` file, and it's showing nice smooth updates in the recording. So this is faster than streaming out of the Journal via `journalctl -f`, by at least 5 times
 * I broke out of the tail at **02:22**, over a minute of streaming, no gaps or stutters
 * At **02:38** I again edited `tick-sh.service`, directing output back to the Journal by commenting out the `StandardOut=`/`StandardError=` lines
 * Streaming from `journalctl` begins at **03:05**, observe the screen updates, about 4 per second again, though if you pause the recording you can confirm that there are 20 lines output per second, so nothing is missed
 * I let the Journal stream continue until **04:08**, then stopped the service
 * The recording ends with a status report for the service, showing the last few log entries.  This is one of the nice features of systemd: it's ability to show relevant and recent logs for a service, along with the service status.
 
 So when running a shell script as a service, the Journal doesn't seem to introduce any major difficulties in tailing service output.
 
 Granted, the updates while streaming are slower, but there are no gaps in the output shown.  While `tail` is faster, probably almost instant, it would be possible to miss output lines if they were written faster than the operating system can schedule `tail` to read the last line of the file. So I guess that is the trade-off.
 
 
# Experiment 2: `journalctl -f` *vs* `tail -f /some/file` from `python -u` (unbuffered)

This is a repeat of Experiment 1, using Python instead of bash.  Still using CPython's `-u` switch to specify not to buffer streaming output.

<asciinema-player
  src="/ascii/20180716/exp-2.cast"
  title="Experiment 2: streaming python (unbuffered) via journald vs a text file"
  cols="100"
  rows="37"
  theme="tango"
  start-at="27"
  preload>
</asciinema-player>
<center>Experiment 2 - streaming python (unbuffered) via journald *vs* a text file - 5:01</center><br/>


 * Begging at **00:33** I edited the `tick-py` service to stream to the same text file as in Experiment 1, by the same method
 * Tailing the file begins at **01:12**, and the `tail -f` performance from Python's output is just as fast as with `bash`/`date` in Experiment 1. Python includes fractions of a second in its output
 * I let the `tail` run for 77 seconds before breaking out at **2:29**.  No other pauses and no jitter.
 * At **02:48** I edited the `tick-py.service` manifest and set it back to stream to the Journal
 * Resumed streaming from `journalctl -f` at **03:17**, the output starts at `22:01:48`
 * I broke out of the stream at **04:29**. Output printed `22:03:00` (72 seconds, no pauses, no gaps, looked like the bash run)

So far in these experiments I am not seeing any issues with running a python script from systemd and streaming to the Journal.  I begin to believe the nay-sayers in those Stack Exchange questions: it really *isn't* systemd that is causing delays. What delays?

# Experiment 3: Python unbuffered *vs* buffered, with and without Journal

Well this *Journald buffer myth* is Busted, but let's force some delays in typical *Mythbusters* fashion.  According to [the Python reference for the `sys` module](https://docs.python.org/3/library/sys.html#sys.stdin):

>When interactive, `stdout` and `stderr` streams are line-buffered. Otherwise, they are block-buffered like regular text files. You can override this value with the `-u` command-line option.

That is why I used `/usr/bin/python -u` in the `ExecStart=` directive for `tick-py.service`; so that this would be overridden:

```conf
ExecStart=/usr/bin/python -u /root/hax/ticktock.py
#ExecStart=/root/hax/ticktock.py
```

If I swap to the other `ExecStart=` which just calls the script, relying on the shebang, then Python's block-buffering will come into effect:

```python
#!/usr/bin/env python
```

In this experiment I compare unbuffered and buffered output, first streaming through the Journal, and then tailing the file.

<asciinema-player
  src="/ascii/20180716/exp-3.cast"
  title="Experiment 3: streaming python: unbuffered vs buffered (to Journal and a text file)"
  cols="100"
  rows="37"
  theme="tango"
  start-at="34"
  preload>
</asciinema-player>
<center>Experiment 3 - streaming python: unbuffered  *vs* buffered (to Journal and a text file) - 9:47</center><br/>

 * Buffered streaming begins at **00:42** in the recording, streaming from `22:17:14`
 * I broke the stream at **01:46**, `22:18:18` (64 seconds).  Usual jerky stream but no pauses or breaks
 * At **02:00** I edited `tick-py.service` to swap `ExecStart=` directives. The next run would let python default to block-buffering the output
 * I confirmed at **02:27** that the service had been restarted. Note that systemd has logged the start time as `22:18:54` but there is no output from the script in the Journal yet
 * I began to tail the Journal at **02:33** in the recording. The tail shows output from `22:19:01` and then pauses for about 4 seconds before the next burst of output
 * The next output burst is at **02:45** in the recording, and again at **02:52** (about 6 seconds between each burst)
 * The Journal continues to update in burst about 6-7 seconds apart. Perhaps it takes this long for the script to fill a block of data when writing the date 20 times per second?
 * I broke the `journalctl` stream at **03:52** in the recording. The last listed output was `22:20:19`.  If you pause the recording during this minute of streaming, you will see that there are 20 records per second and nothing is missing from the Journal
 * At **04:02** I confirmed service status, and the Journal shows a final output timestamp of `22:20:26.969366`; then systemd logs that the service was stopping at 22:20:28.  Interestingly, the output from the script is cut midway through printing the time before the service is finally logged as Stopped.
 * At **04:20** I edited `tick-py.service` again, swapped execution back to unbuffered and directed systemd to send the output to the `/tmp/ticktock.log` file instead of the Journal
 * I confirmed the service had started at **05:09** in the recording, and then began to tail the file at **05:12**.
 * Like with the previous experiments, unbuffered output from python tailed from a file has no breaks and is very quick.  Most seconds seem to contain 20 entries
 * I broke the tail at **06:23** (71 seconds), no freezes. The last tailed output was `22:22:54` and I stopped the service shortly after
 * **06:37** I again edited `tick-py.service`, swapped back to buffered execution
 * Tailing the file with buffered output begins at **07:11** in the recording
 * At **07:51**, after 40 seconds of no output, I broke the tail. Note that the output still showed `22:23:03` which would have been from the previous run. The file hasn't been appended
 * I decided to remove the file and restart the service. This resulted in the file being updated again, as shown at **08:14** in the recording where there is a sudden burst of output.
 * The file then updates roughly every 6 or 7 seconds like with systemd
 * I broke the final tail at **09:33** in the recording (after about 79 seconds)
 * The final status report from systemd shows log entries for the service starts and stops while taking output to the file.

# Conclusions

 * The systemd Journal performs quite well when streaming service output. `journalctl -f` only updates about 4 times per second, but it does not miss any output, nor is there any break or pause introduced by systemd
 * The Journal does not perform any different depending if the service running is a shell script or a python script
 * Python's own documententation mentions that its *stdout* and *stderr* are block-buffered when non-interactive, such as when connected to a Unix pipeline.  This is inherently the behaviour of python and nothing to do with systemd.  You would see the same if using `syslog`, and indeed it's the same just going directly to a file

As a sysop who needs to write and maintain systemd services, this was valuable information to learn about python scripts.  Perhaps other interpreters do something similar?  In any case it's not an issue that comes from systemd, which is very reassuring.

I'm keen to share this post with my work colleagues 😄

Next things to tackle are 

 * binary logs, what could go wrong?
 * volatile storage
 
These will be for a future post.
