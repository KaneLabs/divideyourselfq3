# divideyourselfq3

https://www.pivotaltracker.com/n/projects/1674691

https://s3-us-west-2.amazonaws.com/divideyourself.com/images/MVPLite-Mockup.png

I set up the Git master to automatically deploy to:
https://divideq3.herokuapp.com/

database is called dividedb

## MVP-Lite


### JWT Auth

/Signup:
- ~~create signup route~~
- ~~Create a form with email, username and password~~
- get last location with geolocation API
- ~~email and username need to be unique~~
- ~~Encrypt password with bcrypt~~
- ~~store email, username, pass and lastLat, lastLng~~
- redirect to users profile upon success

/Signin:
- ~~create signin route~~
- ~~create a form with email OR username and password~~~
- ~~use bcrypt to check if password matches~~~
- redirect to /:location upon success

/Signout:
- ~~create signout route~~
- ~~not sure about the specifics with JWT~~
- redirect to a "goodbye" page

### POSTING

API Interface = [
  {
    author: '',
    description: '',
    uploadedImages: '',
    links: '',
    respect: 0,
    disrespect: 0,
    comments: [
      {
        author: '',
        comment: '',
        respect: 0,
        disrespect: 0
      },
      {
        author: '',
        comment: '',
        respect: 0,
        disrespect: 0
      },
      {
        author: '',
        comment: '',
        respect: 0,
        disrespect: 0
      }
    ]
  }
  ...
]

###### add route for /:location GET

Google Maps:
- ~~load google map for that location~~
- load top 16 posts for that location from db
- load park maps for that location from db
- plot top 16 posts on map
- plot hiking maps to Maps location

Display top 16 posts below google maps

Posts have a description directly below image

Posts have a footer with:
- username
- rating bar with 5 circles
- grab button

Post Button:
- add post button to main route
- open post form on post icon click

Switch Cities:
- add text input search to switch to different routes
- navigate to different /:location on submit

###### add route for /:location POST

Post form fields:
- multi-image upload
- url to image/video
- description

Post must include:
- image or url to image/video
- description


### REVIEWS COMMENTS AND RESPECT

Reviews:
- add 5 circles for leaving reviews to each post
- you can rate a post (-5 to +5)
- .5 a star = 1 respect point
- on click form pops up for reviews
- requires a textfield description
- text field

Comments:
- can leave comments on reviews
- upvote or downvote comments (-1 to +1)
- comments sorted by popularity

Respect:
- -5 to +5 on Reviews
- -1 to +1 on comments

### User Profiles
- display latest posts
- display profile image
- display respect
- display tribe name

### Grabbing Posts
- save grabbed posts to /:username/myknowledge

### Design

Material Design Philosophy:
- Everything has 1px shadow for depth
- https://material.google.com/what-is-material/material-properties.html

Mobile First:
- Don't even think about desktop for MVP-Lite.


## MVPlus - Social

#### Tribes

#### Friends

#### OAuth

## Stretch
1. Live Chat
2. Users can put Google ad services on their content
