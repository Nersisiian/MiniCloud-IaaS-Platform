import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

export default function VmCreate() {
  const [form, setForm] = useState({
    name: '',
    vcpus: 2,
    memory_mb: 2048,
    disk_gb: 20,
    image_source: '/var/lib/minicloud/images/base-ubuntu-22.04.qcow2'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/vms/', form);
      alert(`Task created: ${res.data.id}`);
      navigate('/vms');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Creation failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 500 }}>
      <h2>Create New VM</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required />
        <label>vCPUs</label>
        <input name="vcpus" type="number" value={form.vcpus} onChange={handleChange} />
        <label>Memory (MB)</label>
        <input name="memory_mb" type="number" value={form.memory_mb} onChange={handleChange} />
        <label>Disk (GB)</label>
        <input name="disk_gb" type="number" value={form.disk_gb} onChange={handleChange} />
        <label>Base Image Path</label>
        <input name="image_source" value={form.image_source} onChange={handleChange} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Create</button>
        <button type="button" onClick={() => navigate('/vms')}>Cancel</button>
      </form>
    </div>
  );
}
