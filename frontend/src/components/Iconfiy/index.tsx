/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, ReactNode } from "react";
import { Icon } from "@iconify/react";

import Box, { BoxProps } from "@mui/material/Box";

interface Props extends Omit<BoxProps, "icon"> {
  icon: ReactNode;
  width?: number;
}

const Iconify = forwardRef<HTMLDivElement, Props>(
  ({ icon, width = 20, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Icon}
      className="component-iconify"
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...(other as any)}
    />
  )
);

export default Iconify;