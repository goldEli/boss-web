const startTemplate = `
    
<!DOCTYPE html>
<html class="">


<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>管理系统</title>
    <link rel="stylesheet" href="/assets/common/libs/layui/css/layui.css?v=20220111"/>
    <link rel="stylesheet" href="/assets/common/module/admin.css?v=20220111" media="all"/>
    <link rel="stylesheet" href="/assets/expand/css/style.css?v=20220111" media="all"/>

    <!--其他插件css-->

</head>

<body>


`

const middleTemplate = `
<script type="text/javascript">
    var Feng = {
        ctxPath: "",
        version: '20220111'
    };
</script>

<script type="text/javascript" src="/assets/common/libs/layui/layui.js?v=20220111"></script>
<script type="text/javascript" src="/assets/common/js/common.js?v=20220111"></script>

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