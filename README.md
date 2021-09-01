# Ext To Mui Grid Converter

## What
This tool scrapes any website using ExtJs grids and converts the column definitions into definitions that can be used by the [Material UI](https://material-ui.com) grids.  
This might be useful for the migration of an ExtJs project that has lots of grids and columns to Material UI.

## How

### Install
````shell
docker-compose up build
````

### Use
Enter the config for your project in 'Makefile':  
E2M_URL:"https://my-extjs-project.com"      # The url  
E2M_NS:"MyApp"                              # The namespace(s) (comma-separated)
````shell
make up
````
This will output all the configs that can be found into the directory 'output', one directory for each grid.

### Result
Obviously, there are limits of what can be mapped. Currently, the following properties will be mapped with values accordingly:
````shell
 *  !filter        => !filterable (no filter defined => not filterable)
 *  align          => align
 *  flex           => flex
 *  hidden         => hide
 *  menuDisabled   => disableColumnMenu
 *  renderer       => renderCell (function body will be commented out)
 *  resizable      => resizable
 *  sortable       => sortable
 *  tdCls          => cellClassName
 *  text           => headerName
 *  tooltip        => description
 *  width          => width
````
Most functions cannot be mapped currently, except for the 'renderer', which will be commented out, as it will have to be adjusted manually to the params of 'renderCell'.  
Grouped headers will be 'flattened', as multi-dimensional headers cannot currently be created in MUI easily. 

### Customize
While the above mapping is rather straight forward, there might be custom properties you want to map. There are two places where this can be done:  

1) On Column Level. Create a file called 'customColumnMapper.js' in the root directory. This file must export a default function that can map any column property to a result object (no need to return the result). However, the result can only contain literals (no functions etc.).
````javascript
export default (col, result) => {
    if (col.x) {
        result.y = ...
    }
}
````

2) On Grid Level: Create a file called 'customContentReplacer.js' in the root directory. This file must export a default function that can modify and return the definition of all columns of one grid. The result must be returned. You can e.g. convert or inject strings or functions here.
````javascript
export default content => {
  content = content.replace...
  return content
}
````

### Development
As a migration is a one-time task, the effort put into this is somewhat limited and there won't probably be much further development in the near future. If you want to contribute, feel free to create a PR or fork the project.
