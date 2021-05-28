# Progressive Web App

Starting From Scratch

To explore the Angular 5 Service Worker functionality let’s start from
scratch. First let’s create a new project by using Angular CLI on your
system. In order to create a new project we’re using Angular CLI 1.6
which is still in release candidate version. Using Angular CLI 1.5
(which is the current version) is not sufficient in this case as service
worker support for Angular 5 is added in version 1.6. If you haven’t
installed Angular CLI 1.6 on your system yet you can do so by using the
following command:

\$ npm install -g @angular/cli@next

The *@next* postfix is used together with the package
name *@angular/cli* to indicate that version 1.6 should be installed.
Once version 1.6 is released the @next postfix is no longer needed.

Having installed Angular CLI successfully you can check the version by
using the following command:

\$ ng --version

The output should correspond to what you can see in the following
screenshot:

![](media/image1.png){width="10.666666666666666in" height="8.5625in"}

![](media/image2.png){width="10.666666666666666in" height="8.5625in"}

The screenshot shows that we’re using Angular CLI version 1.6.0-rc.0 for
this tutorial.

Next, a new project can be created with by using command:

\$ ng new angularpwa --service-worker

A new directory *angularpwa* is created, the project template is
downloaded and dependencies are installed automatically. Furthermore the
Angular 5 service worker functionality is activated and the
package *@angular/service-worker* is installed as part of the
dependencies.

You can check that the service worker activation was done by opening
file *.angular-cli.json* and search for the following configuration
setting:

*"serviceWorker"*: true

This is telling Angular CLI to add a service worker when building the
application.

Trying Out The Default Service Worker

Let’s try out the default service worker.

If you’re starting up the development web server with

\$ ng serve --open

and check the Application tab in the Chrome Developer Tools you’ll
notice that no service worker is active. The reason is that Angular CLI
is not activating the servicer worker when we’re in development mode.
Instead you first have to build your application for production by
using:

\$ ng build --prod

The production build of the application is made available in
the *dist* subfolder. To make the content of the *dist* server available
via a web server you can use any static web server like *http-server*.

