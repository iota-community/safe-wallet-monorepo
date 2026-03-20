import type { ReactElement, ReactNode } from 'react'
import { SvgIcon, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import Link from 'next/link'
import { useRouter } from 'next/router'
import css from './styles.module.css'
import { AppRoutes } from '@/config/routes'
import { APP_VERSION, APP_HOMEPAGE } from '@/config/version'
import ExternalLink from '../ExternalLink'
import MUILink from '@mui/material/Link'
import { useIsOfficialHost } from '@/hooks/useIsOfficialHost'
import { HELP_CENTER_URL } from '@safe-global/utils/config/constants'
import { IS_PRODUCTION, COMMIT_HASH } from '@/config/constants'
import type { FooterProps } from './footer.type'

const footerPages = [
  AppRoutes.settings.index,
  AppRoutes.imprint,
  AppRoutes.privacy,
  // AppRoutes.cookie,
  AppRoutes.terms,
  AppRoutes.licenses,
]

const FooterLink = ({ children, href }: { children: ReactNode; href: string }): ReactElement => {
  return href ? (
    <Link href={href} passHref legacyBehavior>
      <MUILink>{children}</MUILink>
    </Link>
  ) : (
    <MUILink>{children}</MUILink>
  )
}

const Footer: React.FC<FooterProps> = ({
  forceShow,
  preferences = true,
  versionIcon = true,
  helpCenter = true,
  className = css.container,
}): ReactElement | null => {
  const router = useRouter()
  const isOfficialHost = useIsOfficialHost()
  const initialYear = 2025
  const currentYear = new Date().getFullYear()
  // eslint-disable-next-line unused-imports/no-unused-vars
  const copyrightYear = initialYear === currentYear ? initialYear : `${initialYear}–${currentYear}`

  if (!footerPages.some((path) => router.pathname.startsWith(path)) && !forceShow) {
    return null
  }

  const getHref = (path: string): string => {
    return router.pathname === path ? '' : path
  }

  return (
    <footer className={className}>
      <ul style={{ margin: 'auto' }}>
        {isOfficialHost ? (
          <>
            <li>
              <FooterLink href={getHref(AppRoutes.terms)}>Terms of Use</FooterLink>
            </li>
            <li>
              <FooterLink href={getHref(AppRoutes.privacy)}>Privacy Policy</FooterLink>
            </li>
            <li>
              <FooterLink href={getHref(AppRoutes.licenses)}>Licenses</FooterLink>
            </li>
            {preferences && (
              <li>
                <FooterLink href={getHref(AppRoutes.settings.index)}>Preferences</FooterLink>
              </li>
            )}
            {helpCenter && (
              <li>
                <ExternalLink href={HELP_CENTER_URL} noIcon sx={{ span: { textDecoration: 'underline' } }}>
                  Help
                </ExternalLink>
              </li>
            )}
          </>
        ) : (
          <li>This is an unofficial distribution of the app</li>
        )}

        <li>
          <ExternalLink href="https://github.com/iota-community/safe-wallet-monorepo" noIcon>
            {versionIcon && <SvgIcon component={GitHubIcon} inheritViewBox fontSize="inherit" sx={{ mr: 0.5 }} />}v
            {APP_VERSION}
          </ExternalLink>
        </li>

        {!IS_PRODUCTION && COMMIT_HASH && (
          <li>
            <ExternalLink href={`${APP_HOMEPAGE}/commit/${COMMIT_HASH}`} noIcon>
              {COMMIT_HASH.slice(0, 7)}
            </ExternalLink>
          </li>
        )}

        <li>
          <Typography variant="caption" display="block">
            IOTA Ecosystem DLT Foundation, Office No. 1301 & 1302,
            <br />
            Floor 13 Tamouh Tower, Tamouh, Al Reem Island,
            <br />
            Abu Dhabi, UAE, contact@iotadlt.foundation
            <br />
          </Typography>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
