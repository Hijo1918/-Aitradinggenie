import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Account() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  if (!user) return <div className="p-8">Please log in.</div>;

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Welcome, {user.email || user.name}</h2>
      <p>User ID: {user.id}</p>
      {/* Add more account info and actions here */}
    </div>
  );
}
