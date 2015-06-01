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
of Copyright potential infringement left unexamined, how do you get
it?

<!--TEASER_END -->

Step 1, download
----

The tool to use for downloading streaming video on the Internet is
youtube-dl. It works for other sites besides YouTube (vimeo, for
instance), though I've not yet had luck with ABC/BBC's iView. 

First, you download only the audio. You *can* download the video and
extract the audio stream, you'll just be wasting network
bandwidth/quota.

I like ogg audio if I can get it, so I look for any webm formats
available (the audio stream is ogg in webm):

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

Okay, now to get the Vorbis audio out of it. I use ffmpeg:

```
ffmpeg -i freakout.webm -vn -acodec 'copy' freakout.ogg
```

If you download a different format, you will need to know the embedded
audio stream encoded in it if you want to extract that stream. For
instance an mp4 video will usually contain audio as mp3, but sometimes
acc.  ffmpeg can usually tell you what it finds.

Step 3, play the stream
----

One you have the audio in a file, you can play it with a music player,
any time I want, no unnecessary bandwidth use.

You can also import it into an audio editor, such as
[Audacity](http://web.audacityteam.org/) and trim or add
leading/trailing blank sound, filter out noise, remove skips between
tracks and so on.

Happy hacking!

