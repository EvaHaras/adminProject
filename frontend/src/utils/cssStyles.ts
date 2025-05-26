import { Theme, alpha } from '@mui/material/styles';

type Direction = 'top' | 'right' | 'bottom' | 'left';

type CssStylesProps = {
  color?: string;
  blur?: number;
  opacity?: number;
  direction?: Direction;
  startColor?: string;
  endColor?: string;
  url?: string;
};

function getDirection(value: Direction = 'bottom'): string {
  return {
    top: 'to top',
    right: 'to right',
    bottom: 'to bottom',
    left: 'to left',
  }[value];
}

export default function cssStyles(theme: Theme) {
  return {
    bgBlur: (props?: CssStylesProps) => {
      const color = props?.color || theme?.palette.background.default || '#000000';

      const blur = props?.blur || 6;
      const opacity = props?.opacity || 0.8;

      return {
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`, // Fix on Mobile
        backgroundColor: alpha(color, opacity),
      };
    },
    bgGradient: (props: CssStylesProps) => {
      const direction = getDirection(props?.direction);
      const startColor =
        props?.startColor || `${theme?.palette.action.disabledBackground || '#000000'} 0%`;
      const endColor = props?.endColor || '#000000 75%';

      return {
        background: `linear-gradient(${direction}, ${startColor}, ${endColor});`,
      };
    },
    bgImage: (props: CssStylesProps) => {
      const url = props?.url;
      const direction = getDirection(props?.direction);
      const startColor = props?.startColor || 'rgba(0, 0, 0, 0.88)';
      const endColor = props?.endColor || 'rgba(0, 0, 0, 0.88)';

      return {
        background: `linear-gradient(${direction}, ${startColor}, ${endColor}), url(${url})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      };
    },
  };
}