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
        })
      ]);
    });
};
