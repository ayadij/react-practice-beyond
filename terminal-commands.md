
`npm run start`
`npm run test`
`npm run build`

---

### branch off of a branch
- `git checkout -b myFeature dev`

---

### resolve merge conflicts on MR branch
- `git checkout master`
- `git pull`
- `git checkout branch-name`
- `git merge master`
- _make changes_
- `git commit -m "merge master"`
- `git push origin branch-name`

---

### unstage
`git reset --soft HEAD^`

---

### stash
- `git stash`
- `git stash pop`

---


ssh-add -K ~/.ssh/id_rsa