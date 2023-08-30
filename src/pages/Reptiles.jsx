import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { PET_API } from '../constants/api/petEndpoints';
import { get } from '../helpers/api_helpers';
import Archive from './Archive';

const Reptiles = () => {
  const [loading, setLoading] = useState(true);
  const [reptiles, setReptiles] = useState([]);
  const [trigger, { toggle }] = useDisclosure(false);

  useEffect(() => {
    const getAllPets = async () => {
      reptiles?.length === 0 && setLoading(true);
      const response = await get(PET_API.get_all_reptile());
      setReptiles(response);
      setLoading(false);
    };
    getAllPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return <Archive pets={reptiles} loading={loading} trigger={toggle} />;
};

export default Reptiles;
