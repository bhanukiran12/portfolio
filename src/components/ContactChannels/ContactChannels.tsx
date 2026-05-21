import { contactConfig, getWhatsAppUrl } from '../../config/contact'
import { ChannelIcon, type ChannelIconId } from './ChannelIcons'
import './ContactChannels.css'

const channels: {
  id: ChannelIconId
  label: string
  description: string
  href: string
  primary?: boolean
}[] = [
  {
    id: 'calendly',
    label: 'Book a call',
    description: 'Calendly — pick a time',
    href: contactConfig.calendlyUrl,
    primary: true,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    description: '+91 63094 99278',
    href: getWhatsAppUrl(),
  },
  {
    id: 'signal',
    label: 'Signal',
    description: 'Message on Signal',
    href: contactConfig.signalUrl,
  },
  {
    id: 'email',
    label: 'Email',
    description: contactConfig.email,
    href: `mailto:${contactConfig.email}`,
  },
]

type ContactChannelsProps = {
  compact?: boolean
}

function ContactChannels({ compact = false }: ContactChannelsProps) {
  return (
    <div className={`contact-channels ${compact ? 'contact-channels--compact' : ''}`}>
      {!compact && (
        <p className="contact-channels-lead">
          Prefer a quick chat? Book a slot or message me — I work in{' '}
          <strong>IST (preferred)</strong> and can align with your time zone.
        </p>
      )}
      <div className="contact-channels-grid">
        {channels.map((channel) => (
          <a
            key={channel.id}
            href={channel.href}
            className={`contact-channel-btn ${channel.primary ? 'contact-channel-btn--primary' : ''}`}
            target={channel.id === 'email' ? undefined : '_blank'}
            rel={channel.id === 'email' ? undefined : 'noopener noreferrer'}
            aria-label={`${channel.label}: ${channel.description}`}
          >
            <span className="contact-channel-icon">
              <ChannelIcon id={channel.id} className="channel-logo" />
            </span>
            <span className="contact-channel-text">
              <span className="contact-channel-label">{channel.label}</span>
              <span className="contact-channel-desc">{channel.description}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default ContactChannels
