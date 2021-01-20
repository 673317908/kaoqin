<template>
	<view id="page">
		<view class="month_collect">
			<view class="month_collect_title">
				<view>{{userDetail.name}},{{monthTitle}}月汇总</view>
				<view class="iconfont icon-arrow-right" style="color:#c1c1c2;font-size:24rpx;" @click="jump"></view>
			</view>
			<view class="month_collect_number">
				<view class="month_collect_late">
					<view class="num">{{userDetail.leave_count>0?userDetail.leave_count:0}}</view>
					<view class="text">请假（次）</view>
				</view>
				<view class="month_collect_late">
					<view class="num">{{userDetail.early_count>0?userDetail.early_count:0}}</view>
					<view class="text">迟到（次）</view>
				</view>
				<view class="month_collect_leave">
					<view class="num">{{userDetail.even_count>0?userDetail.even_count:0}}</view>
					<view class="text">早退（次）</view>
				</view>
			</view>
		</view>
		<view class="day_record">
			<view class="day_record_title">
				<view>每日记录<text style="color:#c1c1c2;margin-left:20rpx;font-weight:500;font-size:30rpx;">（{{monthTitle}}月）</text></view>
			</view>
			<!-- 日历 -->
			<view class="day_record_calendar">
				<view class="calendar_list">
					<view class="calendar_item" v-for="(item,index) in calendarArray" :key="index">
						<text>{{item}}</text>
					</view>
				</view>
				<view class="day_list">
					<view :style="activeIndex===index?'background-color: #008fff;border-radius: 50%;color:white;':''" :class="[item.todayShow?['day_item','active_day_css']:['day_item']]"
					 v-for="(item,index) in week" :key="index" @click="activeDay(index)"><text :style="index>=5?'color:#e1e1e1;':''">{{item.day}}</text></view>
				</view>
			</view>
			<view class="line">
				<view class="line_l"></view>
				<view class="iconfont icon-arrow-down down" style="font-size:60rpx;color:#e1e1e1;"></view>
				<view class="line_r"></view>
			</view>
			<!-- 规则 -->
			<view class="rule">
				<view>
					{{userDetail.rule}}
				</view>
				<view>
					约{{userDetail.total_time}}小时
				</view>
			</view>
			<!-- 打卡时间、地点 -->
			<view class="card_record" v-if="userDetail.in_time">
				<view class="card_record_item">
					<view class="card_record_item_r">进校 {{userDetail.in_time}}</view>
				</view>
				<view class="card_line" v-if="userDetail.out_time"></view>
				<view class="card_record_item " v-if="userDetail.out_time">
					<view class="card_record_item_r offduty">离校 {{userDetail.out_time}}</view>
				</view>
			</view>
			<view class="none_data" v-else>
				<view class="iconfont icon-zanwushuju" style="font-size:310rpx"></view>
				<view>{{userDetail.typeText}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getMonday,
		getDate,
		getMonth
	} from "../../utils/date.js"
	export default {
		data() {
			return {
				calendarArray: ['一', '二', '三', '四', '五', '六', '日'],
				activeIndex: null, // 当前点击日期索引
				todayShow: false, // 
				monthTitle: getDate().num.M, // 月汇总标题
				weekend: true, // 周末样式状态
				userDetail: {}, // 当天数据
				week: [], // 本周的全部日期
				time: ""
			}
		},
		methods: {
			// 添加选择样式
			addActiveCss() {
				var today = getDate().num.D < 9 ? '0' + getDate().num.D : getDate().num.D
				this.week.forEach((item, index) => {
					if (today == item.day) {
						item.todayShow = true
					}
				})
			},
			// 日期选择
			activeDay(index) {
				if (index == 5 || index == 6) {
					uni.showToast({
						icon: 'none',
						title: '周末就好好休息吧'
					})
					this.weekend = true
				} else {
					this.activeIndex = index
					this.time = this.week[index].date
					this.getDaily()
				}
			},
			// 页面跳转
			jump() {
				uni.navigateTo({
					url: "./detail/index"
				})
			},
			// 获取当天
			getDaily() {
				var setData = {}
				if (this.time != '') {
					setData.time = this.time
				} else {
					setData.time = getDate().num.fullDate
				}
				this.myAxios({
					url: "/api/Daily/index",
					data: setData
				}).then(res => {
					this.userDetail = res.data
					this.computedTime()
					this.userDetail.typeText = this.judgeType(this.userDetail)
				})
			},
			// 计算共在学校的时间
			computedTime() {
				if (this.userDetail.in_time) {
					var inTime = Number(this.userDetail.in_time.slice(11, 13))
					var outTime = Number(this.userDetail.out_time.slice(11, 13))
					this.userDetail.total_time = outTime - inTime
				} else {
					this.userDetail.total_time = 0
				}
			},
			// 获取本周星期一到星期五的日期
			getMonDate() {
				var d = new Date(),
					day = d.getDay(),
					date = d.getDate();
				if (day == 1)
					return d;
				if (day == 0)
					d.setDate(date - 6);
				else
					d.setDate(date - day + 1);
				return d;
			},
			// 处理日期
			getDay() {
				var d = this.getMonDate();
				var arr = [];
				for (var i = 0; i < 7; i++) {
					arr.push(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate());
					d.setDate(d.getDate() + 1);
				}
				this.week = arr.map(item => {
					var day = item.slice(8, 10)
					return {
						day: day.length == 2 ? day : '0' + day,
						date: item,
						todayShow: false
					}
				});
				this.addActiveCss()
			},
			// 修改提示文字
			judgeType(value) {
				var week = getDate().num.w
				if (value.type == 2) {
					return '请假'
				} else if (value.type == 3) {
					return '已休学'
				} else if (!value.in_time && (week == 6 || week == 0)) {
					return '今天是周末噢'
				} else if (!value.in_time) {
					return '未打卡'
				}
			},
		},
		onLoad() {
			this.getDay()
			this.getDaily()
		}
	}
