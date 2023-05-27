import classNames from "classnames";
import { ElementType, ReactNode } from "react";

export type FlexProps = {
  tag?: ElementType;
  inline?: boolean;
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
  alignItems?: "start" | "end" | "center" | "baseline" | "stretch";
  alignContent?: "start" | "end" | "center" | "between" | "stretch" | "stretch";
  breakpoint?: "xs" | "sm" | "md" | "lg" | "xl";
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  justifyContent?: "start" | "end" | "center" | "between" | "around";
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
};

const Flex = ({
  tag: Tag = "div",
  inline,
  wrap,
  alignItems,
  alignContent,
  breakpoint,
  direction,
  justifyContent,
  className,
  style,
  children,
  ...rest
}: FlexProps) => {
  return (
    <Tag
      className={classNames(
        {
          [`d-${breakpoint ? breakpoint + "-" : ""}flex`]: !inline,
          [`d-${breakpoint ? breakpoint + "-" : ""}inline-flex`]: inline,
          [`flex-${direction}`]: direction,
          [`justify-content-${justifyContent}`]: justifyContent,
          [`align-items-${alignItems}`]: alignItems,
          [`align-content-${alignContent}`]: alignContent,
          [`flex-${wrap}`]: wrap,
        },
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Flex;
