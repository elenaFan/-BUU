/**
 * 自己封装模块
 * common.js的语法
 * 
 */

// 功能逻辑 封装 promise对象
// 传递具体的参数
// 参数是一个对象 属性名跟下面的属性名一致即可
function myPro(options) {
    /**
     * 实例化Pormsie时 传入的是回调函数
     * 外层的回调函数
     * 会在我们调用Promise对象时 自动执行 .then
     * resolve 跟reject 也是 回调函数
     * resolve 成功
     * reject 失败
     */
    return new Promise(function (resolve, reject) {
        // 异步操作
        wx.request({
            url: options.url || '',
            data: options.data || {},
            header: options.header || {
                'content-type': 'json'
            }, // 设置为json的目的是为了获取豆瓣数据
            method: options.method || 'GET',
            dataType: options.dataType || 'json',
            responseType: options.responseType || 'text',
            success: (result) => {
                // 成功回调
                resolve(result)
            },
            fail: () => {
                // 失败回调
                reject('数据获取失败');
            },
            complete: () => {}
        });
    })
}


// 暴露出去
export default {
    // es6的快速赋值 等同于 myPro:myPro
    myPro,
    baseUrl: 'https://autumnfish.cn/wx/'
}