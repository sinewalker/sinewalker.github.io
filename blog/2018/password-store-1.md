<!--
.. title: Password databases: Installing password-store on Android
.. slug: password-store-1
.. date: 2018-06-24 22:45:22 UTC+10:00
.. tags: password-store, passwords, openkeychain, gpg, ssh, keybase
.. category:
.. link: 
.. description: 
.. type: text
-->

The final part of the password puzzle is getting my passwords into my pocket.  There are quite a few images in this post (about 2MB) as I describe setting up the system on Android, which involves a lot of steps, with screen-shots.

Hold onto your hat, it's a bit of a fiddle.

<!-- TEASER_END -->
----

# The Password Store system for Android

Here are all the [parts](keepass-and-password-store.html) of the [Password Store](https://www.passwordstore.org) system, as installed on Android.  It's similar to [the Unix Password Store system](password-store-0.html) but differs in how SSH and PGP have been packaged into utilities.

![password-store Android diagram](/img/password-store-android.png)

*Password-Store Android tool chain — see a [vector rendition](/img/password-store-android.svg)*


There are two apps involved in the system, both are fairly small and don't need many [computrons](/jargon/html/C/computron.html), so they are no trouble to have even on a smallish droid phone (my cheap drop-and-don't-cry Alcatel Pop4 manages these fine):

 * *Password Store* — manages your password store in your phone, with sync to remote git repository via SSH authentication
 * *OpenKeychain* — does the actual cipher work and manages PGP keys on your phone. Can encrypt/decrypt files or be called from other apps like *Password Store*.

# Setting up *Password Store* on an Android


There are a lot of steps here.  I do this is four stages

 1. Install the software
 2. Transfer the PGP keys for the password store into the phone
 3. Set up the software and perform first clone
 4. Test creating a password on the phone and synchronise to a PC

Fortunately you only need to do this once per phone system, and once installed the actual operation is much simpler.  Remember why I'm using *Password Store*:

 * Smarter merges for individual password changes, rather than sync the whole database
 * Better control over where my passwords are stored on the Net and how they are accessed
 * Potential for fine-grained access control in the future
 
And some bonus features:

 * Can track individual password changes
 * OpenKeychain provides PGP encryption for other purposes

## 1. Install the software

