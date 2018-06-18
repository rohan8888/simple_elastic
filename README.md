This app is developed and tested using node v9.3.0

To start using the app, simply run

```
node app.js
```
The app supports 2 APIs

```
POST /index
{
"id": "1",
"title": "quick fox",
"data": "A fox is usually quick and brown."
}

```
This creates the document in a text file in directory /documents and inverted indexes in /indexes folder.
The index stores information in sorted order according to occurence in title and term frequency.

```
GET /search?q=quick%20fox
```
This returns an array of results sorted according to the index which was previously created.