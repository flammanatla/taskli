import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@blueprintjs/core";

export default function Header({ isMobile, children, onSetMobileView }) {
  return (
    <div className="header">
      {isMobile && (
        <Button
          className="bp5-button--sidebar"
          onClick={() => {
            onSetMobileView(true, false);
          }}
          icon={
            <FontAwesomeIcon
              icon={faArrowLeftLong}
              size="xl"
              className="bp5-button--sidebar"
            />
          }
        ></Button>
      )}
      {children}
    </div>
  );
}
