interface StatsBadgeProps {
  label: string;
  value: number;
  color?: string;
}

const StatsBadge = ({ label, value, color = '#2563eb' }: StatsBadgeProps) => {
  return (
    <div
      style={{
        border: `2px solid ${color}`,
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        minWidth: '160px',
        background: '#fff',
      }}
    >
      <div style={{ fontSize: '28px', fontWeight: 'bold', color }}>
        {value}
      </div>
      <div style={{ color: '#374151', marginTop: '4px' }}>{label}</div>
    </div>
  );
};

export default StatsBadge;