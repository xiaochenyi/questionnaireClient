// export default function (el, option) {
//     const setting = Object.assign({
//         top: 0, // 元素在顶部伸出的距离
//         right: 0, // 元素在右边伸出的距离才
//         bottom: 0, // 元素在底部伸出的距离
//         left: 0 // 元素在左边伸出的距离
//     }, option)
//
//     var bcr = el.getBoundingClientRect() // 取得元素在可视区的位置
//
//     var mw = el.offsetWidth // 元素自身宽度
//     var mh = el.offsetHeight // 元素自身的高度
//     var w = window.innerWidth // 视窗的宽度
//     var h = window.innerHeight // 视窗的高度
//     var boolX = (!((bcr.right - setting.left) <= 0 && ((bcr.left + mw) - setting.left) <= 0) && !((bcr.left + setting.right) >= w && (bcr.right + setting.right) >= (mw + w))) // 上下符合条件
//     var boolY = (!((bcr.bottom - setting.top) <= 0 && ((bcr.top + mh) - setting.top) <= 0) && !((bcr.top + setting.bottom) >= h && (bcr.bottom + setting.bottom) >= (mh + h))) // 上下符合条件
//
//     return el.width !== 0 && el.height !== 0 && boolX && boolY
// }


var utils = {
    /**
     * 检测元素是否在可视区域
     * @param el
     * @param option
     * @returns {boolean}
     */
    isSeeing(el, option) {
        const setting = Object.assign({
            top: 0, // 元素在顶部伸出的距离
            right: 0, // 元素在右边伸出的距离才
            bottom: 0, // 元素在底部伸出的距离
            left: 0 // 元素在左边伸出的距离
        }, option)

        var bcr = el.getBoundingClientRect() // 取得元素在可视区的位置

        var mw = el.offsetWidth // 元素自身宽度
        var mh = el.offsetHeight // 元素自身的高度
        var w = window.innerWidth // 视窗的宽度
        var h = window.innerHeight // 视窗的高度
        var boolX = (!((bcr.right - setting.left) <= 0 && ((bcr.left + mw) - setting.left) <= 0) && !((bcr.left + setting.right) >= w && (bcr.right + setting.right) >= (mw + w))) // 上下符合条件
        var boolY = (!((bcr.bottom - setting.top) <= 0 && ((bcr.top + mh) - setting.top) <= 0) && !((bcr.top + setting.bottom) >= h && (bcr.bottom + setting.bottom) >= (mh + h))) // 上下符合条件

        return el.width !== 0 && el.height !== 0 && boolX && boolY
    },

    /**
     * 消息提示
     */
    toast(msg='', time = 1500) {
        var toast = document.createElement('div')
        toast.className = 'common-toast common-toast-show'
        toast.innerHTML = msg
        document.body.appendChild(toast)
        toast.style.display = "block"
        toast.style.margin = `-${toast.offsetHeight / 2}px 0 0 -${toast.offsetWidth / 2}px`
        var timer = setTimeout(() => {
            toast.className = 'common-toast common-toast-hide'
            clearTimeout(timer)
            var timer2 = setTimeout(() => {
                document.body.removeChild(toast)
                clearTimeout(timer2)
            }, 200)
        },time)
    },

    /**
     * 检测姓名格式是否正确
     */
    checkName(str) {
        if (!str) {
            return false;
        }
        if (str.length <2 || str.length >5) {
            return false;
        }
        var reg=/^[\u4e00-\u9fa5](\s*[\u4e00-\u9fa5])*$/;
        var flag = reg.test(str);
        return flag;
    },
    /**
     * 检测手机号码格式是否正确
     */
    checkTel(mobile){
        // var pattern = /^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        var pattern = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
        return pattern.test(mobile);
    },
    /**
     * 检测性别格式
     */
    checkSex(val){
        if (!val) {
            return false;
        }
        var reg= /^['男'|'女']$/;
        var flag = reg.test(val);
        return flag;
    },
    /**
     * 检测年龄
     */
    checkAge(val){
        if (!val) {
            return false;
        }
        var reg= /^\+?[1-9][0-9]*$/;
        var flag = reg.test(val);
        return flag;
    },
    /**
     * 检测邮箱格式是否正确
     */
    checkEmail(email){
        var pattern = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        return pattern.test(email);
    },
    /**
     * 检测内容是否空
     */
    checkEmpty(val){
        if(val == '') {
            return false;
        } else {
            return true;
        }
    },

    /**
     * 获取URL参数
     */
    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }

}