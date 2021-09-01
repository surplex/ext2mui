export default content => {
  // Locale as function
  content = content.replace(/"Locale\.t\('([^']*)'\)"/g, "Locale.t('$1')")

  // Replace 'i18n:'
  content = content.replace(/['"]i18n:([^'"]*)['"]/g, "Locale.t('$1')")

  // Replace 'local.' with 'global__'
  content = content.replace(/['"]label.([^'"]*)['"]/g, '"global__$1"')

  return content
}