The live-server project’s website can be found
at [*https://github.com/indexzero/http-server*](https://github.com/tapio/live-server).
To install *http-server* globally on your system just use the following
command:

\$ npm install http-server -g

Now you can start *http-server *right inside the *dist *folder:

\$ http-server

The following screenshot shows the output in the terminal:

![](media/image3.png){width="10.666666666666666in" height="3.65625in"}

![](media/image4.png){width="10.666666666666666in" height="3.65625in"}

The application is made available
at [*http://127.0.0.1:8080*](http://127.0.0.1:8080/) and the page is
loaded in the browser automatically, so that you should be able to see
the following output:

![](media/image5.png){width="10.666666666666666in"
height="7.927083333333333in"}

![](media/image6.png){width="10.666666666666666in"
height="7.927083333333333in"}

If you now open up the Chrome Developer Tools you can see the active
server worker on the *Application* tab.

![](media/image7.png){width="10.666666666666666in"
height="8.145833333333334in"}

![](media/image8.png){width="10.666666666666666in"
height="8.145833333333334in"}

If you scroll down to the *Cache Storage* section you can see that the
storage is filled with all assets of our application.

![](media/image9.png){width="10.666666666666666in"
height="7.583333333333333in"}

![](media/image10.png){width="10.666666666666666in"
height="7.583333333333333in"}

With all assets in the browser cache we can now stop the web server (to
simulate that the network connection to the server is not available:

![](media/image11.png){width="10.666666666666666in" height="3.65625in"}

![](media/image12.png){width="10.666666666666666in" height="3.65625in"}

Now try to reload the page in the browser. You’ll get the exact same
result as before. The HTTP request is not fulfilled by the installed
service worker with assets from the cache.

Taking A Look Into The Code

Now that you saw the Angular Service Worker in action let’s take a look
at the code of our project. If you’re opening
file *src/app/app.module.ts* you should be able to find the following
source code:

import { BrowserModule } from '@angular/platform-browser';\
import { NgModule } from '@angular/core';import { ServiceWorkerModule }
from '@angular/service-worker';\
import { AppComponent } from './app.component';\
import { environment } from '../environments/environment';@NgModule({\
declarations: \[\
AppComponent\
\],\
imports: \[\
BrowserModule,\
environment.production ? ServiceWorkerModule.register('/ngsw-worker.js')
: \[\]\
\],\
providers: \[\],\
bootstrap: \[AppComponent\]\
})\
export class AppModule { }

First, let’s take a look at the import
statement. *ServiceWorkerModule* is imported from
the *@angular/service-worker* package. It’s needed to import that module
to register the service worker (which is available in
file* ngsw-worker.js*) for our application. The registration is done in
the array which is assigned to the imports property of
the *@NgModule* decorator with the following line of code:

environment.production ? ServiceWorkerModule.register('/ngsw-worker.js')
: \[\]

Important to note is that fact that the service worker registration is
only done by
calling *ServiceWorkerModule.register(‘/ngsw-worker.js’)* only if we’re
in production mode (if *environment.production* is *true*).

Service Worker Configuration

The Service Worker script which is preinstalled (*ngsw-worker.js*) is a
generic service worker which can be configured.

Here is the content of the default Service Worker configuration file
which is available in file* src/ngsw-config.json*:

{\
"index": "/index.html",\
"assetGroups": \[{\
"name": "app",\
"installMode": "prefetch",\
"resources": {\
"files": \[\
"/favicon.ico",\
"/index.html"\
\],\
"versionedFiles": \[\
"/\*.bundle.css",\
"/\*.bundle.js",\
"/\*.chunk.js"\
\]\
}\
}, {\
"name": "assets",\
"installMode": "lazy",\
"updateMode": "prefetch",\
"resources": {\
"files": \[\
"/assets/\*\*"\
\]\
}\
}\]\
}

This JSON object contains two configuration properties on the first
level:

-   *index*: Pointing to the *index.html* file of the project

-   *assetGroup*: contains the configuration objects for assets of the
    > projects which should be part of the caching which is managed by
    > the Service Worker

The *assetGroup *consists of two objects: *app *and *assets*.

The *app *asset group contains the static
files *favicon.ico* and *index.html*. Furthermore the versioned
JavaScript and CSS bundle files are included. For those elements
the *installMode *is set to *prefetch *which means that those file are
perfetch and added to the cache at once. This is needed because these
items are essential for the application to work offline.

The *assets* asset group is configuring is containing the configuration
for caching all elements in the assets folder of our project. For those
items the *installMode *is set to *lazy *which means that the those
items are added to the cache as they are requested.

Extending The Configuration

The default configuration is caching the assets from a bare-bone Angular
project. If you’re extending your application with resources from
external locations (e.g. fonts, images, …) or data which is retrieved
from an API endpoint you need to further extend the configuration of the
Service Worker.

Caching External Resources

For adding external resources which are needed by the app to the caching
you need to add *urls* property to the *resources *object. The following
example shows how you can add a url pattern for caching all Google Fonts
used by the application easily:

{\
"name": "assets",\
"installMode": "lazy",\
"updateMode": "prefetch",\
"resources": {\
"files": \["/assets/\*\*"\],\
"urls": \[\
"https://fonts.googleapis.com/\*\*"\
\]\
}\
}

Caching Content From External APIs

If you’d like to cache content retrieved from external APIs you should
introduce a new *dataGroups* section on the same level as *assetGroups*.
In the following code excerpt you can see an example configuration for
endpoints */tasks* and */users*. Those two resources will be cached with
a strategy of *freshness *for a maximum of 20 responses with a maximum
age of 1 hours and a timeout of 5 seconds.

"dataGroups": \[\
{\
"name": "tasks-users-api",\
"urls": \["/tasks", "/users"\],\
"cacheConfig": {\
"strategy": "freshness",\
"maxSize": 20,\
"maxAge": "1h",\
"timeout": "5s"\
}\
}\
\]

By using *freshness *as the strategy we’re configuring a network-first
strategy. You can change that to a cache-first strategy by using
value *performance *instead.



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
