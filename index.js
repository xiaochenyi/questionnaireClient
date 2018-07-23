
/**
 * qus_type (1简单 2专业)
 */
var vm = new Vue({
    el: '#app',
    data: {
        questionList:[],
        pst:{},
        curQues: 1,
        curPage: 1,
        user_name: '',
        user_sex: '',
        user_age: '',
        user_phone: '',
        user_industry: '',
        success: false,
    },
    computed: {
        easyQuesList: function () {
            return this.questionList.filter(function (item) {
                return (item.question_type == 1)
            })
        },
        highQuesList: function () {
            return this.questionList.filter(item => item.question_type == 2)
        }
    },
    created() {
        this.$nextTick(function () {
            axios.get('http://172.16.120.163:3001/').then(res => {
                this.questionList = res.data;
                this.initPicked();
            })
        })
    },
    methods: {
        initPicked: function () {
            this.questionList.forEach(item => {
                vm.$set(item, 'picked', '')
            })
        },
        showPage: function (p) {
            hideAllPage();
            let i = 'page' + p;
            this.pst[i]=true;
            this.curPage = p;
        },
        showPagePrev: function() {
            let easyLen = this.easyQuesList.length;
            let p = this.curPage - 1 < 1 ? 1 : this.curPage - 1;

            if(p === 5 && this.checkAllFalse()) {
                // 如果当前是提交信息页面 而且前三题为否
                this.curQues = easyLen;
                this.showPage(3)
            } else {
                this.showPage(p);
            }
        },
        showPageNext: function() {
            let p = this.curPage + 1 > 9 ? 9 : this.curPage + 1;
            this.showPage(p);
        },
        showQuesPrev: function (id) {
            if(id === 1) {
                this.showPagePrev()
            } else {
                this.curQues =  (id - 1) < 1 ? 1 : (id - 1);
            }
        },
        showQuesNext: function (item) {
            let id = item.id;
            let easyLen = this.easyQuesList.length;
            let alllen = this.questionList.length;
            this.curQues = (id + 1) > alllen ? alllen : (id + 1);

            if(id == easyLen) {
                if(this.checkAllFalse()) {
                    this.showPage(6)
                } else {
                    this.showPageNext()
                }
            }
            if(id == alllen) { // 简单题或专业题的最后一题
                this.showPageNext()
            }
        },
        // 提交信息
        showRst: function () {
            if(!this.check()) {
                return
            }
            let resArr = [];
            this.questionList.forEach(function (item) {
                resArr.push(item.id + ':' + item.picked)
            })
            axios.post('http://172.16.120.163:3001/submit', {
                user_name: this.user_name,
                user_sex: this.user_sex,
                user_age: this.user_age,
                user_phone: this.user_phone,
                user_industry: this.user_industry,
                question_result: resArr.join('/')
            }).then(res => {
                console.log(res);
                let data = res.data;
                if(data.errCode == 0) {
                    this.success = true;
                } else {
                    this.success = false;
                }
                this.showPage(7)
            }).catch(error => console.log(error))
        },
        checkAllFalse: function () {
            return this.easyQuesList.every(function (item) {
                return (item.picked === '否')
            })
        },
        check: function () {
            if(!utils.checkName(this.user_name)) {
                utils.toast("姓名格式有问题");
                return false;
            }
            if(!utils.checkSex(this.user_sex)) {
                utils.toast("请填写正确的性别");
                return false;
            }
            if(!utils.checkAge(this.user_age)) {
                utils.toast("请填写正确的年龄");
                return false;
            }
            if(!utils.checkTel(this.user_phone)) {
                utils.toast("请检查你的手机号有误");
                return false;
            }
            if(!utils.checkEmpty(this.user_industry)) {
                utils.toast("请填写行业");
                return false;
            }
            return true;
        }
    }
})

function hideAllPage() {
    let tmp = {};
    for (let i = 1; i < 9; i++) {
        let p = 'page' + i;
        tmp[p] = false;
    }
    vm.pst = tmp;
}

// 初始化显示首页
hideAllPage();
vm.pst.page1 = true;