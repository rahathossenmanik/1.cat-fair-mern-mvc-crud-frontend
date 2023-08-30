import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { PET_API } from '../constants/api/petEndpoints';
import { get } from '../helpers/api_helpers';
import Archive from './Archive';

const AllPets = () => {
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [trigger, { toggle }] = useDisclosure(false);

  useEffect(() => {
    const getAllPets = async () => {
      pets?.length === 0 && setLoading(true);
      const response = await get(PET_API.get_all());
      setPets(response);
      setLoading(false);
    };
    getAllPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return <Archive pets={pets} loading={loading} trigger={toggle} />;
};

export default AllPets;
