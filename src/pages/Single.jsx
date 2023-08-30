import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  Grid,
  Container,
  Image,
  Group,
  Text,
  Button,
  LoadingOverlay,
  List,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Icon } from '@iconify/react';
import { get, post } from '../helpers/api_helpers';
import { PET_API } from '../constants/api/petEndpoints';
import { useStyles } from '../constants/common/commonStyles';

const Single = () => {
  const { id } = useParams();
  const location = useLocation();
  const { classes } = useStyles();

  const [loading, setLoading] = useState(true);
  const [pet, setPet] = useState({});
  const [trigger, { toggle }] = useDisclosure(false);

  const url =
    window.location.protocol + '//' + window.location.host + location.pathname;

  useEffect(() => {
    const getPetByID = async () => {
      Object.keys(pet).length === 0 && setLoading(true);
      const response = await get(PET_API.get_by_id(id));
      setPet(response);
      setLoading(false);
    };
    getPetByID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  const onLoveReact = async (id) => {
    const res = await post(PET_API.love(id));
    if (res) toggle();
  };

  const onShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&t=TITLE`,
      '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600'
    );
    return false;
  };

  return (
    <Container
      my='md'
      pos='relative'
      style={{ minHeight: '80vh', minWidth: '100%' }}>
      <LoadingOverlay visible={loading} overlayBlur={2} />

      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.singleTitle}>{pet?.name}</Title>
          <Text color='dimmed' mt='md'>
            {pet?.favorite}
          </Text>

          <List
            mt={30}
            spacing='sm'
            size='sm'
            icon={
              <Icon icon='ic:round-pets' width={20} height={20} stroke={1.5} />
            }>
            <List.Item>
              <b>Age</b> – {pet?.age} years old
            </List.Item>
            <List.Item>
              <b>Type</b> – {pet?.name} is a {pet?.petType?.label}
            </List.Item>
            <List.Item>
              <b>Character</b> – {pet?.character?.label}
            </List.Item>
          </List>

          <Group mt={30}>
            <Button
              radius='xl'
              size='md'
              bg='pink'
              className={classes.control}
              onClick={() => onLoveReact(pet?._id)}>
              <Group spacing={0} fz='xl'>
                Love
                <Icon
                  icon='mdi:heart-outline'
                  className='mx-2'
                  width={20}
                  height={20}
                  stroke={1.5}
                />
                {pet?.loveCount}
              </Group>
            </Button>
            <Button
              variant='default'
              radius='xl'
              size='md'
              bg='blue'
              className={classes.control}
              onClick={onShareFacebook}>
              <Group spacing={0} fz='xl'>
                Share
                <Icon
                  icon='solar:share-outline'
                  className='mx-2'
                  width={20}
                  height={20}
                  stroke={1.5}
                />
              </Group>
            </Button>
          </Group>
        </div>
        <Image src={pet?.image} alt={'Pet'} className={classes.image} />
      </div>

      <Grid>
        <Grid.Col xs={12}>
          <Text fz='sm' color='dimmed'>
            {pet?.about}
          </Text>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Single;
