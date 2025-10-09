import QRCodeStyling, {
    type DrawType,
    type ErrorCorrectionLevel,
    type Mode,
    type Options,
    type TypeNumber,
  } from "qr-code-styling";
  import React, { forwardRef, memo, useEffect, useMemo, useRef } from "react";
  
  export type {
    DrawType,
    ErrorCorrectionLevel,
    Mode,
    Options,
    TypeNumber,
  };
  
  export type QRCodeProps = {
    className?: string;
    style?: React.CSSProperties;
  } & Options;
  
  const QRCode = forwardRef<HTMLDivElement, QRCodeProps>(
    (
      {
        className,
        style,
        data,
        width = 300,
        height = 300,
        margin = 0,
        shape = "square",
        image,
        imageOptions = { hideBackgroundDots: true, imageSize: 0.4, margin: 0 },
        dotsOptions = { type: "square", color: "#000" },
        cornersSquareOptions,
        cornersDotOptions,
        backgroundOptions = { color: "#fff" },
      },
      ref
    ) => {
      const qrCode = useMemo(() => new QRCodeStyling(), []);
      const innerRef = useRef<HTMLDivElement>(null);
  
      useEffect(() => {
        const options = {
          width,
          height,
          margin,
          data,
          shape,
          image,
          imageOptions,
          dotsOptions,
          cornersSquareOptions,
          cornersDotOptions,
          backgroundOptions,
        };
        qrCode.update(options);
      }, [
        width,
        height,
        margin,
        data,
        shape,
        image,
        imageOptions,
        dotsOptions,
        cornersSquareOptions,
        cornersDotOptions,
        backgroundOptions,
        qrCode,
      ]);
  
      useEffect(() => {
        const current = innerRef.current;
        if (current) {
          qrCode.append(current);
        }
      }, [qrCode]);
  
      return (
        <div
          ref={(current) => {
            if (typeof ref === "function") {
              ref(current);
            } else if (ref) {
              ref.current = current;
            }
            (innerRef as React.MutableRefObject<HTMLDivElement | null>).current =
              current;
          }}
          className={className}
          style={style}
        />
      );
    }
  );
  
  export default memo(QRCode);
  