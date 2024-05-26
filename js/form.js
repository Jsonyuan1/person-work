(function(){
    // 定义了一个对象，包含不同输入字段的提示信息
    var hintText={
        user_email:{hint:"请填写邮箱",right:"√邮箱格式正确",wrong:"×邮箱格式有误，请重新输入"},
        user_name:{hint:"请填写符合格式的用户名",right:"√用户名格式正确",wrong:"×用户名格式有误，请重新输入"},
        phone:{hint:"请填写手机号",right:"√电话号码输入正确",wrong:"×电话号码输入有误，请重新输入"},
        password:{hint:"请填写符合格式的密码",right:"√密码格式正确",wrong:"×请输入符合格式的密码"},
        repassword:{hint:"请再次输入密码",right:"√再次输入密码正确",wrong:"×两次输入不一致或密码格式不正确，请重新输入或密码格式不正确"}
    };
    // 用于注册事件的函数
    var regEvent=function(node, event, func){
        if (node.addEventListener)
            node.addEventListener(event, func);
        else if (node.attachEvent)
            node.attachEvent("on" + event, func);
        else
            node["on" + event] = func;
    };
    // 用于验证输入值的函数
    function regValue(id,i){
        var flag=false,
        input=document.getElementById(id),  
        value=input.value;  
        // 根据输入框的id进行不同的正则验证
        switch (id){
            // 用户名验证，允许4-16位字母数字下划线
            case "user_name":
            case "login_user_name":
            case "info_user_name":
                flag=/^[a-zA-Z0-9_]{4,16}$/.test(value.replace(/[\u0391-\uFFE5]/g,"nn"));
                id="user_name";
                break;
            
             
            // 密码验证，允许6-16位非空白字符
            case "password":
            case "login_password":
            case "info_password":
                flag=/^\S{6,16}$/.test(value);
                id="password";
                break;
            // 重复密码验证，必须与密码输入框中的值相同
            case "repassword":
                flag=document.getElementById("password").value==value && value !="" && value !=null && (/^\S{6,16}$/.test(value));
                break;
             
            // 邮箱验证，标准的邮箱格式
            case "user_email":
            case "forget_user_email":
            case "info_user_email":
                flag=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/.test(value);
                id="user_email";
                break;
            // 手机号验证，符合中国大陆手机号格式
            case "phone":
            case "info_phone":
            case "send_to_phone":
            case "send_from_phone":
                flag=/^((\(\d{2,3}\))|(\d{3}\-))?1[3,8,5]{1}\d{9}$/.test(value);
                id="phone";
                break;
             
            
        }
        // 根据验证结果更新输入框和提示信息的样式
        if(flag) {
            index=0;
            input.className="right input";
            hint[i].className="hint hint_right";
            hint[i].innerHTML=hintText[id].right;
        }else{
            input.className="wrong input";
            hint[i].className="hint hint_wrong";
            hint[i].innerHTML=hintText[id].wrong;
            index=1;
        }
    };

    // 获取页面上所有的输入框和提示信息元素
    var inputs=document.getElementsByClassName("input"),
    id,
    hint=document.getElementsByClassName("hint"),
    index=0;
    // 为每个输入框绑定focus和blur事件
    for(var j=0;j<inputs.length;j++){
        (function(i){
            regEvent(inputs[i],"focus",function(){
                hint[i].style.visibility="visible";
                id=inputs[i].id;
            });
            regEvent(inputs[i],"blur",function(){
               regValue(id,i);
            });
        })(j)
    }
})();