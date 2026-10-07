import Image from 'next/image';

export default function Logo({ size = 56, className = '' }) {
  return (
    <Image
      src="/logo.png"
      alt="Escudo oficial Copa Crack Oficial"
      width={size}
      height={size}
      priority
      className={className}
    />
  );
}