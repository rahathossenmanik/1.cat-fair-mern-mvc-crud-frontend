import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from '@mantine/core';
import { error404 } from '../assets/images/image';
import { useStyles } from '../constants/common/commonStyles';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Container className={classes.root}>
      <SimpleGrid
        spacing={80}
        cols={2}
        breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
        <Image src={error404} className={classes.mobileImage} />
        <div>
          <Title className={classes.title404}>Nothing to see here...</Title>
          <Text color='dimmed' size='lg'>
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Button
            variant='outline'
            size='md'
            mt='xl'
            className={classes.control404}
            onClick={() => navigate('/')}>
            Get back to home page
          </Button>
        </div>
        <Image src={error404} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
};

export default Error404;
