<!--
.. title: Minecrafting in Python 3
.. slug: minecraft-python-4
.. date: 2020-03-09 07:01:35 UTC+11:00
.. tags: minecraft, python, RaspberryJam
.. category: 
.. link: 
.. description: Making sure your Python 3 environment works with Minecraft.
.. type: text
-->

I've [already blogged about Python 3 and
Minecraft](/blog/2018/minecraft-python-2.html), but there are some subtle things
which I glossed over in that post.  I found when following my own notes that
some of the steps are easy to skim over. I could explain a bit better what is
going on, and why I was seeing weird errors when I resurrected my environment to
work on an experiment with my kids.

<!-- TEASER_END -->
----

# Installing Raspberry Jam Mod for Minecraft and Python 3

I deferred to the [instructions by the Module
author](http://www.instructables.com/id/Python-coding-for-Minecraft/) in my
earlier post, and augmented those with the [PythonTools
instructions](https://ngcm.github.io/PythonTool-Mod/userguide/).  These are
_correct_ and they work if you follow them, but in my own setup on a work
computer, they need tweaking a little, and that requires understanding what's
actually going on. Here are the main points:

## 1. Use the newest Minecraft version supported by your modules.

The maximum Minecraft version that _PythonTool_ supporst is  **Minecraft
1.10.2**. If using just _Raspberry Jam Mod_, then it is **Minecraft 1.12.2**.

Anything newer _may_ work, but it won't support the newer Minecraft features,
such as all the block types in _Acquatic_ (1.13).

The Minecraft Launcher lets you create _Installations_ and use older Minecraft
releases. May as well stick with what's supported by these modules.

## 2. Use a separate Game Directory

When creating a new Installation, specify a separate Game directory. There are
two benefits:

 1. Worlds won't get corrupted by running them with different Minecraft versions
 1. You can install incompatible Forge Modules in separate Installations to
    prevent issues with your Dalek mod not liking some other mod

Create the new Installation, install a [matching version of
Forge](http://files.minecraftforge.net/maven/net/minecraftforge/forge/index_1.12.2.html)
for Minecraft 1.12.2 (or for
[1.10.2](http://files.minecraftforge.net/maven/net/minecraftforge/forge/index_1.12.2.html))
and then run the game once to set up the directories you need. You can make a
World now too, if you want to.

## 3. The Raspberry Jam `mods.zip` goes it the Game Directory

Once I had a Game Directory, I unziped `mods.zip` from [Raspberry Jam
Mod](https://github.com/arpruss/raspberryjammod/releases) into the `/mods` sub
directory. This provides the Java classes to implement the Minecraft side of the
Minecraft Pi API.

## 4. The `mcpypi` Python Library goes in the Game Directory too

The MCPI library must be located in `/mcpypi/mcpi` in the Game Directory so that
the `/py` and `/lpy` Talk Commands can find it, to work in-game. For
_PythonTool_ you can change it's options for the Command Block, [as I described
before](/blog/2018/minecraft-python-2.html).

*But here's the kicker*: **you must use the version of the mcpi code that
ARPruss converted to Python 3**. Python 2 mcpi code from _Stuff About Code_
won't load properly with Python 3.  When I tried, I got his error:

```
ModuleNotFoundError: No module named mcpi
```

At first I thought it was an issue with my Python environment, and I made some changes to force `mcpi` into my Python Path. This turned out to be not the case: this is a symptom that the moule isn't initialising properly (this was changed between Python 2 and Python 3). Even after I fixed that, the module imports, but I instead see this error:

```
NameError: name 'basestring' is not defined
```

Which indicates that the code is broken in Python 3 and it'll need a lot of work
to get going.

Fortunately, the code that comes in `python-scripts.zip` from [Raspberry Jam
Mod](https://github.com/arpruss/raspberryjammod/releases) already has these
fixes, so just use the more modern code.  I [forked ARPruss's
module](https://github.com/sinewalker/raspberryjammod) to be sure I know which
one to get in future.

## 5. Configure Raspberry Jam Mod to use Python 3

By default, the Module will use the system Python, which is likely to be Python
2.7 still. This _works_ (because ARPruss is awesome and made his version of the
code work for _both Pythons_), but it will be less confusing to use 3, also
since Python 2 is now end-of-life at last, it is better to stop relying on it.

I changed the Module's Options to specify the executable for Python 3:

**_Main Menu_ -> Mods -> Raspberry Jam Mod -> Python Interpreter**

![Minecraft mods -> Raspberry Jam Mod -> Python Interpreter](/pixels/minecraft/raspberryjammod-options.png)

(I could also edit `$MCPROFILE/config/raspberryjammod.cfg`):

```
    # Python interpreter [default: python]
    S:"Python Interpreter"=python3
```

This assumes that the `python3` command will work, which it does for me, at
least for now. I may need to set up Python 3 to "just work" on other operating
systems, or put the full path to a python3 executable as the `Python
Interpreter` Option value.

## 6. Install Raspberry Jam Mod from PyPI into your Virtual Environment

```
pip install raspberryjammod
```

This makes the `mcpi` module available to code in whichever Python environment
used to do Minecraft hacking. I don't _need_ to copy the mcpi from
`python-scripts.zip` into my own code after doing this. I am now also sure
that I'm using the _right python_ code for Python 3.