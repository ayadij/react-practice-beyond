
`npm run start`

`npm run test`

`npm run build`

'npm install'

---

### branch off of a branch

`git checkout -b myFeature dev`

---

### resolve merge conflicts on MR branch

`git checkout master`

`git pull`

`git checkout branch-name`

`git merge master`

_make changes_

`git commit -m "merge master"`

`git push origin branch-name`

---

### delete local branch

`git branch -d branch-name`

---

### unstage

`git reset --soft HEAD^`


---

### stash

`git stash`

`git stash pop`


---

### revert

`git log`

`git reset soft 149871048127098471208741029873018doiwueh2983u`

`git `

https://backlog.com/git-tutorial/stepup/stepup1_1.html


---


`ssh-add -K ~/.ssh/id_rsa`


---

### docker

`docker-compose up -d`

`docker-compose down`

`docker-compose build web`

`docker-compose run web python manage.py migrate`

`docker-compose run web python manage.py createsuperuser`


---

### pull then push with rebase

`git add .`

`git commit -m “commit message”`

`git pull —rebase origin branch-name`

`git push origin branch-name -f`


---

### revert back one commit

`git reset --hard HEAD~1`

---



---



