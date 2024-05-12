import { useState, useEffect } from 'react';
import { getSigner } from './signer';

export const useAlchemy = () => {
  const [isAlchemyLoading, setLoading] = useState(true);
  const [signer, setSigner] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const signer = getSigner();
    setSigner(signer);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (signer) {
        const userDetails = await signer.getAuthDetails().catch(() => null);
        setUser(userDetails);
      }
    };

    fetchUser();
  }, [signer]);

  useEffect(() => {
    if (signer && user) {
      setLoading(false);
    }
  }, [signer, user]);

  return { signer, user, isAlchemyLoading };
};