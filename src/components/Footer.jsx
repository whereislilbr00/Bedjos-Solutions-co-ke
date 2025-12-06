import React from 'react';

export default function Footer() {
  return ( 
    <footer style={{ padding: '1rem', background: '#222', color: '#fff', textAlign: 'center', borderRadius: '1rem', margin: '1rem' }}>
      <p>&copy; {new Date().getFullYear()} Bedjos Solutions. We Think. We Create. We Deliver.</p>
    </footer> 
  ); 
}