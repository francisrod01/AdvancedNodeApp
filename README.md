# AdvancedNodeApp

Advanced code for Nodejs applications using Express.  
Author: [Francis Rodrigues](https://github.com/francisrod01)

### Setup environment

- Run `npm install` in the root of the project to install server dependencies
- Change into the client directory and run `npm install --legacy-peer-deps`
- Change back into the root of the project and run `npm run dev` to start the server
- Access the application at `localhost:3000` in your browser

**Important:**
The credentials for the Mongo Atlas DB in `dev.js` are read only. If you attempt to log in without first adding your own connection string (covered later in the course) you will see an error: `[0] MongoError: user is not allowed to do action [insert] on [advnode.users]`


## Implementing cache with Redis

```js
app.get('/api/blogs', requireLogin, async (req, res) => {
  const redis = require('redis');
  const util = require('util');

  const redisUrl = 'redis://127.0.0.1:6379';
  const client = redis.createClient(redisUrl);

  // Wraps client.get into a Promise.
  client.get = util.promisify(client.get);

  // Do we have any cached data in Redis related to this query.
  const cachedBlogs = await client.get(req.user.id);

  // if yes, then respond to the request right away and return it.
  if (cachedBlogs) {
    console.log('SERVING FROM CACHE..');
    return res.send(JSON.parse(cachedBlogs));
  }

  // if no, we need to respond to request and update our cache
  // to store the data
  const blogs = await Blog.find({ _user: req.user.id });

  console.log('SERVING FROM MONGODB..');
  res.send(blogs);

  client.set(req.user.id, JSON.stringify(blogs));
});
```

### Sources to learn more

- Starting project for a course on Advanced Node - [@Udemy][1]

### License

MIT


[1]: https://github.com/StephenGrider/AdvancedNodeStarter
