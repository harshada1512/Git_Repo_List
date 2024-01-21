// RandomUserPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GithubUserDetails from '../component/GithubUserDetails';
import Pagination from '../component/pagination';

const RandomUserPage = () => {
  const [randomUser, setRandomUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const randomUserResponse = await axios.get('http://localhost:3001/api/randomUser');
        const user = randomUserResponse.data;
        setRandomUser(user);

        const repositoriesResponse = await axios.get(`http://localhost:3001/api/userRepositories/${user.login}`);
        setRepositories(repositoriesResponse.data);

        // Assuming 10 repositories per page, calculate total pages
        const repositoriesCount = repositoriesResponse.data.length;
        const pages = Math.ceil(repositoriesCount / 10);
        setTotalPages(pages);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return randomUser ? (
    <div>
      <GithubUserDetails key={randomUser.id} user={randomUser} repositories={repositories} repositoriesPerRow={2} />
      <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/user/username1" />
    </div>
  ) : null;
};

export default RandomUserPage;
