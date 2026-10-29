import { useState, useEffect } from 'react';

export const useMasters = () => {
  const [banks, setBanks] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch('/api/admin/pincodes/meta')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted) return;
        if (data) {
          setBanks(data.banks || ['HDFC', 'ICICI', 'AXIS', 'SBI', 'KOTAK', 'BAJAJ']);
          setStates(data.states || ['Karnataka', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'Telangana']);
        } else {
          setBanks(['HDFC', 'ICICI', 'AXIS', 'SBI', 'KOTAK', 'BAJAJ']);
          setStates(['Karnataka', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'Telangana']);
        }
        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setBanks(['HDFC', 'ICICI', 'AXIS', 'SBI', 'KOTAK', 'BAJAJ']);
        setStates(['Karnataka', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'Telangana']);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { banks, states, loading };
};

export default useMasters;
