'use client';
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "@/components/ui/navbar";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  console.log(user);
  console.log(isAuthenticated);

  return (
    isAuthenticated && (
      <div>
        <Navbar />
        <img src={user.picture} alt={user.name} />
        <p>{user.sub}</p>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;