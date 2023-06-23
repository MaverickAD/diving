import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import DiverDrag from "./DiverDrag";

function PalanqueeDrop(props) {
  const [{}, dropRef] = useDrop({
    accept: "diver",
    drop: (item) => {
      props.update(
        props.divers.map((diver) => {
          if (
            diver.last_name === item.last_name &&
            diver.first_name === item.first_name &&
            diver.pa === item.pa &&
            diver.pe === item.pe &&
            diver.palanquee === item.palanquee
          ) {
            diver.palanquee = props.palanquee;
          }
          return diver;
        })
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  useEffect(() => {
    props.setModify(
      !(
        props.divers.filter((diver) => diver.palanquee === props.palanquee)
          .length <= 1 ||
        props.divers.filter((diver) => diver.palanquee === props.palanquee)
          .length > 4
      )
    );
  });

  return (
    <div className={"w-full border border-black"} ref={dropRef}>
      {props.divers
        .filter((diver) => diver.palanquee === props.palanquee)
        .map((diver, index) => (
          <DiverDrag key={index} draggable diver={diver} />
        ))}
    </div>
  );
}

export default PalanqueeDrop;
