import PropTypes from 'prop-types';
import { Box } from "@baseline-ui/core";
import { PlusIcon } from "@baseline-ui/icons/12";

const UploadButton = ({ onClick }) => (
  <Box
    borderRadius="full"
    padding={["2xl", "3xl", "4xl"]}
    className="list-item"
    onClick={onClick}
    // backgroundColor="background.primary.strong"
    style={{
      marginTop: "15px",
      borderRadius: "2px",
      height: "135px",
      backgroundColor: "#D7DCE4",
    }}
  >
    <PlusIcon style={{ color: 'black' }} />
  </Box>
);

UploadButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default UploadButton;
