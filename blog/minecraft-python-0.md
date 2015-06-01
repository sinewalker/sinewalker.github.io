<!-- 
.. title: Hacking Minecraft with Python
.. slug: minecraft-python-0
.. date: 2015-05-30 10:07:34 UTC+10:00
.. tags: hacking, minecraft, python, canarymod, RaspberryJuice, RaspberryPi, CodeKids
.. category: 
.. link: 
.. description: Initial setup for Minecraft on a PC
.. type: text
-->

I'm having a play with Minecraft and Python, using the MiPy library, a
Minecraft server called CannaryMod, and a plugin-in for that called
RaspberryJuice.

You can do all this out-of-the-box with Raspbian on a RaspberryPi, but
I wanted to set up my home computers also.  Here's a quick run-down of
the steps I followed

<!-- TEASER_END -->

Install the software
----

First you need a copy of the [Minecraft](https://minecraft.net)
game. You can [get it for free](https://minecraft.net/download), but
you will need to license a Player with Mojang, which is (US)$30 per
player.  I have one that I purchased for my eldest son and we share
that at the moment. Our player name is "devilcraft74".

You'll also need [CanaryMod](http://canarymod.net/) and a plugin for
it called
[RaspberryJuice](https://github.com/martinohanlon/canaryraspberryjuice). The
creator of RaspberryJuice has an
[excellent blog about programming Minecraft](http://www.stuffaboutcode.com),
and his
[instructions for installing and setting up this software](http://www.stuffaboutcode.com/2014/10/minecraft-raspberryjuice-and-canarymod.html)
are clear and easy to follow.

Finally, you'll want a copy of
[mcpipy](https://github.com/brooksc/mcpipy) which is the Python
bindings and some sample code for
[Minecraft Pi edition](http://pi.minecraft.net/). For older hackers,
this is where the real fun begins.

Configure your World
----

CanaryMod comes pre-configured as a fairly well locked-down Minecraft
server. It's main purpose seems to be as a server for running
Minecraft MMOGs, and it has a
[sophisticated Permissions system](http://canarymod.net/books/canarymod-admin-guide/permissions-and-groups)
and
[modular configuration files](http://canarymod.net/books/canarymod-admin-guide/setting-your-server).

The documentation is good, so far as it goes, but it seems to still be
under construction.  Anyway, the configuration files are well
commented, so it's simple to work out what to change just by reading
them.

I will configure my world for hacking with Python, so I want Creative
Mode (so I can fly, and so that there is no interference with my
hacking by the mechanics of the Survival game) and also I want to be
able to build with the player as well as through Python.

**First, creative mode**. I'm setting the default `gamemode` for the
world from it's configuration file (inside the CanaryMod directory
`config/worlds/default/default_NORMAL.conf`):

```
gamemode=1
```

Now, whenever a player joins my server and enters the default world,
they will be in Creative mode rather than Survival.

**Second, permission to build**.  Once the server starts, you can enter
this command at the server console (you only need to do it once):

`/playermod group set devilcraft74 admins`

(substitute your own player name for *devilcraft74*)

Yep, I am now root in the world.  I realise that there is a much more
surgical way to allow players to build in the world:

`/groupmod permission add visitors canary.world.build`

This adds `canary.world.build` permission to the `visitors` group (of
which all players are members when they join the server).  But this
isn't working for me.  I'm unsure why exactly, and I'm *fairly* sure
I've spelt it right. I can't find what all the default permissions are
to check that though (again, documentation seems lacking). So for now
at least, I'll just add my player to `admins` which I note from the
world config file has a path of `'*'`, which I take to mean
"allow All The Things!". For hacking in my own server, which I don't
intend to be a MMOG,this is fine.

Connect and hack away!
----

We're ready to hack Minecraft worlds.  A basic startup sequence is to
launch Canarymod, then start Minecraft and connect to `localhost` from
the Multiplayer menu option. I'll assume you know how to play
Minecraft enough to look and move around, as well as build stuff and
look for Block types in your Inventory&hellip;

Once Minecraft's running and connected to your CanaryMod server, then
from a Python REPL, this incantation will get you connected to the
local Minecraft server as well (assuming mcpipy is in your
Python library path, or is a subdirectory of the current directory
when you run it):

```
>>> import mcpipy.minecraft.Minecraft as minecraft
>>> mc = minecraft.Minecraft.create()
```

You will see a message in the CanaryMod console that a new connection
has been made:

```
```

Were in!

Operations on the Minecraft world are done by sending messages to the
Minecraft object, an instance of which we just declared as `mc`. Let's
try something simple:

```
>>> tintable_glass = 95
>>> red = 14
>>> blue = 11
>>> for x in range(15):
...     mc.setBlocks(x,0,0, x,3,0, tintable_glass,red)
...     mc.setBlocks(0,0,x, 0,3,x, tintable_glass,blue)
...
>>> for z in range(15):
...     mc.setBlocks(0,z,0, 3,z,3, tintable_glass,z)
...
```

This makes a short axis of glass starting at the world's Origin, with
a red wall 3 blocks high along the X axis, a blue wall along the Y
axis, and a 3x3x15 tower of glass up the Z axis. Each layer of
the tower is a different colour from 0 (white) to 15 (black).

<<< screen shot >>>

Parts of this construction may be below the ground, because when the
world is generated it has some topography, but you should be able to
dig down to `0,0,0` and see all the colours of the tower. You can also
dig into negative Z space, as well as move in negative X and Y
dimensions.

Note that in Minecraft, not all Block types can be tinted in this
fashion, but Block 95 is one type that can be. Wool is
another. There's a list of known Block numbers in the `mcpypi` library
(`block.py`), but it has gaps, one of them being 95... I found *that*
number by manually setting a block at 0,0,0 to Red Tinted Glass (from
in-game, once my tower was built &mdash; using Stone &mdash; so that I
knew where to find `0,0,0`), and then learning it's number using:

```
>>> print mc.getBlock(0,0,0)
95
```

Time to explore
----

So, there you have it. We're set to go exploring. Have a read of the
[Stuff About Code](http://stuffaboutcode.com) web site, it's got lots
of fun looking stuff, starting with Turtle graphics and leading on to
2D and 3D primitives made from Blocks. Super stuff, I can see my kids
are going to be really motivated to learn about Cartesian geometry,
trigonometry and some other Math's subjects, and maybe even
programming!

Happy Hacking!
