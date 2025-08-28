import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (!error && user) {
      await supabase.from('users').insert([{ id: user.id, name, email }]);
      alert('Account created!');
    } else {
      alert(error?.message);
    }
  }

  return (
    <form onSubmit={handleSignup} className="max-w-md mx-auto p-8 bg-white rounded-xl shadow space-y-4">
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 border rounded" />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-2 border rounded" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-2 border rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>
    </form>
  );
}
