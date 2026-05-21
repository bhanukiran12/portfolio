import { SiCalendly, SiGmail, SiSignal, SiWhatsapp } from 'react-icons/si';
import type { IconType } from 'react-icons';

const brandIcons: Record<
  ChannelIconId,
  { Icon: IconType; color: string; label: string }
> = {
  calendly: { Icon: SiCalendly, color: '#006BFF', label: 'Calendly' },
  whatsapp: { Icon: SiWhatsapp, color: '#25D366', label: 'WhatsApp' },
  signal: { Icon: SiSignal, color: '#3A76F0', label: 'Signal' },
  email: { Icon: SiGmail, color: '#EA4335', label: 'Gmail' },
};

export type ChannelIconId = 'calendly' | 'whatsapp' | 'signal' | 'email';

export function ChannelIcon({
  id,
  className = 'channel-logo',
}: {
  id: ChannelIconId;
  className?: string;
}) {
  const { Icon, color, label } = brandIcons[id];

  return (
    <Icon
      className={className}
      color={color}
      aria-hidden="true"
      title={label}
    />
  );
}
