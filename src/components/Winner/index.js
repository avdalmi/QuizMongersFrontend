import React from "react";
import { useLottie } from "lottie-react";

import winner from "./winner.json";

function WinnerAnimation() {
  const options = {
    loop: true,
    autoplay: true,
    animationData: winner,
  };
  const { View } = useLottie(options);
  return (
    <div>
      <>{ View }</>
    </div>
  );
}

export default WinnerAnimation;
