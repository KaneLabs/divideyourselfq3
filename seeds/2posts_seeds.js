exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then( () => {
      return Promise.all([
        // Inserts seed entries
        knex('posts').insert({
          user_id: 1,
          title: 'Rattlesnake Gulch Trail',
          body: 'There is great rock climbing in rattlesnake gulch trail in Boulder, CO',
          media_url: 'http://www.thetrailgirl.com/wp-content/uploads/2012/04/onthetrail.jpg,http://www.thetrailgirl.com/wp-content/uploads/2012/04/pano11.jpg',
          lat: 39.926759,
          lng: -105.293428,
          type: 'board',
          timestamp: 1469469244841,
          points: 17
        }),
        knex('posts').insert({
          user_id: 2,
          title: 'Devils Thumb Boulder, CO',
          body: 'The Devils thumb is an easily viewable rock formation in Boulder, CO. The trail starts at NCAR',
          media_url: 'http://www.airphotona.com/stockimg/images/07106.jpg,http://www.colorado-hiking.net/pix_sc/devthumtrailstart.gif',
          lat: 39.952135,
          lng: -105.290241,
          type: 'board',
          timestamp: 1469412343124,
          points: 0
        }),
        knex('posts').insert({
          user_id: 3,
          title: 'Another Great View',
          body: 'A short hike up the trail reveals this great view.',
          media_url: 'https://res.cloudinary.com/dmuipy77o/image/upload/a_0/v1469822649/IMG_0045_zqr3wf.jpg',
          lat: 40.002490,
          lng: -105.285039,
          type: 'board',
          timestamp: 1469469244841,
          points: 15
        }),
        knex('posts').insert({
          user_id: 4,
          title: 'Everest Basecamp',
          body: 'Morning Helicopter Flight',
          media_url: 'http://peterrichardsphotography.com/wp-content/uploads/2015/09/Peter_Richards_50images__491.jpg',
          lat: 28.0072,
          lng: 86.8594,
          type: 'board',
          timestamp: Date.now() - 123972,
          points: 40
        }),
        knex('posts').insert({
          user_id: 4,
          title: 'Summit at Jackson Hole',
          body: 'More fun than a cable-car',
          media_url: 'http://peterrichardsphotography.com/wp-content/uploads/2015/09/Peter_Richards_50images__361.jpg',
          lat: 43.597467,
          lng: -110.868530,
          type: 'board',
          timestamp: Date.now() - 43829,
          points: 26
        }),
        knex('posts').insert({
          user_id: 4,
          title: 'Break time',
          body: 'Trying to stay in the shade',
          media_url: 'http://peterrichardsphotography.com/wp-content/uploads/2015/09/Peter_Richards_50images__18.jpg',
          lat: -7.132851,
          lng: 35.855008,
          type: 'board',
          timestamp: Date.now() - 39204,
          points: 33
        }),
        knex('posts').insert({
          user_id: 4,
          title: 'Northern Lights',
          body: 'Worth the trip',
          media_url: 'http://peterrichardsphotography.com/wp-content/uploads/2015/09/Peter_Richards_50images__20.jpg',
          lat: 64.143788,
          lng: -16.465073,
          type: 'board',
          timestamp: Date.now() - 28392,
          points: 4
        }),
        knex('posts').insert({
          user_id: 3,
          title: 'Burnt Head, Monhegan Island',
          body: 'Spectacular views an easy .25-mile from the town',
          media_url: 'http://static1.squarespace.com/static/555110b9e4b02fc9d3e15891/t/55bcf8fbe4b07309dc56522f/1438447871397/',
          lat: 43.759653,
          lng: -69.313388,
          type: 'board',
          timestamp: Date.now() - 38492,
          points: 247
        }),
        knex('posts').insert({
          user_id: 3,
          title: 'Cadillac Mountain Sunrise',
          body: 'Cadillac Mountain has a reputation as the first place in the continental United States to see the sun rise. This is actually true for about half of the year, during the fall and winter. During the Spring and Summer, Mars Hill--about 150 miles to the northeast, sees the first sunrise. But Cadillac Mountain is still a beautiful place to be in the morning.',
          media_url: 'https://c1.staticflickr.com/9/8448/7956521252_25fe984da9_b.jpg',
          lat: 44.352581,
          lng: -68.225104,
          type: 'board',
          timestamp: Date.now() - 26491,
          points: 421
        }),
        knex('posts').insert({
          user_id: 3,
          title: 'Surfing in Higgins Beach',
          body: 'This is a classic beach break in Maine. Access is through a residential neighborhood and parking is strictly policed. You\'ll want to park about a half-mile up the road and be prepared for a walk. If you are surfing between October and May, the parking is a lot easier (and the surf is better, too).',
          media_url: 'https://s-media-cache-ak0.pinimg.com/736x/87/7c/68/877c686020b2be97a6b3238815df47a6.jpg',
          lat: 43.561816,
          lng: -70.275256,
          type: 'board',
          timestamp: Date.now() - 26794,
          points: 304
        }),
        knex('posts').insert({
          user_id: 3,
          title: 'Mt. Katahdin',
          body: 'This is the end of the road for the Appalachian Trail and is located near the Hundred-Mile Wilderness.',
          media_url: 'https://marinomnom.files.wordpress.com/2015/07/mt-katahdin-6.jpg',
          lat: 45.904400,
          lng: -68.921565,
          type: 'board',
          timestamp: Date.now() - 24892,
          points: 279
        }),
        knex('posts').insert({
          user_id: 3,
          title: 'Rock-climbing at Bradbury Mountain',
          body: 'Love this state park. It\'s only about 20 minutes from Portland and has lots of granite walls that are great for climbing.',
          media_url: 'https://www.mountainproject.com/images/8/75/106860875_medium_ab9a0f.jpg',
          lat: 43.902578,
          lng: -70.182274,
          type: 'board',
          timestamp: Date.now() - 24692,
          points: 124
        }),
        knex('posts').insert({
          user_id: 3,
          title: 'Wolfe\'s Neck Woods',
          body: 'Great coastal hikes in a this state park.',
          media_url: 'http://www.freeportusa.com/wp-content/uploads/2012/07/Wolf-Neck-17.jpg',
          lat: 43.822700,
          lng: -70.087624,
          type: 'board',
          timestamp: Date.now() - 28462,
          points: 289
        }),
        knex("post").insert({
          user_id: 2,
          title: "Almagre Mountain",
          body: "Looks like the big elf statues from Lord of the Rings",
          media_url: "https://lh4.googleusercontent.com/-ceZrg8a-TXc/VzT2oFLveVI/AAAAAAAAEFI/93mg4wKanMkcHpBZ8dukWxp3xNcuLXLQgCL0B/w907-h424-no/CathedralRocksAutumn.jpg",
          lat: 38.780872,
          lng: -105.031987,
          type: "board",
          timestamp: Date.now() - 65109,
          points: 12
        }),
        knex("post").insert({
          user_id: 1,
          title: "Cow Mountain",
          body: "I'd rather have a cow than a mountain.",
          media_url: "http://www.mountainphotographer.com/wp-content/uploads/2008/07/cowcreeksample.jpg",
          lat: 38.6810382,
          lng: -105.0386468,
          type: "board",
          timestamp: Date.now() - 10294,
          points: 821
        }),
        knex("post").insert({
          user_id: 4,
          title: "Walmart Super Center in Falcon",
          body: "It's got twice as much shit produced by twice as many chinese children.",
          media_url: "https://lh3.googleusercontent.com/-NUaDqMKDSPg/VuCr6y-pRKI/AAAAAAAAADM/xcXc9fHpk1AXg84ZiWl48lL1t5_dSRydACL0B/w908-h606-no/photo.jpg",
          lat: 38.9354128,
          lng: -104.6212255,
          type: "board",
          timestamp: Date.now() - 41591,
          points: 2
        }),
        knex("post").insert({
          user_id: 3,
          title: "Grand Lake",
          body: "It's a grand lake, but not a great lake.",
          media_url: "https://static.panoramio.com.storage.googleapis.com/photos/large/113274329.jpg",
          lat: 40.2473806,
          lng: -105.8382626,
          type: "board",
          timestamp: Date.now() - 12973,
          points: 50
        }),
        knex("post").insert({
          user_id: 2,
          title: "Mt. Elbert",
          body: "Elbert should have come up with a better name but his ego got in the way.",
          media_url: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Mt._Elbert.jpg",
          lat: 38.992061,
          lng: -106.5970281,
          type: "board",
          timestamp: Date.now() - 12873,
          points: 272
        }),
        knex("post").insert({
          user_id: 1,
          title: "Mt. Harvard",
          body: "The closest most people in the midwest will get to Harvard.",
          media_url: "http://coloradoguy.com/mount-harvard/mount-harvard-colorado-summit.jpg",
          lat: 38.9244389,
          lng: -106.3205788,
          type: "board",
          timestamp: Date.now() - 90108,
          points: 63
        }),
        knex("post").insert({
          user_id: 2,
          title: "Mt. Rosa",
          body: "This mountain lead the mountain rights movement of '92.",
          media_url: "http://actionmatrix.com/Trails/Rosa/Images/Rosa018_Summit.jpg",
          lat: 38.7541526,
          lng: -104.9655381,
          type: "board",
          timestamp: Date.now() - 18315,
          points: 72
        }),
        knex("post").insert({
          user_id: 3,
          title: "Mt. Evans",
          body: "This mountain should have said no to the Fantastic Four movie.",
          media_url: "https://cdn-co.milespartnership.com/sites/default/master/files/mountevansbyway2_MI.jpg",
          lat: 39.5248291,
          lng: -105.7445384,
          type: "board",
          timestamp: Date.now() - 86123,
          points: 81,
        knex('posts').insert({
          user_id: 5,
          title: 'Seven Falls',
          body: 'Beautiful oasis that cuts through Sonoran Desert landscape.',
          media_url: 'https://res.cloudinary.com/dmuipy77o/image/upload/v1469822745/IMG_0067_au1yso.jpg',
          lat: 32.32659,
          lng: -110.76588,
          type: 'board',
          timestamp: Date.now() - 26921,
          points: 128
        }),
        knex('posts').insert({
          user_id: 5,
          title: 'Marshall\'s Gulch',
          body: 'Small hut built from fallen pine trunks built at the top of a small peak.',
          media_url: 'https://res.cloudinary.com/dmuipy77o/image/upload/v1469822718/IMG_0060_gp4oqt.jpg',
          lat: 32.42605,
          lng: -110.76484,
          type: 'board',
          timestamp: Date.now() - 26719,
          points: 92
        }),
        knex('posts').insert({
          user_id: 5,
          title: 'Sabino Canyon National Park',
          body: 'Water can be found here almost year-round and thousands of saguaros guide your path.',
          media_url: 'https://res.cloudinary.com/dmuipy77o/image/upload/v1469822601/IMG_0024_qwzy0f.jpg',
          lat: 32.20553,
          lng: -110.62477,
          type: 'board',
          timestamp: Date.now() - 23709,
          points: 14
        }),
        knex('posts').insert({
          user_id: 5,
          title: 'Butterfly Trailhead',
          body: 'This view is just a mile into the trail and provides a great view of the whole city below.',
          media_url: 'http://res.cloudinary.com/dmuipy77o/image/upload/v1469822491/IMG_0029_gk5u1z.jpg',
          lat: 32.42981,
          lng: -110.72536,
          type: 'board',
          timestamp: Date.now() - 25178,
          points: 21
        }),
        knex('posts').insert({
          user_id: 5,
          title: 'Sunset in Tucson',
          body: 'Low clouds mean colorful sunsets in the southwest.',
          media_url: 'https://res.cloudinary.com/dmuipy77o/image/upload/v1469822543/IMG_0513_bxyhhl.jpg',
          lat: 32.25201,
          lng: -110.88569,
          type: 'board',
          timestamp: Date.now() - 27132,
          points: 235
        }),
        knex('posts').insert({
          user_id: 5,
          title: 'Sedona Sunset',
          body: 'The red rocks glow in the red light cast by the sunset near the vortexes',
          media_url: 'https://res.cloudinary.com/dmuipy77o/image/upload/v1469822673/IMG_0109_di7v05.jpg',
          lat: 34.87036,
          lng: -111.77481,
          type: 'board',
          timestamp: Date.now() - 25132,
          points: 12
        })
      ]);
    });
};
