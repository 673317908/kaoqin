<template>
	<view>
		<view class="detail_header">
			<view class="avatar_info">
				<image src="../../../static/images/morentouxiang_20200609135440.png" mode="widthFix"></image>
				<view class="student_name">{{userDetail.name}}</view>
			</view>
		</view>
		<view class="content">
			<!-- <view class="content_item">
				<view><text class="iconfont icon-chuqin icon_color"></text> 出勤天数</view>
				<view class="text_r">18天</view>
			</view>
			<view class="content_item">
				<view><text class="iconfont icon-xiuxi icon_color"></text> 休息天数</view>
				<view class="text_r">18天</view>
			</view> -->
			<view class="content_item">
				<view><text class="iconfont icon-chidao icon_color"></text> 迟到</view>
				<view class="text_r">{{userDetail.early_count>0?userDetail.early_count:0}}次</view>
			</view>
			<view class="content_item">
				<view><text class="iconfont icon-zaotui1 icon_color"></text> 早退</view>
				<view class="text_r">{{userDetail.even_count>0?userDetail.even_count:0}}次</view>
			</view>
			<!-- <view class="content_item">
				<view><text class="iconfont icon-queka1 icon_color"></text> 缺卡</view>
				<view class="text_r">18次</view>
			</view> -->
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
				userDetail: {}
			}
		},
		methods: {
			getDaily() {
				var setData = {
					time: getDate().num.fullDate
				}
				this.myAxios({
					url: "/api/Daily/index",
					data: setData
				}).then(res => {
					this.userDetail = res.data
				})
			},
		},
		onLoad() {
			this.getDaily()
		}

	}
</script>

<style>
	.detail_header {
		margin-top: 20rpx;
		border-top: 1rpx solid #eaeaea;
		border-bottom: 1rpx solid #eaeaea;
		padding: 20rpx;
		background: white;
	}

	.avatar_info {
		display: flex;
		align-items: center;
	}

	.avatar_info image {
		width: 100rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.content_item {
		border-bottom: 1rpx solid #eaeaea;
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		background: white;
	}

	.text_r {
		color: #dcdcdc;
	}

	.icon_color {
		color: #008fff;
		margin-right: 10rpx;
	}
</style>
