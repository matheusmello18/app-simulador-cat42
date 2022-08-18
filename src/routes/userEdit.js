import React from 'react';

import useAuth from 'hooks/useAuth';
import MyUserEdit from 'components/pages/dashboard/UserEdit';

const UserEdit = () => {
  const { user } = useAuth();

  return (
    <MyUserEdit user={user} />
  );
};

export default UserEdit;