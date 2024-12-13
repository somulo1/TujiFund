import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* TODO: Add login form fields */}
    </form>
  );
};

export default Login;

