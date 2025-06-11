import * as React from 'react';
import { cn } from '@workspace/ui/lib/utils';

const DEFAULT_COMPONENT = 'div';

type LiquidGlassProps<T extends React.ElementType = typeof DEFAULT_COMPONENT> =
  {
    as?: T;
    radius?: number;
    blur?: number;
    childClassName?: string;
  } & React.ComponentProps<T>;

function LiquidGlass<T extends React.ElementType = typeof DEFAULT_COMPONENT>({
  as,
  children,
  className,
  radius = 25,
  blur = 0,
  childClassName,
  ref,
  ...props
}: LiquidGlassProps<T>) {
  const Component = as || DEFAULT_COMPONENT;

  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  const rx = radius;
  const [size, setSize] = React.useState<{ width: string; height: string }>({
    width: '0',
    height: '0',
  });

  const viewBox = React.useMemo(
    () => `0 0 ${size.width} ${size.height}`,
    [size.width, size.height],
  );

  const calculateSize = React.useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setSize({
        width: rect.width.toString(),
        height: rect.height.toString(),
      });
    }
  }, []);

  React.useEffect(() => {
    calculateSize();
  }, [calculateSize, children, className, childClassName, radius]);

  return (
    <Component
      className={cn('relative overflow-hidden', className)}
      style={{ borderRadius: `${rx}px` }}
      ref={containerRef}
      {...props}
    >
      <svg className="hidden">
        <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width={size.width}
          height={size.height}
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.001 0.005"
            numOctaves="1"
            seed="17"
            result="turbulence"
          />

          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>

          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />

          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>

          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="200"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <span
        className="flex items-center justify-center w-full h-full"
        style={{
          backdropFilter: `blur(${blur}px) url(#displacementFilter4)`,
          boxShadow: 'inset 0 0 1px 0 rgba(255, 255, 255, 0.5)',
          borderRadius: `${rx}px`,
        }}
      >
        <span
          className="relative flex overflow-hidden transition-all duration-400 ease-in-out"
          style={{
            borderRadius: `${rx}px`,
          }}
        >
          <span
            className="absolute z-0 inset-0 overflow-hidden isolate [filter:url(#glass-distortion)]"
            style={{
              borderRadius: `${rx}px`,
            }}
          />
          <span
            className="z-[1] absolute inset-0"
            style={{
              borderRadius: `${rx}px`,
            }}
          />
          <span className="relative z-[3] w-full h-full">
            <span
              className={cn(
                'flex items-center justify-center gap-2 w-full p-2',
                childClassName,
              )}
            >
              {children}
            </span>
            <svg
              width={size.width}
              height={size.height}
              viewBox={viewBox}
              xmlns="http://www.w3.org/2000/svg"
              className="hidden"
            >
              <filter
                id="displacementFilter4"
                x="0"
                y="0"
                width={size.width}
                height={size.height}
                filterUnits="userSpaceOnUse"
              >
                <feImage
                  href={`data:image/svg+xml,%3Csvg width='${size.width}' height='${size.height}' viewBox='${viewBox}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='${size.width}' height='${size.height}' rx='${rx}' fill='%230001' /%3E%3Crect width='${size.width}' height='${size.height}' rx='${rx}' fill='%23FFF' style='filter:blur(5px)' /%3E%3C/svg%3E`}
                  x="0%"
                  y="0%"
                  width={size.width}
                  height={size.height}
                  result="thing9"
                />
                <feImage
                  href={`data:image/svg+xml,%3Csvg width='${size.width}' height='${size.height}' viewBox='${viewBox}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='${size.width}' height='${size.height}' rx='${rx}' fill='%23FFF1' style='filter:blur(15px)' /%3E%3C/svg%3E`}
                  x="0%"
                  y="0%"
                  width={size.width}
                  height={size.height}
                  result="thing0"
                />
                <feImage
                  href={`data:image/svg+xml,%3Csvg width='${size.width}' height='${size.height}' viewBox='${viewBox}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='${size.width}' height='${size.height}' rx='${rx}' fill='%23000' /%3E%3C/svg%3E`}
                  x="0%"
                  y="0%"
                  width={size.width}
                  height={size.height}
                  result="thing1"
                />
                <feImage
                  href={`data:image/svg+xml,%3Csvg width='${size.width}' height='${size.height}' viewBox='${viewBox}' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='gradient1' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%23000'/%3E%3Cstop offset='100%25' stop-color='%2300F'/%3E%3C/linearGradient%3E%3ClinearGradient id='gradient2' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23000'/%3E%3Cstop offset='100%25' stop-color='%230F0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='0' width='${size.width}' height='${size.height}' rx='${rx}' fill='%237F7F7F' /%3E%3Crect width='${size.width}' height='${size.height}' rx='${rx}' fill='%23000' /%3E%3Crect width='${size.width}' height='${size.height}' rx='${rx}' fill='url(%23gradient1)' style='mix-blend-mode: screen' /%3E%3Crect width='${size.width}' height='${size.height}' rx='${rx}' fill='url(%23gradient2)' style='mix-blend-mode: screen' /%3E%3Crect width='${size.width}' height='${size.height}' rx='${rx}' fill='%237F7F7FBB' style='filter:blur(5px)' /%3E%3C/svg%3E`}
                  x="0%"
                  y="0%"
                  width={size.width}
                  height={size.height}
                  result="thing2"
                />
                <feDisplacementMap
                  in2="thing2"
                  in="SourceGraphic"
                  scale="-148"
                  xChannelSelector="B"
                  yChannelSelector="G"
                />
                <feColorMatrix
                  type="matrix"
                  values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
                  result="disp1"
                />
                <feDisplacementMap
                  in2="thing2"
                  in="SourceGraphic"
                  scale="-150"
                  xChannelSelector="B"
                  yChannelSelector="G"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
                  result="disp2"
                />
                <feDisplacementMap
                  in2="thing2"
                  in="SourceGraphic"
                  scale="-152"
                  xChannelSelector="B"
                  yChannelSelector="G"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
                  result="disp3"
                />
                <feBlend in2="disp2" mode="screen" />
                <feBlend in2="disp1" mode="screen" />
                <feGaussianBlur stdDeviation="0.7" />
                <feBlend in2="thing0" mode="screen" />
                <feBlend in2="thing9" mode="multiply" />
                <feComposite in2="thing1" operator="in" />
              </filter>
            </svg>
          </span>
        </span>
      </span>
    </Component>
  );
}

LiquidGlass.displayName = 'LiquidGlass';

export { LiquidGlass, type LiquidGlassProps };
