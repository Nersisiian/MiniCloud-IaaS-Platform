import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';

interface VM {
  id: string;
  name: string;
  state: string;
  vcpus: number;
  memory_mb: number;
  created_at: string;
}

export default function VmList() {
  const [vms, setVms] = useState<VM[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVMs = async () => {
    try {
      const res = await api.get('/vms/');
      setVms(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVMs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete VM?')) return;
    await api.delete(`/vms/${id}`);
    fetchVMs();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Virtual Machines</h2>
      <Link to="/vms/create">
        <button style={{ marginBottom: 20 }}>+ Create VM</button>
      </Link>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#eee' }}>
            <th>Name</th>
            <th>State</th>
            <th>vCPUs</th>
            <th>Memory (MB)</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vms.map(vm => (
            <tr key={vm.id} style={{ borderBottom: '1px solid #ccc' }}>
              <td>{vm.name}</td>
              <td>{vm.state}</td>
              <td>{vm.vcpus}</td>
              <td>{vm.memory_mb}</td>
              <td>{new Date(vm.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => handleDelete(vm.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
