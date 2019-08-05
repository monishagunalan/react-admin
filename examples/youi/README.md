# You.i AdminUI

The AdminUI for administering You.i applications.

## How to run

After having cloned the repository, run the following command from the ```react-admin directory```:

```yarn install```

AFter downloading the internet, run the following commmand:

```make run-youi```

Finally browse to [http://localhost:8080/](http://localhost:8080/).

The credentials are **login/password**

## The basics

There is no App.js file, instead we're keeping things simple and just using index.js, which is where you should start if you're reading this for the first time.  The next pit stop should be the layout directory, which is where you'll find the Menu and links to how the content is rendered.

## Trouble-shooting

When all else fails, delete both node_modules directories and any .lock files and re-run ```yarn install```

## CI/CD

TODO: connect Jenkins, deploy to S3Stage and, ultimately S3Prod.

## Contributing

The team welcomes contributions to our project. Merging directly to master is forbidden, so please create a branch, push, and start a pull request (PR).
