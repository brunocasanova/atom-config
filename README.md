# Atom Config folder

atom config folder sharing for all findhit collaborators

# Features throught Atom
* Git integration
  * blame
  * commit
  * pull and push
  * logs
  * and so on...
* Run commands:
  * Useful to run `make server-run` on SDK.
* Workflow is near as possible with Sublime-Text
* GitHub integration

# Installation

* Fork this repo into your personal account;
* Replace `~/.atom` with your fork:

```bash

# Removing old folder
rm -fR ~/.atom;

# Cloning fork into ~/.atom
git clone https://github.com/[you-repo]/atom-config.git ~/.atom;

# Changing to newly created dir
cd ~/.atom;

# Adding remote of upstream repo.
git remote add upstream https://github.com/findhit/atom-config.git;

```

# Updating

```bash

# Changing to your fork's cloned dir
cd ~/.atom;

# Fetching upstream changes
git fetch upstream

# Reset your local master by upstream/master
git checkout master;
git reset --hard upstream/master;

# Just to be synced, push back changes to your origin (your fork)
git push origin master;

```