On the Android, follow these steps:

 1. (optional) Install [F-droid](https://f-droid.org/) since the *Google Play Store* version of Password Store has been crippled upon Google's request (auto-fill disabled)
 
 2. Install *Password Store* [from Google Play](https://play.google.com/store/apps/details?id=com.zeapo.pwdstore) or *F-droid*:

    <a class="reference" href="/img/android-passwords/00-F-droid-password-store.png" alt="Install Password Store from F-Droid"><img src="/img/android-passwords/00-F-droid-password-store.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/01-install-password-store.png" alt="Install Password Store"><img src="/img/android-passwords/01-install-password-store.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/02-installing-password-store.png" alt="Installing Password Store"><img src="/img/android-passwords/02-installing-password-store.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/03-installed-password-store.png" alt="Password Store installed"><img src="/img/android-passwords/03-installed-password-store.thumbnail.png"></a>

 3. Install *OpenKeychain* [from Google Play](https://play.google.com/store/apps/details?id=org.sufficientlysecure.keychain) or *F-droid*:

    <a class="reference" href="/img/android-passwords/04-F-droid-openkeychain.png" alt="Install OpenKeychain from F-Droid"><img src="/img/android-passwords/04-F-droid-openkeychain.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/05-install-openkeychain.png" alt="Install OpenKeychain"><img src="/img/android-passwords/05-install-openkeychain.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/06-installed-openkeychain.png" alt="OpenKeychain installed"><img src="/img/android-passwords/06-installed-openkeychain.thumbnail.png"></a>

## 2. Transfer the PGP keys to the phone

There are some different ways to do this. **I use email and send them to myself as an attachment, PGP encrypted for the phone**. So if my email is intercepted, or read by Google, the password store keys can't be stolen.

 * First set up a new PGP key on my phone, and send the public key to myself.
 * Then I can encrypt the password store's keys with my phone as Recipient and email those back.

Here are the steps:

 1. In OpenKeychain, generate a new key, e.g. `MikePop4`

    <a class="reference" href="/img/android-passwords/07-openkeychain-create-my-key.png" alt="OpenKeychain &gt; Create My Key"><img src="/img/android-passwords/07-openkeychain-create-my-key.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/08-openkeychain-phone-key.png" alt="OpenKeychain &gt; Create My Key &gt; Phone Key Detail"><img src="/img/android-passwords/08-openkeychain-phone-key.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/09-openkeychain-create-key.png" alt="OpenKeychain  &gt; Creating Key"><img src="/img/android-passwords/09-openkeychain-create-key.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/10-openkeychain-generating-key.png" alt="OpenKeychain Generating Key"><img src="/img/android-passwords/10-openkeychain-generating-key.thumbnail.png"></a>

 2. Send the key to yourself by email (it sends the *public key* only)

    <a class="reference" href="/img/android-passwords/11-openkeychain-keys-1.png" alt="OpenKeychain Keys list"><img src="/img/android-passwords/11-openkeychain-keys-1.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/12-openkeychain-key-detail.png" alt="OpenKeychain Generating Key"><img src="/img/android-passwords/12-openkeychain-key-detail.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/13-openkeychain-key-menu.png" alt="OpenKeychain Key action menu"><img src="/img/android-passwords/13-openkeychain-key-menu.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/14-openkeychain-key-share.png" alt="OpenKeychain Share Key"><img src="/img/android-passwords/14-openkeychain-key-share.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/15-gmail-send-public-key.png" alt="GMail sending public key attachment"><img src="/img/android-passwords/15-gmail-send-public-key.thumbnail.png"></a>

The next four steps occur on your PC / Mac.  Open your email on the PC/Mac, and save the email attachment.
 
 1. Import the key to the PC/Mac keychain and Trust it's Ownership
 
```
[mjl@milo:~/Downloads]
[21:26]β gpg --import MikePop4.asc
gpg: key D93236828AD4962B: public key "MikePop4 <sinewalker@gmail.com>" imported
gpg: Total number processed: 1
gpg:               imported: 1
[mjl@milo:~/Downloads]
[21:26]β
```
 2. Export your `password-store` public and secret key pair to some place secure (e.g. the Keybase KBFS, then you won't have to re-export from another PC in future):
```
[mjl@milo:/keybase/private/sinewalker/key/gpg]
[21:28]β gpg --export --armour password-store > password-store.sec.asc
[mjl@milo:/keybase/private/sinewalker/key/gpg]
[21:28]β gpg --export-secret-keys --armour password-store >> password-store.sec.asc
```
 3. Encrypt the exported Password Store key pair for `MikePop4``
```
[mjl@milo:/keybase/private/sinewalker/key/gpg]
[21:29]β gpg --trust-model always -e -r MikePop4 password-store.sec.asc
[mjl@milo:/keybase/private/sinewalker/key/gpg]
[21:29]β
```

 4. Email `password-store.sec.asc.gpg` (encrypted for your phone) to yourself
 
Switch back to the phone, open the mail and save the email attachment
 
 1. In *OpenKeychain*, Decrypt the attachment

    <a class="reference" href="/img/android-passwords/16-openkeychain-app-menu.png" alt="OpenKeychain App Menu"><img src="/img/android-passwords/16-openkeychain-app-menu.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/17-openkeychain-encryptdecrypt.png" alt="OpenKeychain Encrypt / Decrypt"><img src="/img/android-passwords/17-openkeychain-encryptdecrypt.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/18-openkeychain-decrypt-download.png" alt="OpenKeychain Decrypt Download"><img src="/img/android-passwords/18-openkeychain-decrypt-download.thumbnail.png"></a>

 2. In *OpenKeychain*, Import the pub/sec `password-store` key pair

    <a class="reference" href="/img/android-passwords/19-openkeychain-import-keys.png" alt="OpenKeychain import keys"><img src="/img/android-passwords/19-openkeychain-import-keys.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/20-openkeychain-import-all-keys.png" alt="OpenKeychain import all keys"><img src="/img/android-passwords/20-openkeychain-import-all-keys.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/21-openkeychain-importing-keys.png" alt="OpenKeychain importing keys"><img src="/img/android-passwords/21-openkeychain-importing-keys.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/22-openkeychain-imported-password-store.png" alt="OpenKeychain imported password store keys"><img src="/img/android-passwords/22-openkeychain-imported-password-store.thumbnail.png"></a>

## 3. Set up *Password Store*

Phew! At this point, we have the software and the PGP key pair on the phone. Now to get the actual password store.

 - Make sure you have run `pass git push all` at least once on the PC, to push your encrypted Password Store to your online remote

On the phone, open *Password Store* and:

 1. Go to Settings, Select OpenPGP Provider and choose OpenKeychain
    
    <a class="reference" href="/img/android-passwords/23-password-store-settings.png" alt="Password Store Settings"><img src="/img/android-passwords/23-password-store-settings.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/24-password-store-select-pgp-provider.png" alt="Password Store Select PGP Provider"><img src="/img/android-passwords/24-password-store-select-pgp-provider.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/25-password-store-select-openkeychain.png" alt="Password Store select OpenKeychain for encryption"><img src="/img/android-passwords/25-password-store-select-openkeychain.thumbnail.png"></a>
    
 2. Generate SSH Key (this is to authenticate to the git remote)
 
    <a class="reference" href="/img/android-passwords/26-password-store-generate-ssh-key.png" alt="Password Store Generate SSH key"><img src="/img/android-passwords/26-password-store-generate-ssh-key.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/27-password-store-generating-ssh-keys.png" alt="Password Store Generating SSH Key"><img src="/img/android-passwords/27-password-store-generating-ssh-keys.thumbnail.png"></a>
    
 3. When the Public SSH key is displayed, touch COPY to put it on your phone's clipboard
 
    <a class="reference" href="/img/android-passwords/28-password-store-public-key.png" alt="Password Store Public Key Copy"><img src="/img/android-passwords/28-password-store-public-key.thumbnail.png"></a>
    
 4. Email your phone's public SSH key to yourself (Paste into the email)
 
 5. In Gitlab (or which ever Remote you use), register the public key with your private repo
 
 6. In *Password Store* on the phone, CLONE FROM SERVER, choose HIDDEN(PREFERRED) (stores internal to the app)
 
    <a class="reference" href="/img/android-passwords/29-password-store-repo-location.png" alt="Password Store Repository Location"><img src="/img/android-passwords/29-password-store-repo-location.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/30-password-store-repo-info.png" alt="Password Store Repositository Information"><img src="/img/android-passwords/30-password-store-repo-info.thumbnail.png"></a>
    <a class="reference" href="/img/android-passwords/31-password-store-repo-imported.png" alt="Password Store Repository Imported"><img src="/img/android-passwords/31-password-store-repo-imported.thumbnail.png"></a>
    
 7. Test viewing a password
 
     - *Password Store* will request to use *OpenKeychain* as a crypto provider. This is what you asked for, so ALLOW
     
       <a class="reference" href="/img/android-passwords/32-password-store-select-key.png" alt="Password Store Allow Key"><img src="/img/android-passwords/32-password-store-select-key.thumbnail.png"></a>
       
     - Password Store* will next request access to your `password-store` key. This is expected, ALLOW
     
       <a class="reference" href="/img/android-passwords/33-password-store-crypto-info.png" alt="Password Store Allow Crypto Info access"><img src="/img/android-passwords/33-password-store-crypto-info.thumbnail.png"></a>
     
     - Enter the passphrase for your `password-store` key (you do this each time you view a password, so if your phone is stolen your passwords are still safe, protected by this passphrase)
     
If your password displays, congratulations!  Now you have access to your passwords in your pocket.

## 4. Test password creation and syncing

You should probably test syncing back to base

 1. Create a password. *Password Safe* will redirect you to chose a key to encrypt with. Use `password-store`
 
 2. Push to your git remote
 
On your PC, pull and test decrypt.  Then you can remove the test password and push back:

```
[mjl@milo:~]
[22:09]β pass git pull
remote: Counting objects: 5, done.
remote: Compressing objects: 100% (5/5), done.
remote: Total 5 (delta 3), reused 0 (delta 0)
Unpacking objects: 100% (5/5), done.
From gitlab.com:sinewalker/pass
   0baca19..6e7b75b  master     -> origin/master
Updating 0baca19..6e7b75b
Fast-forward
 home/tesla/test.gpg | Bin 0 -> 878 bytes
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 home/tesla/test.gpg
[mjl@milo:~]
[22:25]β pass home/tesla/test
Xoowaerahd1Oi7ohKeil
[mjl@milo:~]
[22:25]β pass rm home/tesla/test
Are you sure you would like to delete home/tesla/test? [y/N] y
/Users/mjl/.password-store/home/tesla/test.gpg
[master 3cb98d6] Remove home/tesla/test from store.
 1 file changed, 0 insertions(+), 0 deletions(-)
 delete mode 100644 home/tesla/test.gpg
[mjl@milo:~]
[22:25]β pass git push
Counting objects: 4, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 374 bytes | 374.00 KiB/s, done.
Total 4 (delta 3), reused 0 (delta 0)
To gitlab.com:sinewalker/pass
   6e7b75b..3cb98d6  master -> master
[mjl@milo:~]
[22:25]β
```

You now have secure, two-way syncing between your phone and your other computers, with the shared encryption keys, using Git+SSH on an online private Remote.

Happy Hacking.
