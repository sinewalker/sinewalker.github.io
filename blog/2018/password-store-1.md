<!--
.. title: Password databases: Installing password-store on Android
.. slug: password-store-1
.. date: 2018-06-24 22:45:22 UTC+10:00
.. tags: draft, password-store, keepassx, passwords, git, gpg, ssh, keybase
.. category: 
.. link: 
.. description: 
.. type: text
-->

The final part of the password puzzle is getting my passwords into my pocket.  Hold onto your hat, it's a bit of a fiddle.

<!-- TEASER_END -->
----


# The Password Store system for Android

image etc.


# Setting up Password Store on an Android


On the Android, follow these steps:

 1. (optional) Install [F-droid](https://f-droid.org/) since the *Google Play Store* version of Password Store has been crippled upon Google's request (auto-fill disabled)
 2. Install Password Store [from Google Play](https://play.google.com/store/apps/details?id=com.zeapo.pwdstore) or F-droid
 3. Install OpenKeychain [from Google Play](https://play.google.com/store/apps/details?id=org.sufficientlysecure.keychain) or F-droid. This does the actual GPG and manages keys
 4. In OpenKeychain, generate a new key, e.g. 'MikePop4'
 5. Send the key to yourself by email (it sends the *public key* only)
 6. On the PC/Mac, save the email attachment
 7. Import the key to the PC/Mac keychain and Trust it's Ownership
 8. Export the Password Store pub/sec pair (or retrieve from Keybase)
 9. Encrypt the exported Password Store key pair for 'MikePop4'
 10. Email to self
 11. On the phone, save the email attachment
 12. In OpenKeychain, Decrypt the attachment
 13. In OpenKeychain, Import the pub/sec Password Store key pair
 
 Phew! At this point, you have the software and the key pair on your phone. Now you need to get the actual password store

 1. Be sure you have run `pass init password-store` (or whatever you called the GPG key pair for your password store)
 2. Make sure you've imported keys, set your remote and that you have run `pass git push all` at least once.  To push your encrypted Password Store to your online remote
 3. On the phone, open Password Store and
