import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.section)`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 4rem;

  div {
    border-radius: 4px;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    border: 2px solid transparent;
    transition: 180ms ease-in-out;

    :hover {
      border-color: #7159c1;
      transform: scale(1.015) !important;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    ${({ left }) =>
      left
        ? css`
            :first-child {
              grid-column: 1;
              grid-row: 1 / 3;

              img {
                object-position: 15%;
              }
            }

            :nth-child(2) {
              grid-column: 2 / 4;
              grid-row: 1;
            }

            :nth-child(3) {
              grid-column: 2;
              grid-row: 2;
            }

            :last-child {
              grid-column: 3;
              grid-row: 2;
            }
          `
        : css`
            :first-child {
              grid-column: 1 / 3;
              grid-row: 1;
            }

            :nth-child(2) {
              grid-column: 3;
              grid-row: 1 / 3;

              img {
                object-position: 85%;
              }
            }

            :nth-child(3) {
              grid-column: 1;
              grid-row: 2;
            }

            :last-child {
              grid-column: 2;
              grid-row: 2;
            }
          `}

    ${({ up }) =>
      up &&
      css`
        :first-child {
          grid-column: 1 / 4;
          grid-row: 1;
        }

        :nth-child(2) {
          grid-column: 1;
          grid-row: 2;
        }

        :nth-child(3) {
          grid-column: 2;
          grid-row: 2;
        }

        :last-child {
          grid-column: 3;
          grid-row: 2;
        }
      `}

    ${({ down }) =>
      down &&
      css`
        :first-child {
          grid-column: 1 / 4;
          grid-row: 2;
        }

        :nth-child(2) {
          grid-column: 1;
          grid-row: 1;
        }

        :nth-child(3) {
          grid-column: 2;
          grid-row: 1;
        }

        :last-child {
          grid-column: 3;
          grid-row: 1;
        }
      `}
  }
`;
