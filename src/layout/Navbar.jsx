import { createStyles, Header, Group, Button, Text, Divider, Box, Burger, Drawer, ScrollArea, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { logo } from '../assets/images/image';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.fn.lighten(theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background, 0.1),
      cursor: 'pointer'
    }
  },

  hiddenMobile: {
    [theme.fn.smallerThan('md')]: {
      display: 'none'
    }
  },

  hiddenDesktop: {
    [theme.fn.largerThan('md')]: {
      display: 'none'
    }
  }
}));

const Navbar = (props) => {
  const { setThemeMode } = props;
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const navigate = useNavigate();

  return (
    <Box pb={20}>
      <Header height={60} px="md">
        <Group className="flex justify-around" sx={{ height: '100%' }}>
          <img src={logo} alt="Pet Fair Logo" style={{ maxWidth: '25%', width: '200px' }} />

          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <Text onClick={() => navigate('/')} className={classes.link}>
              All Pets
            </Text>
            <Text onClick={() => navigate('/dogs')} className={classes.link}>
              Dogs
            </Text>
            <Text onClick={() => navigate('/cats')} className={classes.link}>
              Cats
            </Text>
            <Text onClick={() => navigate('/horses')} className={classes.link}>
              Horses
            </Text>
            <Text onClick={() => navigate('/birds')} className={classes.link}>
              Birds
            </Text>
            <Text onClick={() => navigate('/reptiles')} className={classes.link}>
              Reptiles
            </Text>
          </Group>

          <Group>
            {theme.colorScheme === 'dark' ? (
              <Button variant="default" onClick={() => setThemeMode('light')}>
                <Icon icon="tdesign:mode-light" />
              </Button>
            ) : (
              <Button variant="default" onClick={() => setThemeMode('dark')}>
                <Icon icon="tdesign:mode-dark" />
              </Button>
            )}
            <Button onClick={() => navigate('/pets/register')} className={classes.hiddenMobile}>
              Introduce Pet
            </Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}>
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Text onClick={() => navigate('/')} className={classes.link}>
            All Pets
          </Text>
          <Text onClick={() => navigate('/dogs')} className={classes.link}>
            Dogs
          </Text>
          <Text onClick={() => navigate('/cats')} className={classes.link}>
            Cats
          </Text>
          <Text onClick={() => navigate('/horses')} className={classes.link}>
            Horses
          </Text>
          <Text onClick={() => navigate('/birds')} className={classes.link}>
            Birds
          </Text>
          <Text onClick={() => navigate('/reptiles')} className={classes.link}>
            Reptiles
          </Text>

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Group position="center" grow pb="xl" px="md">
            <Button onClick={() => navigate('/pets/register')}>Introduce Pet</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Navbar;
