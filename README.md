# Web App ionio

Web App ionio is a cloud-enabled, mobile-ready, AngularJS social network.
  - Create a profile.
  - Create your personal product information.
  - Create articles about your product.
  - Create technical notes about your product.

You can also:
  - Add comments and replies inside one article.
  - Make changes into your article.
  - See and change the credentials of your profile.

Web App ionio is a MEAN stack Single Page Application with the relevant RESTful API for creating products info, articles and comments/replies.

Web App ionio is also [Openshift](https://www.openshift.com/) ready. Create account and deploy.

### Tech

Web App ionio uses a number of open source projects to work properly:

* [MongoDB] - noSQL Database.
* [Express] - fast node.js network app framework.
* [AngularJS] - HTML enhanced for web apps.
* [Node.js] - evented I/O for the backend.
* [Bootstrap] - UI boilerplate for modern web apps.

### Installation

Web App ionio requires [Node.js](https://nodejs.org/) and [mongoDB] in order to run.

Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/kala2/ProjectWebAppionio.git
$ cd ProjectWebAppionio
$ npm install
$ node server.js
```

For Openshift upload. 
- create your [application](https://developers.openshift.com/languages/nodejs/getting-started.html).
- Copy the files into your local repo.
- Replace the existing files with the Web App ionio files.

Next.
```sh
$ cd yourappname
$ git add .
$ git commit -m "Openshift app"
$ git push
```





[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [@thomasfuchs]: <http://twitter.com/thomasfuchs>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [Node.js]: <http://nodejs.org>
   [mongoDB]: <https://www.mongodb.com/>
   [Bootstrap]: <http://getbootstrap.com/>
   [keymaster.js]: <https://github.com/madrobby/keymaster>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]:  <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
