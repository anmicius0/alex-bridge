interface ImportMetaEnv {
  readonly PUBLIC_APP_ORIGIN?: string;
  readonly PUBLIC_CALENDAR_ICS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
