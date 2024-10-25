import { Button } from "../ui/button";
import { Input } from "../ui/input";

function GenerateImageInput() {
  return (
    <div className="mb-5 flex space-x-2">
      <Input placeholder="Mountain lookout" className="p-6" />
      <Button className="p-6">Generate Image</Button>
    </div>
  );
}
export default GenerateImageInput;
