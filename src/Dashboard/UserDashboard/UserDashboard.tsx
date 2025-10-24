import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Helmet } from "react-helmet-async";

interface IUser {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

export default function UserDashboard() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const queryClient = useQueryClient();

  //  Get Users
  const { data, isLoading, isError } = useQuery<IUser[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get<IUser[]>('https://68e4e1228e116898997d6e79.mockapi.io/signup');
      return data;
    },
    select: (data) => data.filter((user) => user.role === 'user'),
  });

  //  Delete User
  const deleteUser = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`https://68e4e1228e116898997d6e79.mockapi.io/signup/${id}`);
    },
    onSuccess: () => {
      toast.success('User deleted successfully', {
        position: 'top-center',
        autoClose: 1000,
      });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      toast.error('Failed to delete user', { position: 'top-center' });
    },
  });

  //  Update User
  const updateUser = useMutation({
    mutationFn: async (user: IUser) => {
      return await axios.put(
        `https://68e4e1228e116898997d6e79.mockapi.io/signup/${user.id}`,
        user
      );
    },
    onSuccess: () => {
      if (selectedUser?.role === 'admin') {
        toast.info('User role changed to Admin, removed from the table', {
          position: 'top-center',
          autoClose: 1000,
        });
      } else {
        toast.success('User updated successfully', {
          position: 'top-center',
          autoClose: 1000,
        });
      }
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setShowModal(false);
    },
    onError: () => {
      toast.error('Failed to update user', {
        position: 'top-center',
      });
    },
  });

  const handleEditClick = (user: IUser) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSaveChanges = () => {
    
      updateUser.mutate(selectedUser as IUser);
    
  };

  //  Loading & Error States
  if (isLoading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (isError) return <p className="text-center mt-5 text-danger">Error loading users</p>;

  const filteredUsers =
    data?.filter(
      (user) =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.id.toString().includes(search)
    ) || [];

  return (
    <>
    <Helmet>
        <title>User Dashboard</title>
        <meta charSet="utf-8" />
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <div className="container mt-2">
      <h2 className="mb-3 text-center">Users Dashboard</h2>
      <div className="mb-3">
        <div className="input-group" style={{ width: '300px' }}>
          <span className="input-group-text">
            <i className="bi bi-person"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by username or id..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped text-center align-middle shadow-sm rounded">
          <thead>
            <tr>
              <th style={{ width: '8%' }}>Id</th>
              <th style={{ width: '20%' }}>Name</th>
              <th style={{ width: '22%' }}>Email</th>
              <th style={{ width: '20%' }}>Role</th>
              <th style={{ width: '15%' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div className="d-flex justify-content-center flex-wrap gap-2">
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEditClick(user)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteUser.mutate(user.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedUser && (
        <div
          className="modal d-block fade show"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content shadow-lg rounded-4 p-4">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Edit User</h5>
                <button type="button" className="btn-close" onClick={handleModalClose}></button>
              </div>
              <div className="modal-body pt-3">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Username</label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    value={selectedUser.username}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, username: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control rounded-3"
                    value={selectedUser.email}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Role</label>
                  <select
                    className="form-select rounded-3"
                    value={selectedUser.role}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, role: e.target.value as 'user' | 'admin' })
                    }
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button
                  className="btn btn-danger w-100 rounded-3 fw-semibold"
                  onClick={handleSaveChanges}
                  disabled={updateUser.isPending}
                >
                  {updateUser.isPending ? (
                    <span className="spinner-border me-2" role="status"></span>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
    </>
  );
}
