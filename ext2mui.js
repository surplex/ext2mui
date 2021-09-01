export default async function (namespaces, customColumnMapperStr) {
  // we cannot pass 'customColumnMapper' as a function, so we re-create the function from a string
  const customColumnMapper = Function("col", "result", "'use strict';return (" + customColumnMapperStr + ")")()
  let visitedObjects = []
  let visitedClasses = []
  let results = {}

  const isObject = obj => obj === Object(obj)

  const mapColumnDef = (col) => {
    const result = {}
    result.field = col.dataIndex
    if (!col.filter) {
      result.filterable = false
    }
    if (col.hasOwnProperty("flex")) {
      result.flex = col.flex
    }
    if (col.hasOwnProperty("width")) {
      result.width = col.width
    }
    if (col.hasOwnProperty("text")) {
      result.headerName = col.text
    }
    if (col.hasOwnProperty("menuDisabled")) {
      result.disableColumnMenu = col.menuDisabled
    }
    if (col.hasOwnProperty("sortable")) {
      result.sortable = col.sortable
    }
    if (col.hasOwnProperty("hidden")) {
      result.hide = col.hidden
    }
    if (col.hasOwnProperty("tooltip")) {
      result.description = col.tooltip
    }
    if (col.hasOwnProperty("resizable")) {
      result.resizable = col.resizable
    }
    if (col.hasOwnProperty("align")) {
      if (col.align === "start") {
        result.align = "left"
      }
      if (col.align === "center") {
        result.align = "center"
      }
      if (col.align === "end") {
        result.align = "right"
      }
    }
    if (col.hasOwnProperty("renderer")) {
      result.renderCell = col.renderer.toString()
    }
    if (col.hasOwnProperty("tdCls")) {
      result.cellClassName = col.tdCls
    }
    customColumnMapper(col, result)
    return result
  }

  const mapGridDef = (def) => {
    if (!def.columns || !Array.isArray(def.columns)) {
      return false
    }
    let copy = []
    // flatten grouped columns because there is no simple mapping possible
    def.columns.forEach((col, i) => {
      if(!col.hasOwnProperty("columns")){
        copy.push(mapColumnDef(col))
      }else{
        copy = copy.concat(mapGridDef(col))
      }
    })
    return copy
  }

  const extractGridItem = (item, currentClass) => {
    if (item.xtype && item.xtype.includes("grid")) {
      const def = mapGridDef(item)
      if (def) {
        const gridName = item.reference || item.itemId || "unknown"
        results[currentClass + ":" + gridName] = def
      }
    } else if (isObject(item)) {
      extractGrids(item, currentClass)
    }
  }

  const extractGrids = (root, currentClass) => {
    if (visitedObjects.includes(root) || !root || !isObject(root)) {
      return
    }
    visitedObjects.push(root)
    for (const key of Object.keys(root)) {
      if (!root[key] || key === "self" || key === "superclass") {
        continue
      }
      if (key === "$className") {
        if (visitedClasses.includes(root.$className)) {
          return
        }
        visitedClasses.push(root.$className)
        currentClass = root.$className
        if (root.prototype) {
          extractGrids(root.prototype, currentClass)
        }
      } else if (key === "initConfig" && typeof (root.initConfig === "function")) {
        root.$calledInitConfig = true
        root.bindings = {}
        try {
          root.initConfig({})
        } catch (e) {
          console.log("Error initializing " + currentClass)
        }
        if (root.initialConfig) {
          extractGrids(root.initialConfig, currentClass)
        }
      } else if (key === "items") {
        if (Array.isArray(root.items)) {
          root.items.forEach(i => extractGridItem(i, currentClass))
        } else {
          extractGridItem(root.items, currentClass)
        }
      } else if (isObject(root[key])) {
        extractGrids(root[key], currentClass)
      }
    }
  }

  const timeout = 10000

  const promisesNS = []

  promisesNS.push(new Promise((resolve, reject) => {
    let start = Date.now()
    let handle = window.setInterval(() => {
      if (Date.now() >= (start + timeout)) {
        reject(`Timeout waiting for ExtJs`)
      }
      if (window.Ext && window.Ext.isReady) {
        window.clearInterval(handle)
        // prevent any automatic request when initializing components
        window.Ext.Ajax.on("beforeRequest", () => false)
        resolve()
      }
    }, 100)
  }))

  namespaces.forEach(ns => promisesNS.push(new Promise((resolve, reject) => {
    let start = Date.now()
    let handle = window.setInterval(() => {
      if (Date.now() >= (start + timeout)) {
        reject(`Timeout waiting for Namespace: ${ns}`)
      }
      if (window[ns]) {
        window.clearInterval(handle)
        resolve()
      }
    }, 100)
  })))

  return new Promise((resolve, reject) => {
    try {
      Promise.all(promisesNS).then(() => {
        namespaces.forEach(ns => extractGrids(window[ns], "root"))
        resolve(JSON.stringify(results))
      }).catch(reject)
    } catch (e) {
      console.error(e)
    }
  })
}
