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
* Link `~/.atom` with your fork clone dir:

```bash

ATOM_CFG="~/.atom"
USER="brunocasanova"
REPO_DIR="~/GitHub/${USER}/atom-config"
REPO_ORIGIN="https://github.com/${USER}/atom-config.git"
REPO_UPSTREAM="https://github.com/${USER}/atom-config.git"

```

```bash

# Removing old folder
rm -fR ~/.atom;

# Cloning fork
git clone $REPO_ORIGIN $REPO_DIR;

# Link ~/atom to repo's dir
ln $REPODIR $ATOM_CFG;

# Changing to newly created dir
cd $REPO_DIR;

# Adding remote of upstream repo.
git remote add upstream $REPO_UPSTREAM;

```

# Updating

```bash

# Changing to your fork's cloned dir
cd $REPO_DIR;

# Fetching upstream changes
git fetch upstream;

# Reset your local master by upstream/master
git checkout master;
git reset --hard upstream/master;

# Just to be synced, push back changes to your origin (your fork)
git push origin master;

```
