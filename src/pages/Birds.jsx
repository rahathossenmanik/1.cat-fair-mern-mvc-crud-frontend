import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { PET_API } from '../constants/api/petEndpoints';
import { get } from '../helpers/api_helpers';
import Archive from './Archive';

const Birds = () => {
  const [loading, setLoading] = useState(true);
  const [birds, setBirds] = useState([]);
  const [trigger, { toggle }] = useDisclosure(false);

  useEffect(() => {
    const getAllPets = async () => {
      birds?.length === 0 && setLoading(true);
      const response = await get(PET_API.get_all_bird());
      setBirds(response);
      setLoading(false);
    };
    getAllPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return <Archive pets={birds} loading={loading} trigger={toggle} />;
};

export default Birds;
