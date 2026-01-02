import React, { useEffect } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const Image = (props: ImageProps) => {
  const { fallbackSrc, src, alt, className, ...rest } = props;
  const imgRef = React.useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement) return;

    const handleError = () => {
      if (fallbackSrc) {
        imgElement.src = fallbackSrc;
      }
    };

    imgElement.addEventListener("error", handleError);

    return () => {
      imgElement.removeEventListener("error", handleError);
    };
  }, [src, fallbackSrc]);

  return (
    <img ref={imgRef} src={src} alt={alt} className={className} {...rest} />
  );
};

export default Image;
