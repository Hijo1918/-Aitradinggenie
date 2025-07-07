// /frontend/src/App.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

function App() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('your_table').select('*');
      if (error) console.error(error);
      else setData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Supabase Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
