import PropTypes from "prop-types";

const Container = ({ children }) => {
  <div className="container mx-auto">{children}</div>;
};
Container.propTypes = {
  children: PropTypes.node,
};
export default Container;
