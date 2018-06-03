import PropTypes from 'prop-types';

export const QuestionPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
});
