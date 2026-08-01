import { useTranslations } from 'next-intl';
import { site } from '@/config/site';
import { ShieldCheck, Sparkles, Leaf, Clock, Users, Lock, HeartHandshake } from 'lucide-react';

const badgeConfig = [
  { key: 'vetted', flag: null, icon: Users },
  { key: 'insured', flag: 'insured', icon: ShieldCheck },
  { key: 'guarantee', flag: 'satisfactionGuarantee', icon: HeartHandshake },
  { key: 'local', flag: null, icon: Sparkles },
  { key: 'eco', flag: 'ecoFriendlyProducts', icon: Leaf },
  { key: 'flexible', flag: null, icon: Clock },
  { key: 'securePayments', flag: null, icon: Lock },
  { key: 'backgroundChecked', flag: 'backgroundCheckedStaff', icon: ShieldCheck },
] as const;

export function TrustBadges() {
  const t = useTranslations('trustBadges');

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {badgeConfig.map(({ key, flag, icon: Icon }) => {
        const confirmed = flag ? site.trust[flag as keyof typeof site.trust] : true;
        return (
          <li
            key={key}
            className="flex flex-col items-center gap-2 rounded-xl2 border border-pine-100 bg-white p-4 text-center"
          >
            <Icon className="h-6 w-6 text-pine-600" aria-hidden />
            <span className="text-xs font-medium text-ink-800/80">{t(key)}</span>
            {!confirmed && <span className="text-[10px] uppercase text-ink-800/40">{t('pendingConfirmation')}</span>}
          </li>
        );
      })}
    </ul>
  );
}
