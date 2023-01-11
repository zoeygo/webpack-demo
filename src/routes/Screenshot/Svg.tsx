/* eslint-disable react/display-name */
import * as React from 'react';

interface IProps {
  type: 'rect' | 'circle';
  width: number;
  height: number;
  stroke?: string;
  strokeWidth?: number;
}

const Svg = React.forwardRef<any, IProps>(
  ({ type, width, height, stroke, strokeWidth }, ref) => {
    return (
      <svg
        className="svg-options"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
      >
        {type === 'rect' && (
          <rect
            width={width}
            height={height}
            stroke={stroke}
            fill="transparent"
            strokeWidth={strokeWidth}
          />
        )}
        {type === 'circle' && (
          <ellipse
            cx={width / 2}
            cy={height / 2}
            rx={width / 2}
            ry={height / 2}
            stroke={stroke}
            fill="transparent"
            strokeWidth={strokeWidth}
          />
        )}
      </svg>
    );
  }
);

Svg.defaultProps = {
  stroke: '#f1f117',
  strokeWidth: 4
};

export default Svg;
