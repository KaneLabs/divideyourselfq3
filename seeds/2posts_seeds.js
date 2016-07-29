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
          title: 'Another Posts in Boulder',
          body: 'There is great rock climbing in rattlesnake gulch trail in Boulder, CO',
          media_url: 'http://www.thetrailgirl.com/wp-content/uploads/2012/04/onthetrail.jpg,http://www.thetrailgirl.com/wp-content/uploads/2012/04/pano11.jpg',
          lat: 40.002490,
          lng: -105.285039,
          type: 'board',
          timestamp: 1469469244841,
          points: 15
        }),
        knex('posts').insert({
          user_id: 4,
          title: 'Boulder Post 5',
          body: 'The Devils thumb is an easily viewable rock formation in Boulder, CO. The trail starts at NCAR',
          media_url: 'http://www.airphotona.com/stockimg/images/07106.jpg,http://www.colorado-hiking.net/pix_sc/devthumtrailstart.gif',
          lat: 40.006172,
          lng: -105.287785,
          type: 'board',
          timestamp: 1469412343124,
          points: -3
        }),
        knex('posts').insert({
          user_id: 1,
          title: 'Boulder Post 6',
          body: 'There is great rock climbing in rattlesnake gulch trail in Boulder, CO',
          media_url: 'http://www.thetrailgirl.com/wp-content/uploads/2012/04/onthetrail.jpg,http://www.thetrailgirl.com/wp-content/uploads/2012/04/pano11.jpg',
          lat: 40.011133,
          lng: -105.284901,
          type: 'board',
          timestamp: 1469469244841,
          points: 1230
        }),
        knex('posts').insert({
          user_id: 1,
          title: 'Boulder Post 7',
          body: 'The Devils thumb is an easily viewable rock formation in Boulder, CO. The trail starts at NCAR',
          media_url: 'http://www.airphotona.com/stockimg/images/07106.jpg,http://www.colorado-hiking.net/pix_sc/devthumtrailstart.gif',
          lat: 40.012137,
          lng: -105.290107,
          type: 'board',
          timestamp: 1469412343124,
          points: 1
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
