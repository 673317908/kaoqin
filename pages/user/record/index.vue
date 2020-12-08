<template>
	<view id="uni-app">
		<view class="record_filter">
			<picker mode="date" :value="date" @change="bindDateChange">
				<view class="picker">
					{{filterDate}}
				</view>
			</picker>
			<view class="iconfont icon-arrow-down" style="margin-left:15rpx;"></view>
		</view>
		<view class="record_list">
			<view class="record_item">
				<view class="record_time">2020年11月27日</view>
				<view class="card_record_top">
					<view class="card_record_item_r">上班 09:14</view>
				</view>
				<view class="card_line"></view>
				<view class="card_record_down">
					<view class="card_record_item_r offduty">下班 09:14</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getDate
	} from "../../../utils/date.js"
	export default {
		data() {
			return {
				date: 111,
				filterDate: getDate().num.fullDate
			}
		},
		methods: {
			bindDateChange(e) {
				const {
					value
				} = e.detail
				this.filterDate = value
			},
		},
		onLoad() {
			this.getDate()
		}
	}
</script>

<style>
	#uni-app {
		background: #e8e8e8;
		height: 100vh;
	}

	.record_filter {
		padding: 20rpx;
		display: flex;
		align-items: center;
		background-color: white;
	}

	.record_item {
		width: 690rpx;
		background: white;
		margin: 20rpx auto;
		position: relative;
		border-radius: 20rpx;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.record_time {
		margin-bottom: 20rpx;
	}

	.card_record_item {
		display: flex;
		align-items: center;
	}

	.card_record_item_r {
		margin-left: 73rpx;
		position: relative;
		margin-bottom: 100rpx;
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
		height: 100rpx;
		width: 6rpx;
		background: #e8e8e8;
		position: absolute;
		top: 140rpx;
		left: 35rpx;
	}
</style>
