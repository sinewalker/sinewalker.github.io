<!-- 
.. title: How to get audio from an online video
.. slug: get-audio-from-youtube-video
.. date: 2015-03-04 10:54:14 UTC+11:00
.. tags: howto, tip, youtube, ffmpeg, audio
.. category: hacks
.. link: 
.. description: 
.. type: text
-->


Suppose that there is a song on YouTube and you want the audio from
it. For instance:
[Le Freak, by Chic](https://www.youtube.com/watch?v=EVZh4WcdC3s). Questions
of potential Copyright infringement left unexamined, how do you get
it?

<!--TEASER_END -->

Step 1, download the audio
----

The tool to use for downloading streaming video on the Internet is
[youtube-dl](https://rg3.github.io/youtube-dl/). It works for other
sites besides YouTube (vimeo, for instance), though I've not yet had
luck with ABC/BBC's iView.

First, you download only the audio. You *can* download the video and
extract the audio stream, you'll just be wasting network
bandwidth/quota.

I like ogg-vorbis audio if I can get it, so I look for any webm
formats available (the audio stream is vorbis in webm):

```
mjl@tesla:~/Music> youtube-dl -F https://www.youtube.com/watch?v=EVZh4WcdC3s
[youtube] EVZh4WcdC3s: Downloading webpage
[youtube] EVZh4WcdC3s: Extracting video information
[youtube] EVZh4WcdC3s: Downloading js player en_US-vfl3g8JP2
[youtube] EVZh4WcdC3s: Downloading DASH manifest
[info] Available formats for EVZh4WcdC3s:
format code  extension  resolution note
140          m4a        audio only DASH audio  127k , m4a_dash container, aac  @128k (44100Hz), 3.71MiB
171          webm       audio only DASH audio  138k , audio@128k (44100Hz), 3.78MiB
141          m4a        audio only DASH audio  255k , m4a_dash container, aac  @256k (44100Hz), 7.44MiB
242          webm       320x240    DASH video   55k , 1fps, video only, 1.36MiB
160          mp4        192x144    DASH video  119k , 15fps, video only, 2.41MiB
243          webm       480x360    DASH video  143k , 1fps, video only, 2.80MiB
134          mp4        480x360    DASH video  241k , 30fps, video only, 4.37MiB
133          mp4        320x240    DASH video  268k , 30fps, video only, 3.08MiB
244          webm       640x480    DASH video  285k , 1fps, video only, 5.37MiB
135          mp4        640x480    DASH video  497k , 30fps, video only, 8.75MiB
17           3gp        176x144    
36           3gp        320x240    
5            flv        400x240    
43           webm       640x360    
18           mp4        640x360    (best)
```

Here, format 171 is the best quality webm audio stream available, so
I'll download that:

```
mjl@tesla:~/Music> youtube-dl -f 171 https://www.youtube.com/watch?v=EVZh4WcdC3s -o freakout.webm
[youtube] EVZh4WcdC3s: Downloading webpage
[youtube] EVZh4WcdC3s: Extracting video information
[youtube] EVZh4WcdC3s: Downloading DASH manifest
[download] Destination: freakout.webm
[download] 100% of 3.78MiB in 00:00
mjl@tesla:~/Music> 
```

Step 2, extract the audio stream
----

Okay, you have the audio, but it's encoded in a webm container. It
would be much easier to put Vorbis data in an Ogg container, as music
players know how to work with that.  For this purpose, I use
[ffmpeg](https://www.ffmpeg.org/):

```
ffmpeg -i freakout.webm -vn -acodec 'copy' freakout.ogg
```

(You can also use it's fork, libav and avconv, but that's a
Debian/Ubuntu confusion that
[you shouldn't need to worry about](http://stackoverflow.com/questions/9477115/what-are-the-differences-and-similarities-between-ffmpeg-libav-and-avconv)).

If you download a format other than webm (because webm is not
available, for instance), you will need to know the embedded audio
stream encoded in that format if you want to extract that stream. For
instance an mp4 video will usually contain audio as mp3, but sometimes
aac or something.  ffmpeg can usually tell you what it finds.

Step 3, play the stream
----

One you have the audio stream in an audio container file, you can play
it with a music player, any time I want, no unnecessary bandwidth use.

You can also import it into an audio editor, such as
[Audacity](http://web.audacityteam.org/) and trim or add
leading/trailing blank sound, filter out noise, remove skips between
tracks and so on.

Happy hacking!

