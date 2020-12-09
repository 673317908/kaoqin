<template>
	<view id="page">
		<view class="month_collect">
			<view class="month_collect_title">
				<view>{{monthTitle}}月汇总</view>
				<view class="iconfont icon-arrow-right" style="color:#c1c1c2;font-size:24rpx;" @click="jump"></view>
			</view>
			<view class="month_collect_number">
				<view class="month_collect_late">
					<view class="num">7</view>
					<view class="text">请假（次）</view>
				</view>
				<view class="month_collect_late">
					<view class="num">7</view>
					<view class="text">迟到（次）</view>
				</view>
				<view class="month_collect_leave">
					<view class="num">0</view>
					<view class="text">早退（次）</view>
				</view>
			</view>
		</view>
		<view class="day_record">
			<view class="day_record_title">
				<view>每日记录<text style="color:#c1c1c2;margin-left:20rpx;font-weight:500;font-size:30rpx;">（11月）</text></view>
			</view>
			<!-- 日历 -->
			<view class="day_record_calendar">
				<view class="calendar_list">
					<view class="calendar_item" v-for="(item,index) in calendarArray" :key="index">
						<text>{{item}}</text>
					</view>
				</view>
				<view class="day_list">
					<view :class="activeIndex===index?['day_item','active_day_css']:['day_item','af']" v-for="(item,index) in dayArray"
					 :key="index" @click="activeDay(index)">{{item}}</view>
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
					规则：固定上下班 A 09:00-18:00
				</view>
				<view>
					共1次卡，工时0小时
				</view>
			</view>
			<!-- 打卡时间、地点 -->
			<view class="card_record">
				<view class="card_record_item">
					<view class="card_record_item_r">上班 09:14</view>
				</view>
				<view class="card_line"></view>
				<view class="card_record_item ">
					<view class="card_record_item_r offduty">下班 09:14</view>
				</view>
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
				dayArray: null,
				activeIndex: null,
				todayShow: false,
				monthTitle: getDate().num.M
			}
		},
		methods: {
			// 添加选择样式
			addActiveCss() {
				var today = getDate().num.D < 9 ? '0' + getDate().num.D : getDate().num.D
				this.dayArray.forEach(item => {
					if (today == item) {
						this.todayShow = true
					}
				})
			},
			// 日期选择
			activeDay(index) {
				this.activeIndex = index
			},
			// 页面跳转
			jump() {
				uni.navigateTo({
					url: "./detail/index"
				})
			},
			// 获取日期
			getDay() {
				var starttime = getMonday('s', 0)
				var endTime = getMonday('e', 0)
				var endMonth = getMonth('e', 0).slice(8, 10)
				var arr = [+starttime.d, +starttime.d + 1, +starttime.d + 2, +starttime.d + 3, +starttime.d + 4, +starttime.d + 5,
					+
					starttime.d + 6
				]
				var a = 0
				this.dayArray = arr.map(item => {
					if (item <= 9) {
						return '0' + item
					} else if (item > endMonth) {
						return '0' + (++a)
					} else {
						return item
					}
				})
				this.addActiveCss()
			}
		},
		onLoad() {
			this.getDay()
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
		background-color: #008fff;
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
		background-color: #eea605;
		position: absolute;
		top: 70rpx;
		left: 50%;
		transform: translateX(-50%);
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
</style>
