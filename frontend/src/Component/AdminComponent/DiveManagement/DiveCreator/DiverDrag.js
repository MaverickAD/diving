import React from "react";
import { useDrag } from "react-dnd";

function DiverDrag(props) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "diver",
    item: {
      last_name: props.diver.last_name,
      first_name: props.diver.first_name,
      pa: props.diver.pa,
      pe: props.diver.pe,
      palanquee: props.diver.palanquee,
    },
    collect: (monitor) => ({
      isDragging: !monitor.isDragging(),
    }),
  });
  return (
    <div
      className={"diver-card px-1 py-2 grid grid-cols-4 border-b"}
      ref={dragRef}
    >
      <p className={"text-center"}>{props.diver.first_name}</p>
      <p className={"text-center"}>{props.diver.last_name}</p>
      <p className={"text-center"}>PA-{props.diver.pa}</p>
      <p className={"text-center"}>PE-{props.diver.pe}</p>
    </div>
  );
}

export default DiverDrag;
