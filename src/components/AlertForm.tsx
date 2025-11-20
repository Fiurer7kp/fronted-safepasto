import React, { useState } from 'react';
import { AlertService } from '../services/alertService';

const AlertForm: React.FC = () => {
  const [formData, setFormData] = useState({
    type: 'security',
    description: '',
    location: '',
    severity: 'medium'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const alertData = {
        type: formData.type as any,
        location: formData.location || 'Pasto, Nariño',
        coordinates: { lat: 0, lng: 0 },
        severity: formData.severity as any,
        description: formData.description,
        status: 'active' as const,
      };
      await AlertService.createAlert(alertData);
      setSuccess('Alerta reportada correctamente');
      setFormData({
        type: 'security',
        description: '',
        location: '',
        severity: 'medium'
      });
    } catch (err) {
      setError((err as Error).message || 'Error reportando alerta');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const canSubmit = formData.description.trim().length >= 10 && !loading;

  return (
    <div className="alert-form-container">
      <div className="alert-form-content">
        <div className="card">
          <h3>📢 Report Alert</h3>
          <form onSubmit={handleSubmit} className="form-grid">
            <label>
              Alert Type
              <select 
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
              >
                <option value="security">🔒 Security/Theft</option>
                <option value="event">🎉 Event/Parade</option>
                <option value="traffic">🚗 Traffic/Accident</option>
                <option value="weather">🌧️ Weather/Flood</option>
                <option value="community">👥 Community</option>
              </select>
            </label>

            <label>
              Severity Level
              <select 
                value={formData.severity}
                onChange={(e) => handleChange('severity', e.target.value)}
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </label>

            <label>
              Location
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="Neighborhood, street, reference"
              />
            </label>

            <label>
              Description
              <textarea 
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe what is happening"
                rows={5}
                required
              />
            </label>

            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            <button type="submit" className="primary" disabled={!canSubmit}>
              {loading ? 'Sending…' : '📢 Report Alert'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AlertForm;