export default (col, result) => {
  if (col.bind) {
    if (col.bind.text) {
      /* handle custom i18 binding like:
       bind: {
         text: "{'my.text.key':i18n}"
       }
       or:
       bind: {
         text: '{"my.text.key":i18n}'
       }
       and replace them with new translation function (Locale.t('my.text.key') in this case)
       */
      let headerName = col.bind.text
      headerName = headerName.replace(/[^']+'([^']*)'[^']+.*/, "$1")
      headerName = headerName.replace(/[^"]+"([^"]*)"[^"]+.*/, "$1")
      result.headerName = `Locale.t('${headerName}')`
    }
  }
}
