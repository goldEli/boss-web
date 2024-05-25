const utils = require('./utils')
const bossConfig = utils.getConfig()

const startTemplate = function (cssStr='') {
    return `
    
<!DOCTYPE html>
<html class="">


<head>
  
    ${bossConfig.header}

    <!--其他插件css-->
    ${cssStr}

</head>

<body>


`
}

const middleTemplate = `
    ${bossConfig.script}

<!--其他插件js-->
`

const endTemplate = `
</body>
</html>
`

module.exports = {
    startTemplate,
    middleTemplate,
    endTemplate
}