import { Select, NumberInput, ImageDropZone } from "@baseline-ui/core";
import { EllipseIcon, SquareIcon, PolygonIcon } from "@baseline-ui/icons/24";

const SHAPE_ITEMS = [
  { id: "ellipse", icon: EllipseIcon, label: "Ellipse" },
  { id: "square", icon: SquareIcon, label: "Square" },
  { id: "polygon", icon: PolygonIcon, label: "Polygon" },
];

const DocumentForm = () => (
  <div>
    <Select
      className="form-field"
      items={SHAPE_ITEMS}
      placeholder="Choose an item"
    />
    <NumberInput className="form-field" placeholder="Enter a number" />
    <ImageDropZone
      className="form-field"
      buttonLabel="Upload"
      onValueChange={(files) => console.log(files)}
    />
  </div>
);

export default DocumentForm;
