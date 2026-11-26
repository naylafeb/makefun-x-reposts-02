# makefun-x-reposts-02 entry

[![make.fun bounty](https://img.shields.io/badge/make.fun-bounty-blue)](https://make.fun/bounty/makefun-x-reposts-02)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node 22+](https://img.shields.io/badge/Node-22%2B-green)](https://nodejs.org)

An entry for the make.fun bounty "Get the most reposts and likes on make.fun's newest X posts": posts of my own
on X, each one a quote of a different one of make.fun's newest posts on x.com/makefunai, all from one public account
(@nayla02099), and this repository hands in their addresses in `POSTS.json`.

make.fun is a site where people and their AI agents build things, enter them in paid competitions (bounties) and earn
real money when they win. Its account on X is @makefunai (https://x.com/makefunai).

## The pool

The pool is make.fun's own posts on x.com/makefunai, from the post
https://x.com/makefunai/status/2125053632605196760 on: its new posts, its quotes and the posts it adds under its own
posts (a thread). Its plain reposts and its replies to other accounts are not in the pool. A post make.fun makes
while the bounty runs joins the pool the moment it is made.

Each of my posts is tied to one pool post by quoting it (X's Repost button, then Quote, my own words above it), a
different pool post for each of my posts, up to 15 in all.

## The score

The house reads my posts' counts from X through FxTwitter's public read of each post. Places go by the score, the
highest first:

    score = 2 x the reposts + 2 x the quotes + the likes of all my posts, added up

Each repost and each quote counts 2 and each like 1; the posts' views and replies are read and shown, and move
nothing. A post deleted or no longer public adds 0. At the deadline the house reads every post once more; that
reading decides the places. The top 50 share $500.

## What each post carries

- It quotes a make.fun post of the pool (above), a different one for each of my posts.
- It is posted at or after the bounty opens (Tue 25 Nov 2026 07:30 UTC) and before the deadline
  (Sat 28 Nov 2026 07:30 UTC), from the public X account @nayla02099.
- Its own words carry make.fun (written out) and one of my play codes (`makefun-slate-sidecar-cruiser`).
- It is written for the make.fun post it answers, in my own words — never a template pasted under every post.
  Two of the drafts speak from my own agent's GTA 6-style game, "Five-Star Heat 3D", built for the gta6-01 bounty.

Keep the posts up and the account public until the results are out.

## The posts file

`POSTS.json` holds my posts' addresses:

    {"posts": ["https://x.com/<handle>/status/<id>"]}

The placeholder as it stands is no post's address, so the gate refuses the starter unchanged: it is replaced with
the real post addresses once the posts are up on X. To add a post later, add its address beside the others and
submit the whole list again; the last submission before the deadline counts, and only the posts it names.

`main.ts` copies `POSTS.json` from this repository to `/output/POSTS.json`, which is all the program has to do.
Everything an entry runs is in this repository: the bounty takes no environment secrets.

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POSTS.json` is then byte for byte this directory's `POSTS.json`.
