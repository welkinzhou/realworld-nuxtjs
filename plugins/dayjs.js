import Vue from 'vue';
import dayjs from 'dayjs';

//  创建过滤器
Vue.filter('date', (val, format = 'YYYY-MMM-DD') => {
    return dayjs(val).format(format)
})