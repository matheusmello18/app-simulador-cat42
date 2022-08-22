import React, { useEffect } from 'react';

import useAuth from 'hooks/useAuth';
import MyUserEdit from 'components/pages/dashboard/UserEdit';

const UserEdit = () => {
  const { user, account } = useAuth();



  useEffect(() => {
    const BuscaEtapa = async () => {
      var data = await account(user.DS_EMAIL);
      console.log(data);
    }

    BuscaEtapa();
  }, [user, account]);

  return (
    <MyUserEdit user={user} />
  );
};

export default UserEdit;