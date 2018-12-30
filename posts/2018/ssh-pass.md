<!--
.. title: ssh-pass
.. slug: ssh-pass
.. date: 2018-12-30 09:57:41 UTC+11:00
.. tags: ssh,passwords,password-store,tip
.. category: 
.. link: 
.. description: A SSH_ASKPASS wrapper to retrieve SSH key passphrases from password-store without using the clipboard
.. type: text
-->

I've been using [pass](https://www.passwordstore.org/) for a while now and I really like it.  But I don't like putting passwords or passphrases into my system clipboard if I can help it:  writing code to sniff the clipboard is child's play, so I'd like to avoid that attack vector if possible.

One place that I thought would be simple would be the SSH utility to add keys to your SSH Agent: `ssh-add`.  It should be possible to do something like this:

```sh
$ pass github/sinewalker|head -1|ssh-add github/sinewalker
```

Unfortunately this isn't so:  `ssh-add` doesn't accept your passphrase from STDIN when piped like this.

But, there *is* a way to do it.

<!--TEASER_END -->
----

Here's a script that does the job:

```sh
#!/bin/bash

#Add specified SSH key to the SSH Agent, using SSH_ASKPASS to retrieve
#the key's passphrase from the Unix password store (pass).
#This relies upon the keys having the same name in both your key directory
#and your password store.

if [[ -z ${1} ]]; then
  echo "$(basename ${0}): no SSH key specified" 1>&2
  exit 1;
fi
KEY=${1}
KEY_DIR=${HOME}/key

export DISPLAY=dummy
export SSH_ASKPASS=$(mktemp -t ssh-askpass)
cat > ${SSH_ASKPASS} << EOF
#!/bin/sh
pass ${KEY}|head -1
EOF
chmod +x ${SSH_ASKPASS}
ssh-add ${KEY_DIR}/${KEY} < /dev/null
rm ${SSH_ASKPASS}
```

[Gist](https://gist.github.com/sinewalker/91d74a0d19a93f373e2071e5ba2ced2e)

The script is based upon [this answer](https://stackoverflow.com/a/15090479/776953) to the SO question "*How to make ssh receive the password from stdin*" which is for `ssh` but the same applies to `ssh-add`.

While this script is pretty simple, it deserves breaking down a little.  There are 3 ingredients to it:

 1. Uses `ssh-add`'s `SSH_ASKPASS` environment variable to retrieve the passphrase for the SSH key
 2. Dynamically creates a throw-away script for `ssh-add` to use
 3. Uses `pass` to retrieve the passphrase from the password store

There are some gymnastics required to convince `ssh-add` to actually use the Askpass script:

 * Must set the `DISPLAY` environment variable, even in non-X11 environments (doesn't hurt in X11)
 * Must run `ssh-add` dettached from a terminal.  I do this by redirecting STDIN from `/dev/null`
 * Must set `SSH_ASKPASS` to the path of a script that retrieves the passphrase and writes it to SDTOUT, as [the manual](https://linux.die.net/man/1/ssh-add) describes.

Finally, one little caveat to the way I've written the script:  **the name of the passphrase in my password-store must be the same as the path to the key file in my keys directory**.
 
As an example,  I have an SSH key for my github:

```
[mjl@milo:~]
[10:21]β cd key
/Users/mjl/key
[mjl@milo:~/key]
[10:21]β tree
.
├── bitbucket
├── celo
│   ├── Celo-OVPN-Bundled-Configs
...
├── github
│   └── sinewalker
...
```

I've stored the keyfile `sinewalker` under the directory `github`, so that it matches the path to the passphrase in my password-store:

```
[mjl@milo:~/key]
[10:21]β pass
Password Store
...
├── github
│   ├── milohax
│   └── sinewalker
...
```

Then I can run my `ssh-pass` script like so:

```
[mjl@milo:~/key]
[10:28]β ssh-pass github/sinewalker
Identity added: /Users/mjl/key/github/sinewalker (/Users/mjl/key/github/sinewalker)
[mjl@milo:~/key]
[10:28]β
```

The `pinentry` prompts for my password-store master password (if necessary), but I don't have to copy/paste with the clipboard. As shown above, if you run `ssh-pass` from the directory that contains your SSH keys, then you can also use the shell's TAB-completion.