import PropTypes from 'prop-types';

export const AnswerPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
});
