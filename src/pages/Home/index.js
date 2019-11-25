import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { shuffle } from 'lodash';
import { motion } from 'framer-motion';
import { Container, Header, Partner, Partners } from './styles';
import { spring } from '../../utils/animations';

import BannerGrid from '../../components/BannerGrid';

import partnersList from '../../services/partners';
import banners from '../../services/banners';
import Button from '../../components/Button';

export default function Home() {
  const [partners, setPartners] = useState(partnersList);

  const listAnimation = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...spring,
        delay: 0.5,
        staggerChildren: 0.075,
        delayChildren: 0.7,
      },
    },
  };
  return (
    <>
      <Container>
        <Header>
          <motion.a
            href="https://rocketseat.com.br/experience"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            transition={{ ...spring, mass: 1.9 }}
          >
            <img
              src="https://rocketseat.com.br/static/images/experience/logo.svg"
              alt="RS/XP"
            />
          </motion.a>
          <Button secondary as={Link} to="/signup">
            Nova Conta
          </Button>
        </Header>
        <BannerGrid banners={banners} />
        <h2>
          Apoiadores
          <Button inline onClick={() => setPartners(shuffle(partnersList))}>
            Randomizar
          </Button>
        </h2>
        <Partners initial="hidden" animate="visible" variants={listAnimation}>
          {partners.map(partner => (
            <Partner
              key={partner.name}
              // variants={itemsAnimation}
              layoutTransition={spring}
            >
              <img alt={partner.name} src={partner.src} />
            </Partner>
          ))}
        </Partners>
      </Container>
    </>
  );
}
