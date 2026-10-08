interface FirstLopLogoProps {
  className?: string;
  textColor?: string;
  align?: 'center' | 'start';
  size?: 'sm' | 'md' | 'lg';
}

export default function FirstLopLogo({
  className = '',
  textColor = 'text-white',
  align = 'center',
  size = 'md',
}: FirstLopLogoProps) {
  const alignClasses =
    align === 'start'
      ? 'items-start text-left'
      : 'items-center justify-center text-center';

  const sizeClasses = {
    sm: {
      brand: 'text-[16px] sm:text-[17px] md:text-[18px]',
      sub: 'text-[6px] sm:text-[6.5px] md:text-[7px] mt-0.5 sm:mt-1',
    },
    md: {
      brand: 'text-[19px] sm:text-[21px] md:text-[22px]',
      sub: 'text-[7px] sm:text-[7.5px] md:text-[8px] mt-1 sm:mt-1.2',
    },
    lg: {
      brand: 'text-[24px] sm:text-[26px] md:text-[28px]',
      sub: 'text-[8.5px] sm:text-[9px] md:text-[9.5px] mt-1.5 sm:mt-2',
    },
  }[size];

  return (
    <div
      className={`flex flex-col select-none ${alignClasses} ${className}`}
      aria-label="FIRST-LOP INDONESIA"
    >
      <span
        className={`font-serif tracking-[0.04em] uppercase ${textColor} font-normal leading-none ${sizeClasses.brand} transition-colors`}
        style={{
          fontFamily: "'Instrument Serif', 'DM Serif Display', Georgia, serif",
        }}
      >
        FIRST-LOP
      </span>
      <span
        className={`uppercase ${textColor} tracking-[0.34em] font-medium leading-none ${sizeClasses.sub} transition-colors`}
        style={{
          fontFamily: "'Space Mono', 'Inter', monospace, sans-serif",
          letterSpacing: '0.34em',
        }}
      >
        INDONESIA
      </span>
    </div>
  );
}
