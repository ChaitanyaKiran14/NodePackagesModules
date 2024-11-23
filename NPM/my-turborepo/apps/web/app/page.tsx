import Image, { type ImageProps } from "next/image";

import { Signup } from "../../../packages/ui/src/signup";

export default function Home() {
  return (
    <div>      
      <Signup />
    </div>
  );
}
