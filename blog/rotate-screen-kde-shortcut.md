<!-- 
.. title: Rotate screen KDE shortcut
.. slug: rotate-screen-kde-shortcut
.. date: 2015-05-28 08:21:52 UTC+10:00
.. tags: tip, howto
.. category: hacks
.. link: 
.. description: 
.. type: text
-->

We have a few spare monitors laying about at work, and I just grabbed
one with a rotating stand, so I can switch it between Landscape and
Portrait. This is nice, because it's got more pixels than my laptop's
built-in screen, and it's also larger.

It's also *very* handy when viewing pages that are narrow and tall.

All I need now is a way to quickly switch the screen's orientation
without digging through a GUI.  This looks like a job for `xrandr` and
KDE's Global Keyboard Shortcuts

<!-- TEASER_END -->

I've created two Custom Shortcuts in my KDE, called "screen left" and
"screen normal". For "screen left"

 * In the **Action** tab, specify a Command `xrandr --output VGA1
 --rotate left`
 * In the **Trigger** tab, specify a shortcut key. I'm using Meta+Alt+F10

Do the same for "screen normal" substituting `--rotate normal`, and a
different key &mdash; Meta+Alt+F9 in my case.

Of course, the `--output` switch will vary per machine, depending
which screen you want to rotate and how it's connected. My laptop is
connected to two screens, one via a VGA cable, and one via HDMI.  I
got the output name by just running `xrandr` with no arguments and
looking for the string " connected":

```
mjl@milo:~> xrandr|grep " connected"
LVDS1 connected (normal left inverted right x axis y axis)
HDMI1 connected primary 1920x1080+0+0 (normal left inverted right x axis y axis) 531mm x 299mm
VGA1 connected 1680x1050+1920+0 (normal left inverted right x axis y axis) 434mm x 270mm
mjl@milo:~>
```

So this shows `VGA1`, `HDMI1` and `LVDS1` (which is the laptop's
built-in screen, and is connected but disabled when driving two
external monitors).

Have a lot of fun!
