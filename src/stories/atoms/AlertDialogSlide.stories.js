import React from "react";
import AlertDialogSlide from "components/atoms/AlertDialogSlide";

export default {
  title: "Components/atoms/AlertDialogSlide",
  component: AlertDialogSlide,
};

export const usage = (props) => {
  return (
    <>
      <AlertDialogSlide
        titulo="titulo do modal"
        subtitulo="subtitulo do modal"
        open={true}
      ></AlertDialogSlide>
    </>
  );
};