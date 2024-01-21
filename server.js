const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Replace 'YOUR_ACCESS_TOKEN' with your GitHub personal access token
const GITHUB_ACCESS_TOKEN = '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';

app.get('/api/randomUser', async (req, res) => {
  try {
    const response = await axios.get('https://api.github.com/users', {
      params: {
        since: Math.floor(Math.random() * 300),
      },
      headers: {
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      },
    });

    const randomUser = response.data[0];
    res.json(randomUser);
  } catch (error) {
    console.error('Error fetching random user:', error.message);

    if (error.response && error.response.status === 403) {
      // Handle rate-limiting error
      console.error('Rate limit exceeded. Waiting before retrying...');
      // Wait for some time (e.g., 1 minute) before retrying
      await new Promise(resolve => setTimeout(resolve, 60000));
      // Retry the API request
      return app.get('/api/randomUser', req, res);
    }

    res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/userRepositories/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      },
    });

    const repositories = response.data;
    res.json(repositories);
  } catch (error) {
    console.error('Error fetching user repositories:', error.message);

    if (error.response && error.response.status === 403) {
      // Handle rate-limiting error
      console.error('Rate limit exceeded. Waiting before retrying...');
      // Wait for some time (e.g., 1 minute) before retrying
      await new Promise(resolve => setTimeout(resolve, 60000));
      // Retry the API request
      return app.get(`/api/userRepositories/${username}`, req, res);
    }

    res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});