import { Box } from "@baseline-ui/core";
import { PlusIcon } from "@baseline-ui/icons/12";

const UploadButton = ({ onClick }) => (
  <Box
    borderRadius="full"
    padding={["2xl", "3xl", "4xl"]}
    className="list-item"
    onClick={onClick}
    backgroundColor="background.primary.strong"
    style={{ margin: "15px 0px", padding: "40px", flex: "0 0 100%", borderRadius: "10px" }}
  >
    <PlusIcon />
  </Box>
);

export default UploadButton
