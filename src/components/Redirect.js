/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Redirect({ to }) {
  const navigate = useNavigate();
  useEffect(() => navigate(to), []);
  return null;
}

export default Redirect;
