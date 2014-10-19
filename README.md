# Twitter Challenge
Started from my [Foundation Skeleton](https://github.com/ziad-saab/foundation-skeleton)

## Development mode
```
grunt dev
```

Will start SASS watcher, Webpack JS compiler and Foreman. `/web` is symlinked to `/src`
Foreman serves the app from `http://localhost:5000/`

## Deploy to Heroku
```
git checkout deploy
git merge master
grunt build
git commit --message 'deploying to heroku'
# optionally git tag x.x.x
git push heroku deploy:master
```

On the deploy branch, `/web` is symlinked to `/dist` instead of `/src`. 

*TODO*: create a Grunt task for deployment to Heroku

*NOTE*: To host on Heroku, make sure you add

```
heroku config:set BUILDPACK_URL=https://github.com/heroku/heroku-buildpack-php
```

Otherwise the app will be detected as a NodeJS app because of the presence of `package.json` at the root.
