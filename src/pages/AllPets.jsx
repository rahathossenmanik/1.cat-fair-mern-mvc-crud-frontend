import React, { useState, useEffect } from 'react';
import { Grid, Container, Card, Image, ActionIcon, Group, Text, Button, Badge, createStyles, rem } from '@mantine/core';
import { PET_API } from '../constants/api/petEndpoints';
import { get } from '../helpers/api_helpers';
import { Icon } from '@iconify/react';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
  },

  rating: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: rem(12),
    pointerEvents: 'none'
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  },

  footer: {
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`
  }
}));

const AllPets = () => {
  const { classes, theme } = useStyles();

  const [pets, setPets] = useState([]);

  useEffect(() => {
    const getAllPets = async () => {
      const response = await get(PET_API.get_all());
      setPets(response);
    };
    getAllPets();
  }, []);

  const shortenAbout = (text) => {
    if (text.length > 100) {
      return text.substring(0, 100) + '...';
    } else {
      return text;
    }
  };

  return (
    <Container my="md">
      <Grid>
        {pets?.map((pet, i) => (
          <Grid.Col key={i} xs={12} sm={6} md={4}>
            <Card withBorder padding="lg" radius="md" className={classes.card}>
              <Card.Section mb="sm">
                <Image src={pet?.image} alt={'Pet'} height={180} />
              </Card.Section>

              <Badge className={classes.rating} variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                {pet?.age} Years
              </Badge>

              <Badge>{pet?.petType?.label}</Badge>

              <Text fw={700} className={classes.title} mt="xs">
                {pet?.name}
              </Text>
              <Text fz="sm" color="dimmed" lineClamp={4}>
                {shortenAbout(pet?.about)}
              </Text>

              <Group mt="lg">
                {/* <Avatar src={author.image} radius="sm" />
              <div>
                <Text fw={500}>{author.name}</Text>
                <Text fz="xs" c="dimmed">
                  {author.description}
                </Text>
              </div> */}
              </Group>

              <Card.Section className={classes.footer}>
                <Group position="apart">
                  <Group mt="xs">
                    <Button radius="md" style={{ flex: 1 }}>
                      View {pet?.name}
                    </Button>
                  </Group>
                  <Group spacing={0} mt="xs">
                    <ActionIcon>
                      <Icon icon="mdi:heart-outline" size="1.2rem" color={theme.colors.red[6]} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon>
                      <Icon icon="solar:share-outline" size="1.2rem" color={theme.colors.blue[6]} stroke={1.5} />
                    </ActionIcon>
                  </Group>
                </Group>
              </Card.Section>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default AllPets;
