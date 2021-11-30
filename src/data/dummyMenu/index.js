import React from 'react';
import { IconChangePassword, IconEditProfile, IconHistory, IconSignOut } from "../../assets";

export const dummyMenu = [
  {
    id: 1,
    name: 'Edit Profile',
    image: <IconEditProfile />,
    page: 'EditProfile'
  },
  {
    id: 2,
    name: 'Change Password',
    image: <IconChangePassword />,
    page: 'ChangePassword'
  },
  {
    id: 3,
    name: 'History Pemesanan',
    image: <IconHistory />,
    page: 'History'
  },
  {
    id: 4,
    name: 'Sign Out',
    image: <IconSignOut />,
    page: 'Login'
  },
];