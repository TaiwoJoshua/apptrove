import React from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function FancyboxView(props) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const container = containerRef.current;

    const delegate = props.delegate || "[data-fancybox]";
    const options = {
        animationEffect: 'fade',
        transitionEffect: 'zoom-in-out',
        buttons: [
          'fullScreen',
          'close',
          'download'
        ]
    };

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  });

  return <div ref={containerRef} className="Fancybox">{props.children}</div>;
};