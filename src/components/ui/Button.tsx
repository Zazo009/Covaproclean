import { cn } from '@/lib/cn';
import { Link } from '@/i18n/navigation';
import type { ComponentPropsWithoutRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp';
type Size = 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-pine-700 text-white hover:bg-pine-800 focus-visible:ring-pine-700',
  secondary: 'bg-white text-pine-800 border border-pine-200 hover:border-pine-400 focus-visible:ring-pine-700',
  ghost: 'bg-transparent text-pine-800 hover:bg-pine-50 focus-visible:ring-pine-700',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#1DA851] focus-visible:ring-[#25D366]',
};

const sizeClasses: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

interface ButtonOwnProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonOwnProps & ComponentPropsWithoutRef<'button'>) {
  return <button className={cn(base, variantClasses[variant], sizeClasses[size], className)} {...props} />;
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  href,
  ...props
}: ButtonOwnProps & ComponentPropsWithoutRef<typeof Link> & { href: ComponentPropsWithoutRef<typeof Link>['href'] }) {
  return <Link href={href} className={cn(base, variantClasses[variant], sizeClasses[size], className)} {...props} />;
}
