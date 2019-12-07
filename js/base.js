let connectionBtn = document.getElementById('connection');
let disconnectBtn = document.getElementById('disconnect');
let sendBtn = document.getElementById('send');
let messageInfoDom = document.getElementById('messageInfo');
let ws = null;
init();
// 连接
connectionBtn.addEventListener('click', function () {
    if(ws.readyState == 1){
        createdDOM({
            class: 'server',
            label: '服务器',
            value: '服务器处于连接状态'
        })
    } else {
        init();
    }
}, false)
// 断开
disconnectBtn.addEventListener('click', function () {
    ws.close();
    createdDOM({
        class: 'server',
        label: '服务器',
        value: 'Websocket消息通道已关闭'
    })
}, false)
// 发送
sendBtn.addEventListener('click', function () {
    let sendValue = document.getElementById('sendValue').value;
    if (ws && ws.readyState == 1) {
        ws.send(sendValue)
        createdDOM({
            class: 'self',
            label: '我',
            value: sendValue
        })
        ws.onmessage = function (event) {
            createdDOM({
                class: 'server',
                label: '服务器',
                value: event.data
            })
            messageInfoDom.scrollTop = messageInfoDom.scrollHeight;
        }

    }
}, false)
// 初始化
function init(){
    let value = document.getElementById("socketUrlVal").value;
    if ('WebSocket' in window) {
        ws = new WebSocket(value);
        ws.onopen = function () {
            createdDOM({
                class: 'server',
                label: '服务器',
                value: '服务器连接成功,正在等待数据...'
            })
        }
    } else {
        createdDOM({
            class: 'server',
            label: '服务器',
            value: '你的浏览器不支持websocket'
        })
    }
}
// 插入DOM
function createdDOM(opt) {
    let liDom = document.createElement('li');
    liDom.className = 'info ' + opt.class;
    let spanDom_label = document.createElement('span');
    spanDom_label.innerHTML = opt.label;
    let spanDom_time = document.createElement('span');
    spanDom_time.innerHTML = ' ( ' + getDate() + ' ) ';
    let spanDom_value = document.createElement('span');
    spanDom_value.innerHTML = opt.value;
    liDom.appendChild(spanDom_label);
    liDom.appendChild(spanDom_time);
    liDom.appendChild(spanDom_value);
    messageInfoDom.appendChild(liDom);
}

// 获取当前时间
function getDate() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let day = now.getDay();//得到周几
    let hour = now.getHours();//得到小时
    let minu = now.getMinutes();//得到分钟
    let sec = now.getSeconds();//得到秒
    return hour + ":" + minu + ":" + sec
}