import { useState } from "react";

const usePermission = (userRole: string) => {
  const [user, setUser] = useState({
    username: "john_doe",
    role: "TA", // 'user', 'editor', etc.
  });

  const hasRole = (role: any) => user.role === role;

  return hasRole;
};

export default usePermission;
