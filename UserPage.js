// UserPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GithubUserDetails from '../component/GithubUserDetails';
import Pagination from '../component/pagination';

const UserPage = ({ params }) => {
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const username = params?.username; // Check if params is defined
      if (!username) {
        console.error('Username not provided.');
        return;
      }

      try {
        const userResponse = await axios.get(`http://localhost:3001/api/userRepositories/${username}`);
        setUser(userResponse.data);

        const repositoriesResponse = await axios.get(`http://localhost:3001/api/userRepositories/${username}`);
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
  }, [params]);

  return user ? (
    <div>
      <GithubUserDetails key={user.id} user={user} repositories={repositories} repositoriesPerRow={2} />
      <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={`/user/${params?.username}`} />
    </div>
  ) : null;
};

export default UserPage;
