<!--
.. title: Password databases: Migrating from KeePassX to Pass
.. slug: migrating-keepass-to-password-store
.. date: 2018-05-03 22:00:22 UTC+10:00
.. tags: password-store, keepassx, passwords, git, gpg, ssh, keybase
.. category: 
.. link: 
.. description: 
.. type: text
-->

I spent some spare hours on the week-end playing with [Pass](https://play.google.com/store/apps/details?id=com.zeapo.pwdstore), importing my KeePassX database into password-store and synchronising it to a GitLab private repository.

It's a little tricky to get it set up,  with a few moving parts, so I'm still experimenting. Here's what I've figured out so far.

<!-- TEASER_END -->
----

There are scripts to migrate from other password storage systems to pass. The one I used for migrating from KeePassX is [keepass2csv2pass.py](https://git.zx2c4.com/password-store/tree/contrib/importers/keepass2csv2pass.py) which suited my needs. But I needed to do some preparations first.

# Preparing my KeePassX database

My database was actually pretty good for my needs, and had a nicely organised structure to it with nested password groups, pretty icons and so on.  It was great for use within a KeePassX GUI both on macOS and Linux, as well as the Android app.

After a few test imports and playing around in *pass* though, I quickly found that my password store's arrangement *sucks* for the command line!  Even with pass' supplied bash-completion (which is awesome!), having to retrieve your password like this:

```sh
pass -c network/google/sinewalker/sinewalker
```

is pretty *yuck*.  So the thing to do was to reorganise (in KeePassX) all my passwords to have *as flat a layout as possible*.  If a group is redundant, remove it.  I got rid of the "network" group all together and have most of my passwords just sitting in the root of the database.

When importing the CSV from KeePassX to pass, I used the ` --to_lower` and `--name_is_original` options of the `keepass2csv2pass.py` script.  The above password can now be retrieved with:

```sh
pass -c google/sinewalker
```

And that's just because I have more than one Google account.  Most passwords are even flatter. This is how to get my VPN pass-phrase:

```sh
pass -c celo-vpn
```

(it's enough to just type C E <TAB> to complete the "celo-vpn" name too!)

# Importing the KeePassX database

Importing my KeePassX database was done like this:

First, from KeePassX for macOS, I exported my database to a CSV file, which is in *clear-text*.  The MacBook is encrypted, but I still stored this clear-text copy of my passwords into my [Keybase.io](https://keybase.io/) private [filesystem](https://keybase.io/docs/kbfs), to keep it secret. Just in case.

Then, I created a new password-store, initilised git and set a remote, and imported it using the keepass2csv2pass.py Python script:

```
[mjl@milo:/keybase/private/sinewalker/pass-experiment]
[21:37]$ pass init sinewalker@keybase.io MikePop4 mlockhart@squiz.net
Password store initialized for sinewalker@keybase.io, MikePop4, mlockhart@squiz.net
[mjl@milo:/keybase/private/sinewalker/pass-experiment]
[21:37]$ pass git init
Initialized empty Git repository in /Users/mjl/.password-store/.git/
[master (root-commit) d1779a7] Add current contents of password store.
 1 file changed, 3 insertions(+)
 create mode 100644 .gpg-id
[master 2a0ca87] Configure git repository for gpg file diff.
 1 file changed, 1 insertion(+)
 create mode 100644 .gitattributes
[mjl@milo:/keybase/private/sinewalker/pass-experiment]
[21:38]$ pass git remote add origin git@bitbucket.org:sinewalker/pass.git
[mjl@milo:/keybase/private/sinewalker/pass-experiment]
[21:38]$ keepass2csv2pass.py --to_lower --name_is_original keepass.csv
```

Some points to note from above

 * I initialised the password store using multiple GPG keys. This is probably not the best way to do it, for several reasons, and I've switched to a single GPG key pair which I share on all devices. I'll explain more about that in a bit.

 * I set the remote to a private *BitBucket* repository here.  I later learned that **BitBucket doesn't actually let you** ***write*** **to a private repo using the Git+SSH protocol** (!) So I've switched to a private *GitLab* repo instead.  I thought that using a normal *public* *GitHub* repo would just be inviting people to brute-force my password store. Yes, the GPG encryption is *Pretty Good*, but I'm not so confident about my *passphrase*!

From this point, I was ready to play around with pass itself, and to try sync between my Mac and GitLab.

# The GPG keychain

Since *pass* uses GPG to secure the password store, you need to have all the keys you're going to encrypt for imported on your key chain, ***and trusted by GnuPG***.

That last part tripped me up for most of my Saturday morning, and the GnuPG errors are difficult to decipher on a good day, let alone if you're trying to understand them at the kitchen table while your kids are yelling at each other or asking you to feed them breakfast!


```sh
gpg: FF25A8A4E3C4B151: There is no assurance this key belongs to the named user
gpg: [stdin]: encryption failed: Unusable public key
```

This means Ownership Trust needs to be established on the key.

```sh
gpg --edit-key FF25A8A4E3C4B151
...
gpg> trust
```


## What keys to use?


I began by using three keys to encrypt my password store

 * My [Keybase.io PGP key](https://keybase.io/sinewalker#show-public) (which is my personal master key)
 * My work PGP key
 * A key I generated for my phone, using [OpenKeyChain for Android](https://play.google.com/store/apps/details?id=org.sufficientlysecure.keychain)

This way, I thought, I can decrypt the passwords using any of these private keys, which of course I'm careful to only place appropriately.  e.g. the work secret key is only on my work computer, and the phone's secret key is only in my phone. 

Well that's true. But if I only have the *public* GPG keys for each device on the others, then that means any key created on my Android *can't be decrypted on my other devices*. I need the secret key on the key chain of each device that I'm sharing my password store on.

That would not be recommended:  the point of secret keys is that *they are secret*.  I don't want to install all my secret keys everywhere.

Pass doesn't appear to be able to use a symmetric key, so instead I have created a public/secret key pair, called "password-store", to use *just for my password-store*.  I re-initialised the password-store to use this single key pair:

```sh
pass init password-store
```

and I keep the pub/sec key pair in my keybase private filesystem.

The Keybase.io Android app doesn't yet let you access the KBFS, but getting the new pub/sec pair onto the phone was simple enough: since I had already made a key for the phone, I encrypted my ASCII-armoured password-store key pair with the phone's public key and emailed it to myself. Only my phone could decrypt it.  On the phone I saved the attachment, then decrypted it and imported the pub/sec pair.  Finally I switched to using that going forward.

# Syncing to GitLab

 * Needed to generate a new public/private SSH key pair and [import the public key to GitLab](https://gitlab.com/help/ssh/README.md)
 * Then initialise a new git repo in pass:
 
```sh
pass git init
```
 
 * Add the GitLab repo as a remote
 
```sh
pass git remote add origin git@gitlab.com:sinewalker/pass
```
 
 * Now ready to push
 
```sh
pass git push
```
 
 
