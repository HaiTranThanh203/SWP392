import React, { useEffect, useState } from 'react';
import { getListUser } from '../services/UserAdminService'; // Điều chỉnh đường dẫn nếu cần

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Các tham số mặc định
  const page = 1;
  const limit = 5;
  const status = '';
  const email = '';
  const username = '';

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getListUser(page, limit, status, email, username);
        console.log("Response:", response);
        // Giả sử response trả về dạng { data: [...] }
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user list:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Trang Chủ 🚀</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
