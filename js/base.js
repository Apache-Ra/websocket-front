    let connectionBtn = document.getElementById('connection');
    let disconnectBtn = document.getElementById('disconnect');
    let sendBtn = document.getElementById('send');
    let ws = null;
    let connectionInfo = document.getElementById('connectionInfo');
    let messageInfoDom = document.getElementById('messageInfo');

    connectionBtn.addEventListener('click', function () {
        let value = document.getElementById("url").value;
        if ('WebSocket' in window) {
            ws = new WebSocket(value);
            ws.onopen = function () {
                connectionInfo.innerHTML = '连接成功'
                connectionInfo.style.color = 'green'
                install_services({time: getDate(), value: '服务器连接成功,正在等待数据...'})
            }

        } else {
            install_services({time: getDate(), value: '你的浏览器不支持websocket'})
            connectionInfo.innerHTML = '你的浏览器不支持websocket'
            connectionInfo.style.color = 'red'
        }
    }, false)


    // 我发送的信息
    function install_self (data){
        let liDom = document.createElement('li');
        let spanDom_key = document.createElement('span');
        let spanDom_val = document.createElement('span');
        let _iDom = document.createElement('i');
        let iDom_ = document.createElement('i');
        spanDom_val.innerHTML = ''+data.value+' : '
        _iDom.innerText = '('+data.time+')'
        iDom_.innerHTML = '我'
        liDom.className = 'message self';
        liDom. appendChild(spanDom_val);
        liDom. appendChild(spanDom_key);
        spanDom_key. appendChild(_iDom);
        spanDom_key. appendChild(iDom_);
        messageInfoDom. appendChild(liDom);
    }
    // 返回消息
    function install_services (data){
        let messageInfoDom = document.getElementById('messageInfo');
        let liDom = document.createElement('li');
        let spanDom_key = document.createElement('span');
        let spanDom_val = document.createElement('span');
        let _iDom = document.createElement('i');
        let iDom_ = document.createElement('i');
        spanDom_val.innerHTML = ' : '+data.value+''

        _iDom.innerText = '('+data.time+')'
        iDom_.innerHTML = '服务器'
        liDom.className = 'message services';
        liDom. appendChild(spanDom_key);
        liDom. appendChild(spanDom_val);
        spanDom_key. appendChild(iDom_);
        spanDom_key. appendChild(_iDom);
        messageInfoDom. appendChild(liDom);
    }
    // 发送
    sendBtn.addEventListener('click', function () {
        connectionInfo.innerHTML = ''
        let sendValue = document.getElementById('sendValue').value;
        let data = {time: getDate(), value: sendValue}
        if(ws && ws.readyState == 1){
            if(sendValue.length>0){
                ws.send(sendValue)
                install_self(data)
                ws.onmessage = function (event, i) {
                    let data = {time: getDate(), value: event.data}
                    install_services(data)
                    messageInfoDom.scrollTop = messageInfoDom.scrollHeight;
                }

            } else {
                connectionInfo.innerHTML = '检测到您内容为空'
                connectionInfo.style.color = 'red'
            }
        } else {
            install_services({time: getDate(), value: '服务器已断开连接'})
            connectionInfo.innerHTML = '尚未建立连接'
            connectionInfo.style.color = 'red'
        }

        
    }, false)
    // 断开连接
    disconnectBtn.addEventListener('click', function () {
        ws.close();
        install_services({time: getDate(), value: '服务器已断开连接'})
        connectionInfo.innerHTML = '连接已经关闭'
        connectionInfo.style.color = 'red'
    }, false)
    // 获取当前时间
    function getDate() {

        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth()+1;
        let date = now.getDate();
        let day = now.getDay();//得到周几
        let hour = now.getHours();//得到小时
        let minu = now.getMinutes();//得到分钟
        let sec = now.getSeconds();//得到秒

        return hour+":"+minu+":"+sec
    }
    // 时间戳转换为时间

    function formatDate(number) {
        let n = number * 1000;
        let date = new Date(n);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return (Y + M + D + " " + h + m + s);
    }