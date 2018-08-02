<?php

require_once './system/core/Tracer.php';
require_once './system/core/TracerModels.php';

//调用自动加载
@spl_autoload_register(function ($class) {
    if (!class_exists($class)) {
        @require_once('./application/controllers/' . ucfirst($class) . '.php');
    }
});

$url_info = parse_url($_SERVER['REQUEST_URI']);

//获取URL中的信息
$info = array_filter(explode('/', $url_info['path']));
if (isset($info[1]) && $info[1] == 'index.php') {
    array_shift($info);
}


//获取要调用的类,如果没有指定要调用的类，则默认为viewer类
//如果直接访问网站域名，则调用view类的login方法
if (sizeof($info) < 1) {
    $class = 'viewer';
} else {
    $class = implode(array_slice($info, 0, 1));
}


//获取要调用的函数，如果没有指定要调用的方法，则默认为index方法
if (sizeof($info) < 2) {
    $function = 'index';
} else {
    $function = implode(array_slice($info, 1, 1));
}

//获取URL中的参数(待完善
$parameter = array_slice($info, 2);

if (sizeof($info) === 1 and $info[1] == 'admin') {
    $class = 'viewerb';
    $function = 'login';
}

//调用
$exc = new $class();

// call_user_func_array的返回值为回调函数执行的结果或者为false,此处代码是为防止用户通过url非法访问已存在的方法
if (!@call_user_func_array(array($exc, $function), $parameter))
    die('非法访问，错误的URL');
