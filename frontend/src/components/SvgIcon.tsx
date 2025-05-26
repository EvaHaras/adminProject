import { FC } from "react";
import { Box, BoxProps } from "@mui/material";

interface Props extends BoxProps {
  src: string;
}

const SvgIcon: FC<Props> = ({ src, sx, ...other }) => {
  return (
    <Box
      component="span"
      sx={{
        width: 24,
        height: 24,
        display: "inline-block",
        bgcolor: "currentColor",
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
      {...other}
    />
  );
};

export default SvgIcon;