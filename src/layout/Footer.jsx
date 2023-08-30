import { Container, Group, ActionIcon } from '@mantine/core';
import { logo } from '../assets/images/image';
import { Icon } from '@iconify/react';
import { useStyles } from '../constants/common/commonStyles';

const Footer = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.footerMain}>
      <Container className={classes.footerInner}>
        <img
          src={logo}
          alt='Pet Fair Logo'
          style={{ maxWidth: '25%', width: '200px' }}
        />
        <Group
          spacing={10}
          className={classes.footerLinks}
          position='right'
          noWrap>
          <a
            href='mailto:rahathossenmanik@gmail.com'
            target='_blank'
            rel='noreferrer'>
            <ActionIcon size='lg'>
              <Icon icon='formkit:email' width='50' />
            </ActionIcon>
          </a>
          <a href='http://wa.me/8801743612180' target='_blank' rel='noreferrer'>
            <ActionIcon size='lg'>
              <Icon icon='ic:outline-whatsapp' width='50' />
            </ActionIcon>
          </a>
          <a
            href='https://linkedin.com/in/rahathossenmanik'
            target='_blank'
            rel='noreferrer'>
            <ActionIcon size='lg'>
              <Icon icon='akar-icons:linkedin-fill' width='50' />
            </ActionIcon>
          </a>
          <a
            href='https://github.com/rahathossenmanik'
            target='_blank'
            rel='noreferrer'>
            <ActionIcon size='lg'>
              <Icon icon='akar-icons:github-fill' width='50' />
            </ActionIcon>
          </a>
        </Group>
      </Container>
    </div>
  );
};

export default Footer;
