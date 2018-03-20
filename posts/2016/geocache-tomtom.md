<!-- 
.. title: Loading Geocache Pocket-queries on TomTom XL
.. slug: geocache-tomtom
.. date: 2016-10-09 14:08:46 UTC+11:00
.. tags: geocaching, gps, gsak, tomtom, how-to
.. category: 
.. link: 
.. description: 
.. type: text
-->

We're back from a two-weeks family trip to [Victoria](http://www.visitvictoria.com/), along the [Great Ocean Road](http://greatoceanrd.org.au).  We planned to do some [GeoCaching](https://www.geocaching.com/guide/) along the way and we even purchased a store-display model [Magellan eXplorist 510](http://www.magellangps.com/Store/eXploristSeries/eXplorist-510) which has support for paper-less caching. It's great, if a bit heavy on the batteries.

The trip was so epic and busy, and we did so many things along the way that we barely had time to stop for caches - we only found six! But it was still a fun diversion.

This article's about the **TomTom XL** though, our venerable old in-car sat' nav', which needs a little help to do GeoCaching. The device dates from around 2006/2007 I think.  Before our trip, we purchased a (long overdue) map update for it, and then the night before we left home I sat down for a bit to re-learn how to upload caches into it as Points Of Interest. This makes driving to the nearest cache much simpler because the TomTom can plan the route. Or else you will see caches popping up along your way if you have a different route already planned.

<!--TEASER_END-->
----

There are three steps:

 1. **Get the cache data** - Generate a Pocket-Query from GeoCaching.com and download it
 2. **Convert the query results into a TomTom** `.ov` **file** (POI "overlay"?)
 3. **Upload the POI file into the TomTom**

## Get the cache data

The first step is just to go to [geocaching.com](https://www.geocaching.com/), generate a [pocket query](https://www.geocaching.com/pocket/) (or more than one) that covers your trip areas, and when the query is complete, download it in GPX format.  This format has all the details about each cache matching the query, with descriptions, clues,  waypoints and recent logs &mdash; enough to do paper-less caching and ready to upload into a dedicated geocaching device (say, the Magellan eXplorist).

Note that the GPX format is a Premium Groundspeak Member feature.  Free accounts can download Pocket Queries in LOC format which has the position data only, and might actually be enough to convert and upload to a TomTom, but I've not tried this.  Premium membership is pretty reasonable and worth it I reckon, if you get into caching a bit.

You can upload the GSX files directly into the Magellan by attaching it to your computer and placing the files in its `Geocaching` directory (with Windows Explorer or Mac Finder).  The TomTom XL is older and needs the GPX converted to a proprietary Points-Of-Intrest overlay file before doing something similar.

## Convert for TomTom

Years ago some fellow Cachers recommended a Windows program called [GSAK](http://gsak.net/) - *Geocaching Swiss Army Knife*. It does a great many things that I've not played with.  For my purpose though it's fairly easy:

 1. (optional, but simplest) Make a fresh database
 2. Import the GSX file(s) into your new empty database
 3. Export the database to TomTom (there's a menu item for it)

This produces an output file with a `.ov` extension. That goes to the TomTom next.

*For bonus points*: when exporting the database to TomTom format from GSAK, you can set an image on the database and TomTom will use that to show the points of interest. We use the Geocaching logo (in Windows `.bmp` format) so that caches will appear in the TomTom with Geospeak's little-man-and-flag icon.

## Upload to TomTom

So now we have a file to put on the TomTom. I always forget where to put it. It's easy:

1. Attach the TomTom to your computer, Windows will recognise it as a USB Drive and assign a drive-letter. Open that in Windows Explorer
2. Copy the file exported by GSAK into your map directory on the TomTom.  **What that means is**:  *copy it to the directory on the TomTom drive that is named for the map you have installed on the TomTom*.  Say you have Australia in your TomTom, as I do, and your TomTom is attached as drive `E:`, then you copy your exported `.ov` file to `E:\Australia\`.  The TomTom will load this as an overlay on that map.

"Safely remove" and then detach the TomTom. It'll restart, and now there should be Points Of Interest for each cache in your pocket-query, ready to set as destinations for the navigator.

Happy Caching.
