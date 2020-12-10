const baseUrl = 'http://school.nice-6.com'

export default (params) => {
	uni.showLoading({
		title: '加载中'
	})
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + params.url,
			method: params.method,
			data: params.data,
			header: {
				"Content-Type": "application/json; charset=UTF-8"
			},
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}
