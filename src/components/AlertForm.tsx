import React, { useState } from 'react';

const AlertForm: React.FC = () => {
  const [formData, setFormData] = useState({
    type: 'security',
    description: '',
    location: '',
    severity: 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`🚨 Alerta reportada:\nTipo: ${formData.type}\nDescripción: ${formData.description}`);
    // Reset form
    setFormData({
      type: 'security',
      description: '',
      location: '',
      severity: 'medium'
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="alert-form-container">
      <div className="alert-form-content">
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef',
          height: 'fit-content',
          minHeight: '100%'
        }}>
          <h3 style={{ 
            color: '#2c3e50', 
            marginBottom: '25px',
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>
            📢 Reportar Alerta
          </h3>
          
          <form onSubmit={handleSubmit}>
            {/* Tipo de Alerta */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '600',
                color: '#495057',
                fontSize: '14px'
              }}>
                🚨 Tipo de Alerta:
              </label>
              <select 
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '12px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'white'
                }}
              >
                <option value="security">🔒 Seguridad/Robo</option>
                <option value="event">🎉 Evento/Desfile</option>
                <option value="traffic">🚗 Tráfico/Accidente</option>
                <option value="weather">🌧️ Clima/Inundación</option>
                <option value="community">👥 Comunitario</option>
              </select>
            </div>

            {/* Gravedad */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '600',
                color: '#495057',
                fontSize: '14px'
              }}>
                ⚠️ Nivel de Gravedad:
              </label>
              <select 
                value={formData.severity}
                onChange={(e) => handleChange('severity', e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '12px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'white'
                }}
              >
                <option value="low">🟢 Baja</option>
                <option value="medium">🟡 Media</option>
                <option value="high">🔴 Alta</option>
              </select>
            </div>

            {/* Descripción */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '600',
                color: '#495057',
                fontSize: '14px'
              }}>
                📝 Descripción:
              </label>
              <textarea 
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe lo que está sucediendo..."
                style={{ 
                  width: '100%', 
                  padding: '12px',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '14px',
                  height: '120px',
                  resize: 'vertical',
                  backgroundColor: 'white',
                  fontFamily: 'inherit'
                }}
                required
              />
            </div>

            {/* Botón de enviar */}
            <button 
              type="submit"
              style={{
                width: '100%',
                padding: '15px',
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)',
                marginBottom: '20px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(231, 76, 60, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(231, 76, 60, 0.3)';
              }}
            >
              📢 Reportar Alerta
            </button>
          </form>

          {/* Información de ubicación */}
          <div style={{ 
            padding: '15px',
            background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
            borderRadius: '8px',
            border: '1px solid #c3e6cb',
            textAlign: 'center'
          }}>
            <strong style={{ color: '#155724' }}>📍 Pasto, Nariño</strong>
            <br />
            <small style={{ color: '#155724', opacity: 0.8 }}>
              Sistema activo para la comunidad
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertForm;