import { Link } from "@tanstack/react-router";
import type { Pack, Bot } from "~/types/api";
import { 
  getBotAvatarUrl as getBotAvatarUrlLib,
  getUserAvatarUrl,
  PackIconPlaceholder,
  BotAvatarPlaceholder
} from "~/lib/images";
import { PackBannerPlaceholder } from "~/components/placeholders";

interface PackCardProps {
  pack: Pack;
  variant?: "default" | "featured" | "compact";
}

// Helper to get bot avatar - uses omniplex CDN via bot_id, falls back to Discord CDN
function getBotAvatarUrl(bot: Bot): string {
  // If we have a bot_id, use Omniplex CDN
  if (bot.bot_id) {
    return getBotAvatarUrlLib(bot.bot_id);
  }
  // Fallback to Discord CDN using user data
  return getUserAvatarUrl(bot.user.id, bot.user.avatar);
}

// Helper to get user avatar
function getPackUserAvatarUrl(userId: string, avatarHash?: string): string {
  return getUserAvatarUrl(userId, avatarHash);
}

export function PackCard({ pack, variant = "default" }: PackCardProps) {
  const botCount = pack.bots?.length || pack.bot_ids?.length || 0;
  // Use first bot's avatar or pack creator's avatar as the icon
  const iconUrl = pack.bots?.[0] 
    ? getBotAvatarUrl(pack.bots[0])
    : pack.user 
      ? getPackUserAvatarUrl(pack.user.id, pack.user.avatar)
      : null;

  if (variant === "compact") {
    return (
      <Link
        to="/"
        className="group glass rounded-xl p-3 flex items-center gap-3 hover:scale-[1.02] transition-all duration-300"
      >
        <div className="relative">
          {iconUrl ? (
            <img
              src={iconUrl}
              alt={pack.name}
              className="w-10 h-10 rounded-lg object-cover ring-2 ring-border"
            />
          ) : (
            <PackIconPlaceholder size={40} className="ring-2 ring-border rounded-lg" />
          )}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-brand-500/20 rounded-full flex items-center justify-center">
            <span className="text-[10px] font-bold text-brand-400">{botCount}</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate group-hover:text-brand-400 transition-colors">
            {pack.name}
          </h4>
          <p className="text-xs text-muted-foreground truncate">{botCount} bots</p>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        to="/"
        className="group relative glass rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500"
      >
        {/* Pack Banner Background */}
        <div className="relative h-36 overflow-hidden">
          <PackBannerPlaceholder className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="glass px-2 py-1 rounded-full text-xs font-medium text-brand-400 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {botCount} Bots
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-5">
          {/* Pack Icon */}
          <div className="absolute -top-8 left-5">
            <div className="relative">
              {iconUrl ? (
                <img
                  src={iconUrl}
                  alt={pack.name}
                  className="w-16 h-16 rounded-xl object-cover ring-4 ring-[var(--glass-bg)] shadow-xl"
                />
              ) : (
                <PackIconPlaceholder size={64} className="ring-4 ring-[var(--glass-bg)] shadow-xl rounded-xl" />
              )}
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-border" />
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-bold text-foreground group-hover:text-brand-400 transition-colors">
              {pack.name}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {pack.short || "A curated collection of Discord bots"}
            </p>

            {/* Bot Names Preview */}
            {pack.bots && pack.bots.length > 0 && (
              <div className="mt-4">
                <div className="text-xs text-muted-foreground mb-2">Includes:</div>
                <div className="flex flex-wrap gap-1.5">
                  {pack.bots.slice(0, 4).map((bot, index) => (
                    <span
                      key={bot.bot_id || `bot-name-${index}`}
                      className="px-2 py-0.5 rounded-md text-xs bg-muted text-muted-foreground border border-border"
                    >
                      {bot.user.display_name}
                    </span>
                  ))}
                  {pack.bots.length > 4 && (
                    <span className="px-2 py-0.5 rounded-md text-xs text-muted-foreground">
                      +{pack.bots.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Owner */}
            {pack.user && (
              <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                <img
                  src={getPackUserAvatarUrl(pack.user.id, pack.user.avatar)}
                  alt={pack.user.display_name}
                  className="w-5 h-5 rounded-full"
                />
                <span className="text-xs text-muted-foreground">by {pack.user.display_name}</span>
              </div>
            )}
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-500/10 via-transparent to-brand-600/10" />
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      to="/"
      className="group glass rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
    >
      {/* Header with bot avatars */}
      <div className="h-20 relative overflow-hidden bg-gradient-to-br from-brand-500/20 via-brand-500/10 to-brand-600/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex -space-x-2">
            {pack.bots?.slice(0, 4).map((bot, index) => (
              <img
                key={bot.bot_id || `bot-default-${index}`}
                src={getBotAvatarUrl(bot)}
                alt={bot.user.display_name}
                className="w-8 h-8 rounded-lg ring-2 ring-[var(--glass-bg)] object-cover"
                style={{ zIndex: 4 - index }}
              />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--glass-bg)] to-transparent" />
      </div>

      <div className="p-4 relative">
        {/* Pack Icon */}
        <div className="absolute -top-5 left-4">
          {iconUrl ? (
            <img
              src={iconUrl}
              alt={pack.name}
              className="w-10 h-10 rounded-lg object-cover ring-2 ring-[var(--glass-bg)] shadow-lg"
            />
          ) : (
            <PackIconPlaceholder size={40} className="ring-2 ring-[var(--glass-bg)] shadow-lg rounded-lg" />
          )}
        </div>

        {/* Bot Count Badge */}
        <div className="flex justify-end mb-3">
          <span className="px-2 py-1 glass rounded-full text-xs font-medium text-brand-400 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            {botCount}
          </span>
        </div>

        <h3 className="font-semibold text-foreground group-hover:text-brand-400 transition-colors truncate">
          {pack.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {pack.short || "Bot pack"}
        </p>

        {/* Tags */}
        {pack.tags && pack.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {pack.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 rounded text-[10px] bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Owner */}
        {pack.user && (
          <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
            <img
              src={getPackUserAvatarUrl(pack.user.id, pack.user.avatar)}
              alt={pack.user.display_name}
              className="w-4 h-4 rounded-full"
            />
            <span className="text-xs text-muted-foreground truncate">by {pack.user.display_name}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
