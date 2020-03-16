import React from "react";
import useTyped from "use-typed";

const Header = () => {
  const ref = React.useRef(null);
  useTyped(ref, {
    strings: [
      "Create new loans...",
      "Search for loans...",
      "Delete loans...",
      "Made by Andrew Lewell."
    ],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true,
    loopCount: Infinity
  });
  return (
    <div className='header-typed'>
      <span ref={ref} />
    </div>
  );
};

export default Header;
