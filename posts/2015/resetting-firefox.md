<!-- 
.. title: Resetting Firefox
.. slug: resetting-firefox
.. date: 2015-12-16 13:21:28 UTC+11:00
.. tags: howto,tip,firefox
.. category: 
.. link: 
.. description: 
.. type: text
-->

I just survived my first Firefox Reset and lived to tell about it.

I was experiencing some weird cross-site stuff for one of work's web tools, and decided to give Firefox's [Reset](https://support.mozilla.org/en-US/kb/reset-preferences-fix-problems) a try. **It actually worked!**

My concern was that, because it deletes all your add-ons and customisations, I would lose them. Fortunately, I also use Firefox [Sync](https://support.mozilla.org/en-US/products/firefox/sync) already. So that meant, after Firfox had cleaned itself up, it re-downloaded all my custom goodness and re-installed it.

***One caveat***: you do have to Restart Firefox after Sync has done it's bit to re-install Addons. After that, everything is as it should be. Hurray.

The steps to Refresh Firefox are:
----

1. Go to `about:support`
1. Press the **Refresh** button in the top right
1. Wait for Sync to finish (you can check how it's going by looking in `about:addons` to see if your Extensions are all there yet)
1. Restart Firefox (either from the addons page, or by pressing Alt-F2 and typing `restart`)

