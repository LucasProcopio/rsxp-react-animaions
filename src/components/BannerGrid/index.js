import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function BannerGrid({ banners, left, up, down }) {
  return (
    <Container left={left} up={up} down={down}>
      {banners.map(banner => (
        <div key={banner.img.alt}>
          <a href={banner.link} target="_blank" rel="noopener noreferrer">
            <img src={banner.img.src} alt={banner.img.alt} />
          </a>
        </div>
      ))}
    </Container>
  );
}

BannerGrid.propTypes = {
  banners: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      img: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
      }),
    })
  ).isRequired,
  left: PropTypes.bool,
  up: PropTypes.bool,
  down: PropTypes.bool,
};

BannerGrid.defaultProps = {
  left: false,
  up: false,
  down: false,
};
