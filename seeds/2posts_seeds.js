exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
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
          timestamp: 1469469244841
        }),
        knex('posts').insert({
          user_id: 2,
          title: 'Devils Thumb Boulder, CO',
          body: 'The Devils thumb is an easily viewable rock formation in Boulder, CO. The trail starts at NCAR',
          media_url: 'http://www.airphotona.com/stockimg/images/07106.jpg,http://www.colorado-hiking.net/pix_sc/devthumtrailstart.gif',
          lat: 39.952135,
          lng: -105.290241,
          type: 'board',
          timestamp: 1469412343124
        }),
        knex('posts').insert({
          user_id: 3,
          title: 'Another Posts in Boulder',
          body: 'There is great rock climbing in rattlesnake gulch trail in Boulder, CO',
          media_url: 'http://www.thetrailgirl.com/wp-content/uploads/2012/04/onthetrail.jpg,http://www.thetrailgirl.com/wp-content/uploads/2012/04/pano11.jpg',
          lat: 40.002490,
          lng: -105.285039,
          type: 'board',
          timestamp: 1469469244841
        }),
        knex('posts').insert({
          user_id: 4,
          title: 'Boulder Post 5',
          body: 'The Devils thumb is an easily viewable rock formation in Boulder, CO. The trail starts at NCAR',
          media_url: 'http://www.airphotona.com/stockimg/images/07106.jpg,http://www.colorado-hiking.net/pix_sc/devthumtrailstart.gif',
          lat: 40.006172,
          lng: -105.287785,
          type: 'board',
          timestamp: 1469412343124
        }),
        knex('posts').insert({
          user_id: 1,
          title: 'Boulder Post 6',
          body: 'There is great rock climbing in rattlesnake gulch trail in Boulder, CO',
          media_url: 'http://www.thetrailgirl.com/wp-content/uploads/2012/04/onthetrail.jpg,http://www.thetrailgirl.com/wp-content/uploads/2012/04/pano11.jpg',
          lat: 40.011133,
          lng: -105.284901,
          type: 'board',
          timestamp: 1469469244841
        }),
        knex('posts').insert({
          user_id: 1,
          title: 'Boulder Post 7',
          body: 'The Devils thumb is an easily viewable rock formation in Boulder, CO. The trail starts at NCAR',
          media_url: 'http://www.airphotona.com/stockimg/images/07106.jpg,http://www.colorado-hiking.net/pix_sc/devthumtrailstart.gif',
          lat: 40.012137,
          lng: -105.290107,
          type: 'board',
          timestamp: 1469412343124
        })
      ]);
    });
};
