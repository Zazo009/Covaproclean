import { useTranslations } from 'next-intl';
import { site } from '@/config/site';
import { ShieldCheck, Sparkles, Leaf, Clock, ClipboardCheck, HeartHandshake, ShieldOff } from 'lucide-react';

/**
 * Only ever shows claims that are true right now — either a confirmed
 * `site.trust` flag, or a fact about how the booking system itself works
 * (reviewed manually, no upfront payment, flexible scheduling). No badge is
 * ever rendered with a "pending" caption: an unconfirmed claim is simply
 * left out rather than announced as unconfirmed.
 */
const alwaysTrue = [
  { key: 'reviewed', icon: ClipboardCheck },
  { key: 'costaFocus', icon: Sparkles },
  { key: 'noUpfrontPayment', icon: ShieldOff },
  { key: 'flexible', icon: Clock },
] as const;

const flagGated = [
  { key: 'insured', flag: 'insured', icon: ShieldCheck },
  { key: 'guarantee', flag: 'satisfactionGuarantee', icon: HeartHandshake },
  { key: 'eco', flag: 'ecoFriendlyProducts', icon: Leaf },
  { key: 'backgroundChecked', flag: 'backgroundCheckedStaff', icon: ShieldCheck },
] as const;

export function TrustBadges() {
  const t = useTranslations('trustBadges');
  const confirmedExtras = flagGated.filter(({ flag }) => site.trust[flag]);
  const badges = [...alwaysTrue, ...confirmedExtras];

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {badges.map(({ key, icon: Icon }) => (
        <li
          key={key}
          className="flex flex-col items-center gap-2 rounded-xl2 border border-pine-100 bg-white p-4 text-center"
        >
          <Icon className="h-6 w-6 text-pine-600" aria-hidden />
          <span className="text-xs font-medium text-ink-800/80">{t(key)}</span>
        </li>
      ))}
    </ul>
  );
}
