import React from "react";
import { LinkArea, LinkIcon } from "./styled";
import { useHistory, useLocation } from "react-router-dom";

export default ({ icon, link }) => {
  const history = useHistory();
  const location = useLocation();

  let isActive = location.pathname === link;

  const handleClick = (e) => {
    e.preventDefault();
    history.push(link);
  };
  return (
    <LinkArea
      active={isActive}
      href={link}
      onClick={handleClick}
    >
      <LinkIcon src={icon} />
    </LinkArea>
  );
};
