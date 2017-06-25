<!-- 
.. title: Raspberry Pi WiFi
.. slug: raspi-wifi
.. date: 2017-06-17 11:43:46 UTC+10:00
.. tags: RaspberryPi, WiFi
.. category: 
.. link: 
.. description: Bootstrapping a WiFi LAN connection for Raspberry Pi 2, with a USB WiFi transceiver
.. type: text
-->

Today's project was to bootstrap a WiFi LAN connection for Raspberry Pi 2, with a USB WiFi transceiver.

<!--TEASER_END-->
----

At the Huon Robotics lab I borrowed Bob's Ralink Technology Corp RT5370 USB WiFi adapter and plugged it into my Pi.  It works [without any weird jiggery-pokery](https://www.modmypi.com/blog/how-to-set-up-the-ralink-rt5370-wifi-dongle-on-raspian)! (I should [get myself one of these](https://www.modmypi.com/raspberry-pi/accessories/wifi-dongles/wifi-dongle-nano-usb/) - [$6.64 from BangGood](https://www.banggood.com/Wholesale-New-Mini-150Mbps-USB-WiFi-Wireless-Adapter-150M-Network-LAN-Card-802_11-ngb-p-39274.html?rmmds=detail-left-hotproducts)).  Here's the `dmesg` output snippet for the WiFi device:

```
[    3.437549] usb 1-1.2: new high-speed USB device number 4 using dwc_otg
[    3.565661] usb 1-1.2: New USB device found, idVendor=148f, idProduct=5370
[    3.574731] usb 1-1.2: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[    3.584074] usb 1-1.2: Product: 802.11 n WLAN
[    3.590766] usb 1-1.2: Manufacturer: Ralink
[    3.596804] usb 1-1.2: SerialNumber: 1.0
[    4.927442] udevd[159]: starting version 175
[    8.057609] usb 1-1.2: reset high-speed USB device number 4 using dwc_otg
[    8.248612] ieee80211 phy0: rt2x00_set_rt: Info - RT chipset 5390, rev 0502 detected
[    8.467608] random: nonblocking pool is initialized
[    8.488610] ieee80211 phy0: rt2x00_set_rf: Info - RF chipset 5370 detected
[    8.553044] ieee80211 phy0: Selected rate control algorithm 'minstrel_ht'
[    8.556921] usbcore: registered new interface driver rt2800usb
[   22.415959] ieee80211 phy0: rt2x00lib_request_firmware: Info - Loading firmware file 'rt2870.bin'
[   22.426198] ieee80211 phy0: rt2x00lib_request_firmware: Info - Firmware detected - version: 0.29
```

And the wlan0 interface starts up:

```
[   26.074025] wlan0: authenticate with 94:44:52:de:71:69
[   26.138412] wlan0: send auth to 94:44:52:de:71:69 (try 1/3)
[   26.140174] wlan0: authenticated
[   26.147412] wlan0: associate with 94:44:52:de:71:69 (try 1/3)
[   26.151524] wlan0: RX AssocResp from 94:44:52:de:71:69 (capab=0x411 status=0 aid=3)
[   26.162793] wlan0: associated
```

Great!

I had no keyboard/screen at the Lab, so to get the WiFi configured, I had to SSH (over Ethernet) and do it all from the good old command line. 

## 
The Raspberry Pi website has a [good article on setting up WiFi from the command line](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md)

Here's my `/etc/wpa_supplicant/wpa_supplicant.conf`:


```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
network={
    ssid="belkin.3269"
    psk="REDACTED"
}
```

I also borrowed Bob's Belkin WiFi router.  That's it's SSID in the `network` section. I have a spare WiFi router or two of my own after switching from ADSL to VSDL broadband internet, so I should make sure to use my own equipment next time. 

Once doing this, rebooting the Pi, and connecting my PC to the same router, I could SSH over the WiFi using it's IP address. But to get the [mDNS](bonjour-raspi.html) to work I had to reboot the router itself, because I had already registered the DNS to the Ethernet address, which was a different IP.  That took quite a bit of fiddling and eventually just shrugging and trying the Microsoft Method.

I had hoped to be able to do some actual beginner robotics hacking from the Pi: at least to blink a LED off the GPIO pins, or even talk to an Arduino from the Pi, but we ran out of time at the lab. That will have to be a project for a later day. Also before the next meeting I attennd, I'd like  to be able to VNC into the Pi's [remote desktop](http://www.raspberrypiblog.com/2012/10/how-to-setup-remote-desktop-from.html) -- since I won't be carting a TV and keyboard/mouse around.
