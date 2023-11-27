const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors()); // Enable CORS for all routes

// Rest of your server code...8


app.get('/v1/users', async (req, res) => {
    try {
      const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
      const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
  
      console.log('Fetched user data from:', 'https://jsonplaceholder.typicode.com/users');
      console.log('Fetched post data from:', 'https://jsonplaceholder.typicode.com/posts');
  
      const users = await usersResponse.json();
      const posts = await postsResponse.json();
  
      const combinedData = users.map(user => ({
        ...user,
        posts: posts.filter(post => post.userId === user.id)
      }));
  
      const searchText = req.query.searchText;
      if (searchText) {
        const filteredData = combinedData.filter(user =>
          user.name.toLowerCase().includes(searchText.toLowerCase())
        );
        res.json(filteredData);
      } else {
        res.json(combinedData);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});