</script>

<style>
	.month_collect,
	.day_record {
		width: 690rpx;
		margin: 40rpx auto;
		border-radius: 20rpx;
		padding: 30rpx;
		background-color: #ffffff;
	}

	.month_collect_title,
	.day_record_title {
		font-weight: 700;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 40rpx;
	}

	.month_collect_number {
		display: flex;
		justify-content: space-around;
	}

	.num {
		font-weight: 700;
		font-size: 48rpx;
		margin-bottom: 20rpx;
		text-align: center;
	}

	.text {
		color: #5c5c5e;
		text-align: center;
	}

	.day_record_calendar {
		margin-top: 40rpx;
	}

	.calendar_list {
		display: flex;
		align-items: center;
	}

	.calendar_item {
		font-size: 24rpx;
		color: #979797;
		width: 94rpx;
		text-align: center;
	}

	.day_list {
		display: flex;
		align-items: center;
		margin: 25rpx 0;
	}

	.day_item {
		font-weight: 700;
		width: 94rpx;
		height: 94rpx;
		line-height: 94rpx;
		text-align: center;
	}

	.active_day_css {
		border-radius: 50%;
		background-color: #b3deff;
		color: white;
	}

	.line {
		display: flex;
		position: relative;
	}

	.line_l,
	.line_r {
		width: 270rpx;
		height: 1rpx;
		border-bottom: 1px solid #e1e1e1;
	}

	.line_l {
		margin-right: 50rpx;
	}

	.line_r {
		margin-left: 40rpx;
	}

	.down {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.rule {
		margin-top: 40rpx;
		color: #959595;
		font-size: 24rpx;
	}

	.rule view {
		margin: 20rpx 0;
	}

	/* 日期下面的点 */
	.af {
		position: relative;
	}

	.af::after {
		display: block;
		content: "";
		border-radius: 50%;
		width: 10rpx;
		height: 10rpx;
		position: absolute;
		top: 70rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.yellow_af::after {
		background-color: #eea605;
	}

	.green_af::after {
		background-color: #59d792;
	}

	.red_af::after {
		background-color: red;
	}

	.card_record {
		margin-top: 40rpx;
		position: relative;
	}

	.card_record_item {
		display: flex;
		align-items: center;
	}

	.card_record_item_r {
		margin-left: 73rpx;
		position: relative;
		margin-bottom: 200rpx;
	}

	.offduty {
		margin-bottom: 0;
	}

	.card_record_item_r::before {
		display: block;
		content: "";
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		background: #838995;
		position: absolute;
		top: 50%;
		left: -65rpx;
		transform: translateY(-50%);
	}

	.card_line {
		height: 200rpx;
		width: 6rpx;
		background: #e8e8e8;
		position: absolute;
		top: 50rpx;
		left: 14rpx;
	}

	.none_data {
		text-align: center;
		color: #959595;
	}
</style>
