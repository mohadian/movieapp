#movieapp

forked this from [original](https://github.com/junedomingo/movieapp) to try out SharedElementTransition 

<h1 align="center">
  <img src="./MovieApp.gif"/><br>
  SharedElementTransition
</h1>

![movieapp-screenshots_big_iphone_](https://cloud.githubusercontent.com/assets/5106887/20606597/f176b3e2-b2ac-11e6-9163-c9e625df7748.png)


### Requirements
- [Node](https://nodejs.org/) >= 5.0.0
- [npm](https://npmjs.com) >= 3

### Installation

Clone this repo

```sh
$ git clone git@github.com:damathryx/movieapp.git
$ cd movieapp
$ yarn install or npm install
```

Create `.env` file in your root directory and add the following

```sh
TMDB_URL=https://api.themoviedb.org/3
TMDB_IMG_URL=https://image.tmdb.org/t/p
TMDB_API_KEY=your_tmdb_api_key_here

YOUTUBE_URL=https://www.googleapis.com/youtube/v3/videos
YOUTUBE_API_KEY=your_youtube_api_key_here

```
Get api key -
[TMDB](https://www.themoviedb.org/) -
[Youtube](https://console.developers.google.com)

### How to start
```sh
$ react-native run-android
$ react-native run-ios
```
